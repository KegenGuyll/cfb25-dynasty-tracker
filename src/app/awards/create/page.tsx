'use client'

import SearchableSelect from '@/components/SearchableSelect'
import { awardsDashboardUrl } from '@/constants/urls'
import { db } from '@/db/db.model'
import getAvailableAwardOptions from '@/db/functions/getAvaliableAwardOptions'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from "@heroui/react"
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const awardSchema = yup.object({
  awardId: yup.string().required('Trophy is required'),
  playerFirstName: yup.string().required(),
  playerLastName: yup.string().required(),
  teamId: yup.string().required(),
  year: yup
    .string()
    .required()
    .matches(/^\d{4}$/, 'Year must be 4 digits'),
})

type AwardFormData = yup.InferType<typeof awardSchema>

const CreateAwardPage = () => {
  const teamOptions = useLiveQuery(() => getTeamSelectOptions())
  const awardOptions = useLiveQuery(() => getAvailableAwardOptions())
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AwardFormData>({
    resolver: yupResolver(awardSchema),
  })

  const handleSaveAward = async (data: AwardFormData) => {
    await db.awards.add({
      awardId: +data.awardId,
      playerFirstName: data.playerFirstName,
      playerLastName: data.playerLastName,
      teamId: +data.teamId,
      year: +data.year,
      dynastyId: 0,
    })

    router.push(awardsDashboardUrl)
  }

  return (
    <div className="flex flex-col gap-8">
      <h1>Add Player Award</h1>
      <form onSubmit={handleSubmit(handleSaveAward)}>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="teamId"
            render={({ field, formState }) => (
              <SearchableSelect
                onChange={field.onChange}
                value={teamOptions?.find((team) => team.value === field.value)}
                label="Select team for award"
                placeholder="Select Team"
                isRequired
                isInvalid={formState.errors.teamId?.message ? true : false}
                options={teamOptions || []}
              />
            )}
          />
          <div className="flex items-center justify-center gap-2">
            <Controller
              control={control}
              name="awardId"
              render={({ field, formState }) => (
                <SearchableSelect
                  onChange={field.onChange}
                  value={awardOptions?.find(
                    (team) => team.value === field.value
                  )}
                  label="Select team for award"
                  placeholder="Select Award"
                  isRequired
                  isInvalid={formState.errors.teamId?.message ? true : false}
                  options={awardOptions || []}
                />
              )}
            />
            <Controller
              control={control}
              name="year"
              render={({ field, formState }) => (
                <Input
                  {...field}
                  fullWidth
                  type="number"
                  label="Year"
                  placeholder="Enter Year"
                  isRequired
                  isInvalid={formState.errors.year?.message ? true : false}
                  errorMessage={formState.errors.year?.message}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Controller
              control={control}
              name="playerFirstName"
              render={({ field, formState }) => (
                <Input
                  {...field}
                  fullWidth
                  type="string"
                  label="First Name"
                  placeholder="Enter First Name"
                  isRequired
                  isInvalid={
                    formState.errors.playerFirstName?.message ? true : false
                  }
                  errorMessage={formState.errors.playerFirstName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="playerLastName"
              render={({ field, formState }) => (
                <Input
                  {...field}
                  fullWidth
                  type="string"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  isRequired
                  isInvalid={
                    formState.errors.playerLastName?.message ? true : false
                  }
                  errorMessage={formState.errors.playerLastName?.message}
                />
              )}
            />
          </div>
          <Button color="primary" type="submit">
            Save Award
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateAwardPage
