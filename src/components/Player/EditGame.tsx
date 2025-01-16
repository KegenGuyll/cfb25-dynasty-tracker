import { Game } from '@/db/types'
import EditModal from '../Modal/EditModal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { db } from '@/db/db.model'

type EditGameProps = {
  game: Game
  isOpen: boolean
  handleClose: () => void
  scheduleId: number
}

export const gameSchema = yup.object({
  awayTeamId: yup.number().required('Away Team is required'),
  homeTeamId: yup.number().required('Home Team is required'),
  result: yup.string().required('Result is required'),
  scoreSummary: yup
    .object({
      '1': yup.object({
        home: yup.number().required('Home Score is required'),
        away: yup.number().required('Away Score is required'),
      }),
      '2': yup.object({
        home: yup.number().required('Home Score is required'),
        away: yup.number().required('Away Score is required'),
      }),
      '3': yup.object({
        home: yup.number().required('Home Score is required'),
        away: yup.number().required('Away Score is required'),
      }),
      '4': yup.object({
        home: yup.number().required('Home Score is required'),
        away: yup.number().required('Away Score is required'),
      }),
      final: yup.object({
        home: yup.number().required('Home Score is required'),
        away: yup.number().required('Away Score is required'),
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
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(gameSchema),
    defaultValues: {
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      result: game.result || '',
      scoreSummary: {
        '1': {
          home: game.scoreSummary ? game.scoreSummary['1'].home : undefined,
          away: game.scoreSummary ? game.scoreSummary['1'].away : undefined,
        },
        '2': {
          home: game.scoreSummary ? game.scoreSummary['2'].home : undefined,
          away: game.scoreSummary ? game.scoreSummary['2'].away : undefined,
        },
        '3': {
          home: game.scoreSummary ? game.scoreSummary['3'].home : undefined,
          away: game.scoreSummary ? game.scoreSummary['3'].away : undefined,
        },
        '4': {
          home: game.scoreSummary ? game.scoreSummary['4'].home : undefined,
          away: game.scoreSummary ? game.scoreSummary['4'].away : undefined,
        },
        final: {
          home: game.scoreSummary
            ? game.scoreSummary.final.home
            : game.finalScore?.home,
          away: game.scoreSummary
            ? game.scoreSummary.final.away
            : game.finalScore?.away,
        },
      },
    },
  })

  const handleSave = async (data: GameFormData) => {
    console.log(data)

    await db.teamSchedule.update(scheduleId, (schedule) => {
      const gameIndex = schedule.games.findIndex((g) => g.week === game.week)
      schedule.games[gameIndex] = {
        ...schedule.games[gameIndex],
        result: data.result,
        finalScore: data.scoreSummary?.final || null,
        scoreSummary: data.scoreSummary,
      }
    })

    handleClose()
  }

  return (
    <EditModal
      handleClose={handleClose}
      isOpen={isOpen}
      formId="edit-game-form"
      title={`Week ${game.week}`}
      size="2xl"
    >
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col gap-4"
        id="edit-game-form"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Game Result</h2>
          <div className="w-20">
            <Controller
              control={control}
              name="result"
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
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
        <div className="flex flex-col gap-2 ">
          <h2 className="text-lg font-semibold">Score Summary</h2>
          <div className="grid grid-cols-6 grid-rows-3 text-center border-gray-300 bg-default-100 p-4 rounded">
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
            <span className="flex items-center justify-center border-b">
              FINAL
            </span>
            <span className="flex items-center justify-center border-b">
              {game.homeTeam?.school}
            </span>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.1.home"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.2.home"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.3.home"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.4.home"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.final.home"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <span className="flex items-center justify-center border-b">
              {game.awayTeam?.school}
            </span>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.1.away"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.2.away"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.3.away"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.4.away"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
                )}
              />
            </div>
            <div className="flex items-center justify-center border-b">
              <Controller
                name="scoreSummary.final.away"
                control={control}
                render={({ field }) => (
                  <Input size="lg" {...field} type="number" />
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
