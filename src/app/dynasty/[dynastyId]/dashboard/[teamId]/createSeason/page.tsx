'use client'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { db } from '@/db/db.model'
import { useRouter } from 'next/navigation'
import { Button, Input, Form } from '@heroui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect } from 'react'

type CreateSeasonPageProps = {
  params: {
    dynastyId: string
    teamId: string
  }
}

export const CreateSeasonPageSchema = yup.object({
  year: yup.number().required('Year is required'),
  conference: yup.string().optional(),
  teamOverall: yup.number().optional(),
  teamOffense: yup.number().optional(),
  teamDefense: yup.number().optional(),
  positionInConference: yup.number().optional(),
  teamWins: yup.number().optional(),
  teamLosses: yup.number().optional(),
  conferenceWins: yup.number().optional(),
  conferenceLosses: yup.number().optional(),
})

type CreateSeasonPageFormData = yup.InferType<typeof CreateSeasonPageSchema>

const CreateSeasonPage: React.FC<CreateSeasonPageProps> = ({
  params: { dynastyId, teamId },
}: CreateSeasonPageProps) => {
  const router = useRouter()
  const team = useLiveQuery(() => db.teams.get(parseInt(teamId)))

  const { control, handleSubmit, setError, setValue } =
    useForm<CreateSeasonPageFormData>({
      resolver: yupResolver(CreateSeasonPageSchema),
    })

  useEffect(() => {
    if (team) {
      setValue('conference', team.conference)
    }
  }, [setValue, team])

  const handleSave = async (data: CreateSeasonPageFormData) => {
    const doesYearExist = await db.teamInfo.where({ year: data.year }).count()

    if (doesYearExist) {
      setError('year', {
        type: 'manual',
        message: 'Year already exists',
      })
      return
    }

    await db.dynasties.update(parseInt(dynastyId), (dynasty) => {
      if (!dynasty) return

      dynasty.availableTeams.push({
        teamId: parseInt(teamId),
        year: data.year,
      })
    })

    await db.teamInfo.add({
      dynastyId: parseInt(dynastyId),
      teamId: parseInt(teamId),
      year: data.year,
      conference: data.conference || '',
      teamOverall: data.teamOverall || 0,
      teamOffense: data.teamOffense || 0,
      teamDefense: data.teamDefense || 0,
      positionInConference: data.positionInConference || 0,
      teamWins: data.teamWins || 0,
      teamLosses: data.teamLosses || 0,
      conferenceWins: data.conferenceWins || 0,
      conferenceLosses: data.conferenceLosses || 0,
    })

    router.push(`/dynasty/${dynastyId}/dashboard/${teamId}`)
  }

  if (!team) return null

  return (
    <div className="flex flex-col gap-4 w-full bg-content1 rounded p-4 items-center max-w-[800px]">
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold">Creating a new season</h1>
        <p className="text-small font-light">
          with the {team.school} {team.nickname}
        </p>
      </div>
      <div className="w-1/2">
        <Form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSave)}
        >
          <Controller
            name="year"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Year"
                isRequired
                {...field}
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                value={field.value ? String(field.value) : undefined}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Team Info</h2>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">Record</h3>
              <Controller
                name="teamWins"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Wins"
                    {...field}
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    value={field.value ? String(field.value) : undefined}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
              <Controller
                name="teamLosses"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Losses"
                    {...field}
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    value={field.value ? String(field.value) : undefined}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">Ovr</h3>
              <Controller
                name="teamOverall"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Team Ovr"
                    {...field}
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    value={field.value ? String(field.value) : undefined}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
              <div className="flex flex-row gap-2">
                <Controller
                  name="teamOffense"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      label="Offense Ovr"
                      {...field}
                      validationBehavior="aria"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      value={field.value ? String(field.value) : undefined}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
                <Controller
                  name="teamDefense"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      label="Defense Ovr"
                      {...field}
                      validationBehavior="aria"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      value={field.value ? String(field.value) : undefined}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Conference Info</h2>
            <Controller
              name="conference"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  label="Conf Name"
                  {...field}
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  value={field.value ? String(field.value) : undefined}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="positionInConference"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  label="Conf Rank"
                  {...field}
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  value={field.value ? String(field.value) : undefined}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            <div className="flex flex-row gap-2">
              <Controller
                name="conferenceWins"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Conf Wins"
                    {...field}
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    value={field.value ? String(field.value) : undefined}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
              <Controller
                name="conferenceLosses"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Conf Losses"
                    {...field}
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    value={field.value ? String(field.value) : undefined}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
            </div>
          </div>
          <Button className="w-full" type="submit" color="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateSeasonPage
