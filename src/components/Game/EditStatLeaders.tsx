import { Game } from '@/db/types'
import EditModal from '../Modal/EditModal'
import { Divider, Form, Input } from '@heroui/react'
import { Control, Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLiveQuery } from 'dexie-react-hooks'
import getPlayerOptions from '@/queries/players/getPlayerOptions'
import { OptionType } from '../SearchableSelect'
import PlayerSelect from '../Player/inputs/PlayerSelect'
import CreateNewPlayer from '../Player/CreateNewPlayer'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { db } from '@/db/db.model'
import { determineOpponent } from '@/utils/teamSchedule'

type EditStatLeadersProps = {
  dynastyId: string
  year: string
  game?: Game
  isOpen: boolean
  handleClose: () => void
  scheduleId: number
}

type StatLeaderInputsProps = {
  team: 'homeTeam' | 'awayTeam'
  control: Control<StatLeadersFormData>
  playerOptions: OptionType[]
}

type NewPlayerButtonProps = {
  action: () => void
}

const NewPlayerButton: React.FC<NewPlayerButtonProps> = ({
  action,
}: NewPlayerButtonProps) => {
  return (
    <span
      onClick={action}
      className="text-blue-500 hover:underline text-left text-tiny cursor-pointer"
    >
      New Player?
    </span>
  )
}

const PassingLeaderInputs: React.FC<StatLeaderInputsProps> = ({
  control,
  team,
  playerOptions,
}: StatLeaderInputsProps) => {
  return (
    <div className="flex gap-2">
      <Controller
        control={control}
        name={`${team}.passing.playerId`}
        render={({ field, fieldState }) => (
          <div>
            <PlayerSelect
              {...field}
              value={field.value?.toString() || ''}
              classname="w-72"
              label="Player"
              playerOptions={playerOptions}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name={`${team}.passing.attempts`}
        render={({ field, fieldState }) => (
          <Input
            aria-labelledby={`${team} passing attempts`}
            {...field}
            value={field.value?.toString()}
            label="Att"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.passing.completions`}
        render={({ field, fieldState }) => (
          <Input
            aria-labelledby={`${team} passing completions`}
            {...field}
            value={field.value?.toString()}
            label="Comp"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.passing.yards`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            aria-labelledby={`${team} passing yards`}
            value={field.value?.toString()}
            label="Yds"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.passing.tds`}
        render={({ field, fieldState }) => (
          <Input
            aria-labelledby={`${team} passing touchdowns`}
            {...field}
            value={field.value?.toString()}
            label="TDs"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.passing.ints`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            aria-labelledby={`${team} passing interceptions`}
            label="INTs"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
    </div>
  )
}

const RushingLeaderInputs: React.FC<StatLeaderInputsProps> = ({
  control,
  team,
  playerOptions,
}: StatLeaderInputsProps) => {
  return (
    <div className="flex gap-2">
      <Controller
        control={control}
        name={`${team}.rushing.playerId`}
        render={({ field, fieldState }) => (
          <div>
            <PlayerSelect
              {...field}
              value={field.value?.toString() || ''}
              classname="w-72"
              label="Player"
              playerOptions={playerOptions}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name={`${team}.rushing.attempts`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            label="Att"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.rushing.yards`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            label="Yds"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.rushing.tds`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            label="TDs"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
    </div>
  )
}

const ReceivingLeaderInputs: React.FC<StatLeaderInputsProps> = ({
  control,
  team,
  playerOptions,
}: StatLeaderInputsProps) => {
  return (
    <div className="flex gap-2">
      <Controller
        control={control}
        name={`${team}.receiving.playerId`}
        render={({ field, fieldState }) => (
          <div>
            <PlayerSelect
              {...field}
              value={field.value?.toString() || ''}
              classname="w-72"
              label="Player"
              playerOptions={playerOptions}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name={`${team}.receiving.receptions`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            label="Rec"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.receiving.yards`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            label="Yds"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
      <Controller
        control={control}
        name={`${team}.receiving.tds`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={field.value?.toString()}
            label="TDs"
            type="number"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
        )}
      />
    </div>
  )
}

const statLeadersSchema = yup.object({
  homeTeam: yup.object({
    passing: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        attempts: yup.number(),
        completions: yup.number(),
        yards: yup.number(),
        tds: yup.number(),
        ints: yup.number(),
      })
      .optional(),
    rushing: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        attempts: yup.number(),
        yards: yup.number(),
        tds: yup.number(),
      })
      .optional(),
    receiving: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        receptions: yup.number(),
        yards: yup.number(),
        tds: yup.number(),
      })
      .optional(),
    defense: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        tackles: yup.number(),
        sacks: yup.number(),
        ints: yup.number(),
      })
      .optional(),
  }),
  awayTeam: yup.object({
    passing: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        attempts: yup.number(),
        completions: yup.number(),
        yards: yup.number(),
        tds: yup.number(),
        ints: yup.number(),
      })
      .optional(),
    rushing: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        attempts: yup.number(),
        yards: yup.number(),
        tds: yup.number(),
      })
      .optional(),
    receiving: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        receptions: yup.number(),
        yards: yup.number(),
        tds: yup.number(),
      })
      .optional(),
    defense: yup
      .object({
        playerId: yup.number(),
        teamId: yup.number(),
        tackles: yup.number(),
        sacks: yup.number(),
        ints: yup.number(),
      })
      .optional(),
  }),
})

type StatLeadersFormData = yup.InferType<typeof statLeadersSchema>

const EditStatLeaders: React.FC<EditStatLeadersProps> = ({
  game,
  isOpen,
  handleClose,
  dynastyId,
  year,
  scheduleId,
}: EditStatLeadersProps) => {
  const opponent = determineOpponent(game)
  const [createNewPlayer, setCreateNewPlayer] = useState(false)
  const [defaultTeamId, setDefaultTeamId] = useState<number | undefined>()
  const playerOptions = useLiveQuery(
    () => getPlayerOptions(dynastyId),
    [dynastyId]
  )
  const { control, handleSubmit, setValue, reset } =
    useForm<StatLeadersFormData>({
      resolver: yupResolver(statLeadersSchema),
      defaultValues: {
        homeTeam: {
          ...game?.statLeaders?.homeTeam,
        },
        awayTeam: {
          ...game?.statLeaders?.awayTeam,
        },
      },
    })

  useEffect(() => {
    if (game?.statLeaders) {
      setValue('homeTeam', game.statLeaders.homeTeam)
      setValue('awayTeam', game.statLeaders.awayTeam)
    } else {
      reset()
    }
  }, [game, reset, setValue])

  const onNewPlayer = () => {
    setCreateNewPlayer(true)
    setDefaultTeamId(game?.[opponent]?.teamId)
  }

  const handleSave = async (data: StatLeadersFormData) => {
    await db.teamSchedule.update(scheduleId, (schedule) => {
      const gameIndex = schedule.games.findIndex((g) => g.week === game?.week)

      schedule.games[gameIndex] = {
        ...schedule.games[gameIndex],
        statLeaders: {
          homeTeam: {
            ...data.homeTeam,
            passing: {
              ...data.homeTeam.passing,
              teamId: game?.homeTeam?.teamId || 0,
            },
            rushing: {
              ...data.homeTeam.rushing,
              teamId: game?.homeTeam?.teamId || 0,
            },
            receiving: {
              ...data.homeTeam.receiving,
              teamId: game?.homeTeam?.teamId || 0,
            },
            defense: {
              ...data.homeTeam.defense,
              teamId: game?.homeTeam?.teamId || 0,
            },
          } as any,
          awayTeam: {
            ...data.awayTeam,
            passing: {
              ...data.awayTeam.passing,
              teamId: game?.awayTeam?.teamId || 0,
            },
            rushing: {
              ...data.awayTeam.rushing,
              teamId: game?.awayTeam?.teamId || 0,
            },
            receiving: {
              ...data.awayTeam.receiving,
              teamId: game?.awayTeam?.teamId || 0,
            },
            defense: {
              ...data.awayTeam.defense,
              teamId: game?.awayTeam?.teamId || 0,
            },
          } as any,
        },
      }
    })

    handleClose()
    reset()
  }

  return (
    <>
      <EditModal
        isOpen={isOpen}
        handleClose={handleClose}
        formId="stat-leader-form"
        title="Stat Leaders"
        size="3xl"
      >
        <Form id="stat-leader-form" onSubmit={handleSubmit(handleSave)}>
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <h2 className="font-bold text-lg">Passing Leaders</h2>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{game?.homeTeam?.school}</h3>
                  <PassingLeaderInputs
                    control={control}
                    team="homeTeam"
                    playerOptions={playerOptions || []}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{game?.awayTeam?.school}</h3>
                  <PassingLeaderInputs
                    control={control}
                    team="awayTeam"
                    playerOptions={playerOptions || []}
                  />
                </div>
                <NewPlayerButton action={onNewPlayer} />
              </div>
            </div>
            <Divider />
          </div>
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <h2 className="font-bold text-lg">Rushing Leaders</h2>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{game?.homeTeam?.school}</h3>
                  <RushingLeaderInputs
                    control={control}
                    team="homeTeam"
                    playerOptions={playerOptions || []}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{game?.awayTeam?.school}</h3>
                  <RushingLeaderInputs
                    control={control}
                    team="awayTeam"
                    playerOptions={playerOptions || []}
                  />
                </div>
                <NewPlayerButton action={onNewPlayer} />
              </div>
            </div>
            <Divider />
          </div>
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <h2 className="font-bold text-lg">Receiving Leaders</h2>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{game?.homeTeam?.school}</h3>
                  <ReceivingLeaderInputs
                    control={control}
                    team="homeTeam"
                    playerOptions={playerOptions || []}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{game?.awayTeam?.school}</h3>
                  <ReceivingLeaderInputs
                    control={control}
                    team="awayTeam"
                    playerOptions={playerOptions || []}
                  />
                </div>
                <NewPlayerButton action={onNewPlayer} />
              </div>
            </div>
          </div>
        </Form>
      </EditModal>
      <CreateNewPlayer
        year={year}
        dynastyId={dynastyId}
        isOpen={createNewPlayer}
        defaultTeamId={defaultTeamId}
        handleClose={() => setCreateNewPlayer(false)}
      />
    </>
  )
}

export default EditStatLeaders
