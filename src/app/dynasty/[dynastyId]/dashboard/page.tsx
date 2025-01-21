'use client'

import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmation'
import EditModal from '@/components/Modal/EditModal'
import { db } from '@/db/db.model'
import { AvailableTeams } from '@/db/types/dynasty'
import deleteDynasty from '@/queries/dynasty/deleteDynasty'
import getDynastyById from '@/queries/dynasty/getDynastyById'
import {
  faEllipsisVertical,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
  Spinner,
  Textarea,
} from '@heroui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

type DynastyDashboardPageProps = {
  params: {
    dynastyId: string
  }
}

type AvailableTeamsWithYears = AvailableTeams & {
  years: number[]
}

export const dynastySchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().optional(),
})

type DynastyFormData = yup.InferType<typeof dynastySchema>

const DynastyDashboardPage: React.FC<DynastyDashboardPageProps> = ({
  params,
}) => {
  const router = useRouter()
  const data = useLiveQuery(() => getDynastyById(Number(params.dynastyId)))
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const { control, handleSubmit, setValue } = useForm<DynastyFormData>({
    resolver: yupResolver(dynastySchema),
  })

  useEffect(() => {
    if (!data) return

    setValue('name', data.name)
    setValue('description', data.description)
  }, [data])

  const handleDeleteDynasty = async () => {
    await deleteDynasty(Number(params.dynastyId))

    router.push('/dynasty')
  }

  const groupByTeamId = useMemo(() => {
    if (!data) return {}

    return (data.availableTeams as AvailableTeamsWithYears[]).reduce(
      (acc: { [key: number]: typeof team }, team) => {
        acc[team.teamId] = {
          ...team,
          years: [...(acc[team.teamId]?.years || []), team.year].sort(
            (a, b) => a - b
          ),
        }
        return acc
      },
      {}
    )
  }, [data])

  const teamName = (team: AvailableTeamsWithYears): string => {
    return `${team.data?.school} (${team.years[0]} - ${
      team.years[team.years.length - 1]
    })`
  }

  const handleUpdateDynasty = async (data: DynastyFormData) => {
    await db.dynasties.update(Number(params.dynastyId), {
      name: data.name,
      description: data.description || '',
    })

    setOpenEdit(false)
  }

  return (
    <div className="flex flex-col gap-6 w-full bg-content1 p-2 rounded max-w-[600px]">
      {!data && <Spinner />}
      {data && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center">
            <div className="flex-grow">
              <h2 className="text-lg font-bold">{data.name}</h2>
              <p className="text-sm font-light">{data.description}</p>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="ghost">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => setOpenEdit(true)} key="edit">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faPen} />
                    <span>Edit</span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  key="delete"
                  onPress={() => setOpenDelete(true)}
                >
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faTrashCan} />
                    <span>Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Button
            className="w-1/4"
            color={data.availableTeams.length > 0 ? 'default' : 'primary'}
            onPress={() => router.push('/team-schedule/create?dynastyId=1')}
          >
            Add Team
          </Button>
          <div className="pt-1">
            <h3 className="text-4xl font-bold">Available Teams</h3>
            {data.availableTeams.length === 0 && (
              <div className="flex flex-col gap-2 pt-6">
                <p>No teams available</p>
              </div>
            )}
            <ul className="pt-6 text-lg pl-4">
              {Object.entries(groupByTeamId).map(([teamId, team]) => (
                <li key={teamId}>
                  <Link
                    href={`/dynasty/${params.dynastyId}/dashboard/${team.teamId}`}
                  >
                    {teamName(team)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <DeleteConfirmationModal
        context="this dynasty and all related data"
        isOpen={openDelete}
        handleClose={() => setOpenDelete(false)}
        deleteAction={handleDeleteDynasty}
      />
      <EditModal
        title="Dynasty"
        isOpen={openEdit}
        handleClose={() => setOpenEdit(false)}
        formId="edit-dynasty-form"
      >
        <Form
          id="edit-dynasty-form"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleUpdateDynasty)}
        >
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                placeholder="Name"
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <Textarea
                rows={6}
                {...field}
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                placeholder="Description"
              />
            )}
          />
        </Form>
      </EditModal>
    </div>
  )
}

export default DynastyDashboardPage
