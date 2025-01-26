import createNewPlayer from '@/queries/players/createNewPlayer'
import EditModal from '../Modal/EditModal'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Form, Input } from '@heroui/react'
import PositionSelect from './inputs/PositionSelect'
import TeamSelect from '../TeamSelect'
import { useLiveQuery } from 'dexie-react-hooks'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { useEffect } from 'react'

type CreateNewPlayerProps = {
  isOpen: boolean
  handleClose: () => void
  dynastyId: string
  year: string
  defaultTeamId?: number
  callback?: (playerId: number) => void
}

const createNewPlayerSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  position: yup.string().required(),
  year: yup.string().required(),
  teamId: yup.string().required(),
})

type CreateNewPlayerFormData = yup.InferType<typeof createNewPlayerSchema>

const CreateNewPlayer: React.FC<CreateNewPlayerProps> = ({
  isOpen,
  handleClose,
  dynastyId,
  year,
  defaultTeamId,
  callback,
}: CreateNewPlayerProps) => {
  const teamOptions = useLiveQuery(() => getTeamSelectOptions())
  const { control, handleSubmit, setValue } = useForm<CreateNewPlayerFormData>({
    resolver: yupResolver(createNewPlayerSchema),
    defaultValues: {
      year,
      teamId: defaultTeamId?.toString(),
    },
  })

  useEffect(() => {
    if (defaultTeamId) {
      setValue('teamId', defaultTeamId.toString())
    }
  }, [defaultTeamId, setValue])

  const onSubmit = async (data: CreateNewPlayerFormData) => {
    const playerIds = await createNewPlayer([
      {
        ...data,
        dynastyId: +dynastyId,
        teamId: +data.teamId,
        year: +data.year || +year,
      },
    ])

    if (callback) {
      callback(playerIds[0])
    }
    handleClose()
  }

  return (
    <EditModal
      title="Player"
      formId="create-player-form"
      handleClose={handleClose}
      isOpen={isOpen}
    >
      <Form id="create-player-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isRequired
                  label="First Name"
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isRequired
                  label="Last Name"
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="position"
              render={({ field, fieldState }) => (
                <PositionSelect isRequired {...field} {...fieldState} />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="teamId"
              render={({ field, fieldState }) => (
                <TeamSelect
                  isRequired
                  label="Team"
                  {...field}
                  {...fieldState}
                  teamOptions={teamOptions || []}
                />
              )}
            />
          </div>
        </div>
      </Form>
    </EditModal>
  )
}

export default CreateNewPlayer
