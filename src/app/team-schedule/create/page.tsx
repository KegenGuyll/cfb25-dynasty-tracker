'use client'

import TeamScheduleTable from '@/components/TeamScheduleTable'
import SearchableSelect from '@/components/SearchableSelect'
import { db } from '@/db/db.model'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { TeamSchedule } from '@/db/types'
import { formatGameLocation } from '@/utils/teamSchedule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Input } from '@heroui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const teamScheduleSchema = yup.object({
  teamId: yup.string().required('Select a team schedule'),
  year: yup
    .string()
    .required('Year is required')
    .matches(/^\d{4}$/, 'Year must be 4 digits'),
  games: yup
    .array()
    .of(
      yup.object({
        location: yup.string().required('Game location is required'),
        opponent: yup.string().optional().nullable(),
        stadium: yup.string().optional().nullable(),
      })
    )
    .default([]),
})

type TeamScheduleFormData = yup.InferType<typeof teamScheduleSchema>

const CreateTeamSchedulePage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamScheduleFormData>({
    resolver: yupResolver<any>(teamScheduleSchema),
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const dynastyId = searchParams.get('dynastyId')
  const teamInfoId = searchParams.get('teamInfoId')
  const year = searchParams.get('year')
  const teamId = searchParams.get('teamId')

  useEffect(() => {
    if (teamId && year) {
      setValue('teamId', teamId)
      setValue('year', year)
    }
  }, [setValue, teamId, year])

  useEffect(() => {
    if (!dynastyId || !teamInfoId) {
      router.push('/dynasty')
    }
  }, [dynastyId, router, teamInfoId])

  const [numberOfWeeks, setNumberOfWeeks] = useState(20)

  const teamOptions = useLiveQuery(() => getTeamSelectOptions())

  const handleAddTeamSchedule = useCallback(
    async (data: TeamScheduleFormData) => {
      const teamSchedule: TeamSchedule = {
        teamId: Number(data.teamId),
        year: Number(data.year),
        dynastyId: Number(dynastyId),
        games: data.games.map((game, i) => ({
          awayTeamId:
            game.location === 'AT'
              ? Number(game.opponent)
              : Number(data.teamId),
          homeTeamId:
            game.location === 'VS'
              ? Number(game.opponent)
              : Number(data.teamId),
          week: i,
          stadium: game.stadium || null,
          location: formatGameLocation(game.location),
          rivalryGame: false,
          broadcast: 'local',
          scoreSummary: null,
          stats: null,
          finalScore: null,
          result: null,
        })),
      }

      await db.teamSchedule.add(teamSchedule)
      router.push(`/dynasty/${dynastyId}/dashboard/${data.teamId}`)
    },
    [dynastyId, router, teamInfoId]
  )

  return (
    <div>
      <Form
        className="gap-4 flex flex-col"
        onSubmit={handleSubmit(handleAddTeamSchedule)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 justify-center w-full">
            <Controller
              control={control}
              name="teamId"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <div className="w-full">
                  <SearchableSelect
                    options={teamOptions || []}
                    label="Team"
                    placeholder="Select Team"
                    value={teamOptions?.find(
                      (option) => option.value === value
                    )}
                    onChange={onChange}
                    isInvalid={errors.teamId?.message ? true : false}
                    isRequired
                  />
                  <span className="text-xs text-danger">
                    {errors.teamId?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              control={control}
              name="year"
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  id="year"
                  fullWidth
                  type="number"
                  label="Year"
                  value={value}
                  onChange={onChange}
                  placeholder="2024"
                  step={Number(value) >= 2000 ? 1 : 2000}
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  isRequired
                  required
                />
              )}
            />
            <Input
              placeholder="Number of Weeks"
              label="Number of Weeks"
              type="number"
              value={String(numberOfWeeks)}
              onChange={(e) => setNumberOfWeeks(Number(e.target.value))}
            />
          </div>
          <Button color="primary" type="submit">
            Save Schedule
          </Button>
        </div>
        <TeamScheduleTable
          control={control}
          numberOfWeeks={numberOfWeeks}
          teamOptions={teamOptions || []}
        />
      </Form>
    </div>
  )
}

export type { TeamScheduleFormData }

export default CreateTeamSchedulePage
