'use client'

import TeamScheduleTable from '@/components/TeamScheduleTable'
import SearchableSelect from '@/components/SearchableSelect'
import { db } from '@/db/db.model'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { TeamSchedule } from '@/db/types'
import { formatGameLocation } from '@/utils/teamSchedule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
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
        location: yup.string().required('required'),
        opponent: yup.string().optional().nullable(),
        stadium: yup.string().optional().nullable(),
        result: yup.string().optional().nullable(),
        finalScore: yup
          .object({
            score1: yup.number(),
            score2: yup.number(),
          })
          .optional()
          .nullable()
          .test((finalScore, ctx) => {
            if (finalScore?.score1 && finalScore?.score2) {
              // finalScore score1 and score2 must be greater than or equal to 0
              if (finalScore.score1 <= 0 || finalScore.score2 <= 0) {
                return ctx.createError({
                  message: 'Score must be greater than or equal to 0',
                })
              }

              // finalScore score1 must be greater than score2
              if (finalScore.score1 < finalScore.score2) {
                console.log(
                  'score1 > score2',
                  finalScore.score1,
                  finalScore.score2,
                  finalScore.score1 > finalScore.score2
                )
                return ctx.createError({
                  message: 'Winning Score must be greater than Losing Score',
                })
              }
            }

            return ctx.resolve(true)
          }),
      })
    )
    .default([]),
})

type TeamScheduleFormData = yup.InferType<typeof teamScheduleSchema>

const CreateTeamSchedulePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamScheduleFormData>({
    resolver: yupResolver<any>(teamScheduleSchema),
  })
  const router = useRouter()

  const [numberOfWeeks, setNumberOfWeeks] = useState(1)

  const teamOptions = useLiveQuery(() => getTeamSelectOptions())

  const handleAddTeamSchedule = useCallback(
    async (data: TeamScheduleFormData) => {
      console.log('data', data)

      const teamSchedule: TeamSchedule = {
        teamId: Number(data.teamId),
        year: Number(data.year),
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
          boxScore: null,
          stats: null,
          finalScore: {
            home:
              game.result === 'W'
                ? game.finalScore?.score1
                : game.finalScore?.score2,
            away:
              game.result === 'W'
                ? game.finalScore?.score2
                : game.finalScore?.score1,
          },
          result: game.result || null,
        })),
      }

      console.log(teamSchedule)

      await db.teamSchedule.add(teamSchedule)
      router.push('/team-schedule')
    },
    [router]
  )

  return (
    <div>
      <form
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
              render={({
                field: { value, onChange },
                formState: { errors, isValid },
              }) => (
                <Input
                  id="year"
                  fullWidth
                  type="number"
                  label="Year"
                  value={value}
                  onChange={onChange}
                  placeholder="2024"
                  step={Number(value) >= 2000 ? 1 : 2000}
                  isInvalid={errors.year?.message ? true : false}
                  errorMessage={errors.year?.message}
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
      </form>
    </div>
  )
}

export type { TeamScheduleFormData }

export default CreateTeamSchedulePage
