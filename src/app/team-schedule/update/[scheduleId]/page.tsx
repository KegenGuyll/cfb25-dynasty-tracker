'use client'

import { Controller, useForm } from 'react-hook-form'
import { TeamScheduleFormData, teamScheduleSchema } from '../../create/page'
import { yupResolver } from '@hookform/resolvers/yup'
import TeamSelect from '@/components/TeamSelect'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db.model'
import TeamScheduleTable from '@/components/TeamScheduleTable'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TeamSchedule } from '@/db/types'
import { useRouter } from 'next/navigation'
import {
  convertGameLocation,
  determineOpp,
  determineGameResult,
  formatGameLocation,
} from '@/utils/teamSchedule'
import { Spinner } from '@nextui-org/spinner'

const UpdateTeamSchedule = ({ params }: { params: { scheduleId: string } }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TeamScheduleFormData>({
    resolver: yupResolver<any>(teamScheduleSchema),
  })
  const router = useRouter()

  const teamSchedule = useLiveQuery(() =>
    db.teamSchedule.get(+params.scheduleId)
  )

  const [numberOfWeeks, setNumberOfWeeks] = useState(1)

  const teams = useLiveQuery(() => db.teams.toArray())

  const handleSettingFormValues = useCallback(() => {
    if (!teamSchedule) return
    setValue('year', String(teamSchedule.year))
    setValue('teamId', String(teamSchedule.teamId))
    setValue(
      'games',
      teamSchedule.games.map((game) => ({
        location: convertGameLocation(game.location),
        opponent: determineOpp(game),
        stadium: game.stadium,
        result: determineGameResult(game),
        finalScore: {
          score1:
            determineGameResult(game) === 'W'
              ? game.finalScore?.home
              : game.finalScore?.away,
          score2:
            determineGameResult(game) === 'W'
              ? game.finalScore?.away
              : game.finalScore?.home,
        },
      }))
    )
    setNumberOfWeeks(teamSchedule.games.length)
  }, [setValue, teamSchedule])

  const handleUpdateTeamSchedule = useCallback(
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

      // await db.teamSchedule.update(+params.scheduleId, teamSchedule)
      router.push('/team-schedule')
    },
    [router]
  )

  useEffect(() => {
    handleSettingFormValues()
  }, [handleSettingFormValues])

  const teamOptions = useMemo(
    () =>
      teams?.map((team) => ({
        value: String(team.teamId),
        label: `${team.school} ${team.nickname}`,
      })),
    [teams]
  )

  if (!teamSchedule)
    return (
      <div className="flex flex-col items-center w-full h-full">
        <Spinner />
      </div>
    )

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleUpdateTeamSchedule)}
        className="gap-4 flex flex-col"
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
                  <TeamSelect
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
            Update Schedule
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

export default UpdateTeamSchedule
