import { Game, GameLocation } from '@/db/types'
import EditModal from '../Modal/EditModal'
import { Controller, set, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { db } from '@/db/db.model'
import TeamSelect from '../TeamSelect'
import { useLiveQuery } from 'dexie-react-hooks'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { useEffect } from 'react'

type EditGameProps = {
  game?: Game
  isOpen: boolean
  handleClose: () => void
  scheduleId: number
}

export const gameSchema = yup.object({
  awayTeamId: yup.number().required('Away Team is required'),
  homeTeamId: yup.number().required('Home Team is required'),
  result: yup.string().required('Result is required'),
  overtime: yup.boolean().optional(),
  gameLocation: yup.string().required(),
  customGameName: yup.string().optional(),
  scoreSummary: yup
    .object({
      '1': yup.object({
        home: yup.number().required('Home Score is required').nullable(),
        away: yup.number().required('Away Score is required').nullable(),
      }),
      '2': yup.object({
        home: yup.number().required('Home Score is required').nullable(),
        away: yup.number().required('Away Score is required').nullable(),
      }),
      '3': yup.object({
        home: yup.number().required('Home Score is required').nullable(),
        away: yup.number().required('Away Score is required').nullable(),
      }),
      '4': yup.object({
        home: yup.number().required('Home Score is required').nullable(),
        away: yup.number().required('Away Score is required').nullable(),
      }),
      ot: yup.object({
        home: yup.number().required('Home Score is required').nullable(),
        away: yup.number().required('Away Score is required').nullable(),
      }),
      final: yup.object({
        home: yup.number().required('Home Score is required').nullable(),
        away: yup.number().required('Away Score is required').nullable(),
      }),
    })
    .nullable(),
})

type GameFormData = yup.InferType<typeof gameSchema>

const EditGame: React.FC<EditGameProps> = ({
  game,
  isOpen,
  handleClose,
  scheduleId,
}: EditGameProps) => {
  const teamOptions = useLiveQuery(() => getTeamSelectOptions(), [])

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(gameSchema),
  })

  const watchedHomeTeamId = watch('homeTeamId')
  const watchedAwayTeamId = watch('awayTeamId')
  const OtWatch = watch('overtime')
  const watchedScoreSummary = watch('scoreSummary')

  useEffect(() => {
    if (!game) return

    setValue('homeTeamId', game.homeTeamId)
    setValue('awayTeamId', game.awayTeamId)
    setValue('result', game.result || '')
    setValue('gameLocation', game.location)
    setValue('customGameName', game.customGameName)
    setValue('scoreSummary', {
      '1': {
        home: game.scoreSummary ? game.scoreSummary['1'].home : null,
        away: game.scoreSummary ? game.scoreSummary['1'].away : null,
      },
      '2': {
        home: game.scoreSummary ? game.scoreSummary['2'].home : null,
        away: game.scoreSummary ? game.scoreSummary['2'].away : null,
      },
      '3': {
        home: game.scoreSummary ? game.scoreSummary['3'].home : null,
        away: game.scoreSummary ? game.scoreSummary['3'].away : null,
      },
      '4': {
        home: game.scoreSummary ? game.scoreSummary['4'].home : null,
        away: game.scoreSummary ? game.scoreSummary['4'].away : null,
      },
      ot: {
        home: game.scoreSummary ? game.scoreSummary.ot?.home ?? null : null,
        away: game.scoreSummary ? game.scoreSummary.ot?.away ?? null : null,
      },
      final: {
        home: game.scoreSummary
          ? game.scoreSummary.final.home
          : game.finalScore?.home || null,
        away: game.scoreSummary
          ? game.scoreSummary.final.away
          : game.finalScore?.away || null,
      },
    })
    setValue('overtime', game.overtime)
  }, [game])

  const handleSave = async (data: GameFormData) => {
    console.log(data)

    await db.teamSchedule.update(scheduleId, (schedule) => {
      const gameIndex = schedule.games.findIndex((g) => g.week === game?.week)
      schedule.games[gameIndex] = {
        ...schedule.games[gameIndex],
        overtime: data.overtime,
        location: data.gameLocation as GameLocation,
        homeTeamId: data.homeTeamId,
        awayTeamId: data.awayTeamId,
        result: data.result,
        finalScore: (data.scoreSummary?.final as any) || null,
        scoreSummary: data.scoreSummary as any,
        customGameName: data.customGameName || undefined,
      }
    })

    handleClose()
  }

  if (!game) return null

  return (
    <EditModal
      handleClose={handleClose}
      isOpen={isOpen}
      formId="edit-game-form"
      title={`Week ${game?.week}`}
      size="2xl"
    >
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col gap-4"
        id="edit-game-form"
      >
        <div className="flex flex-col gap-2">
          <div>
            <Controller
              control={control}
              name="result"
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    label="Game Result"
                    value={value || ''}
                    selectedKeys={[String(value)]}
                    defaultSelectedKeys={[String(value)]}
                    onChange={onChange}
                  >
                    {['W', 'L'].map((result) => (
                      <SelectItem key={result} value={result}>
                        {result}
                      </SelectItem>
                    ))}
                  </Select>
                )
              }}
            />
          </div>
        </div>
        <Controller
          control={control}
          name="customGameName"
          render={({ field }) => (
            <Input
              label="Custom Game Name"
              placeholder="Game Name (Bowl Game, Playoff Game, etc.)"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="overtime"
          render={({ field }) => (
            <Checkbox
              defaultChecked={field.value}
              checked={field.value}
              onChange={field.onChange}
            >
              Overtime?
            </Checkbox>
          )}
        />
        {game.awayTeamId === game.homeTeamId && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Set Opponents</h2>
            <Controller
              control={control}
              name="awayTeamId"
              render={({ field: { value, onChange } }) => {
                return (
                  <label>
                    <span>Away Team</span>
                    <TeamSelect
                      teamOptions={teamOptions || []}
                      value={String(value)}
                      onChange={onChange}
                    />
                  </label>
                )
              }}
            />
            <Controller
              control={control}
              name="homeTeamId"
              render={({ field: { value, onChange } }) => {
                return (
                  <label>
                    <span>Home Team</span>
                    <TeamSelect
                      teamOptions={teamOptions || []}
                      value={String(value)}
                      onChange={onChange}
                    />
                  </label>
                )
              }}
            />

            <Controller
              control={control}
              name="gameLocation"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Game Location"
                  value={value || ''}
                  selectedKeys={[String(value)]}
                  defaultSelectedKeys={[String(value)]}
                  onChange={onChange}
                >
                  {['home', 'away', 'neutral', 'bye'].map((result) => (
                    <SelectItem key={result} value={result}>
                      {result}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 ">
          <h2 className="text-lg font-semibold">Score Summary</h2>
          <div
            style={{
              gridTemplateColumns: `repeat(${OtWatch ? 7 : 6}, 1fr)`,
            }}
            className="grid grid-rows-3 text-center border-gray-300 bg-default-100 p-4 rounded"
          >
            <span className="flex items-center justify-center border-b">
              TEAM
            </span>
            <span className="flex items-center justify-center border-b">
              Q1
            </span>
            <span className="flex items-center justify-center border-b">
              Q2
            </span>
            <span className="flex items-center justify-center border-b">
              Q3
            </span>
            <span className="flex items-center justify-center border-b">
              Q4
            </span>
            {OtWatch && (
              <span className="flex items-center justify-center border-b">
                OT
              </span>
            )}
            <span className="flex items-center justify-center border-b">
              FINAL
            </span>
            <span className="flex items-center justify-center border-b">
              {game.awayTeamId !== game.homeTeamId
                ? game.homeTeam?.school
                : teamOptions?.find(
                    (team) => team.value === String(watchedHomeTeamId)
                  )?.label}
            </span>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.1.home"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.2.home"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.3.home"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.4.home"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            {OtWatch && (
              <div className="flex items-center justify-center border-b">
                <Controller
                  name="scoreSummary.ot.home"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      {...field}
                      value={field.value ? String(field.value) : undefined}
                      type="number"
                    />
                  )}
                />
              </div>
            )}
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.final.home"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <span className="flex items-center justify-center border-b">
              {game.awayTeamId !== game.homeTeamId
                ? game.awayTeam?.school
                : teamOptions?.find(
                    (team) => team.value === String(watchedAwayTeamId)
                  )?.label}
            </span>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.1.away"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.2.away"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.3.away"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.4.away"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
            {OtWatch && (
              <div className="flex items-center justify-center border-b">
                <Controller
                  name="scoreSummary.ot.away"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      {...field}
                      value={field.value ? String(field.value) : undefined}
                      type="number"
                    />
                  )}
                />
              </div>
            )}
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.final.away"
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    type="number"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </EditModal>
  )
}

export default EditGame
