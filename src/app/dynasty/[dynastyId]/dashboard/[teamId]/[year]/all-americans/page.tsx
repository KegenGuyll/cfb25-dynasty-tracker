'use client'

import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { db } from '@/db/db.model'
import { Button, Checkbox, Form, Input } from '@heroui/react'
import { Position } from '@/db/types/player'
import { AllAmerican, TeamSelection } from '@/db/types/allAmerican'
import createNewPlayer, {
  MinPlayerDetails,
} from '@/queries/players/createNewPlayer'
import PositionSelect from '@/components/Player/inputs/PositionSelect'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { useLiveQuery } from 'dexie-react-hooks'
import TeamSelect from '@/components/TeamSelect'
import AllAmericanSelectionSelect from '@/components/Player/inputs/AllAmericanSelectionSelect'
import ClassSelect from '@/components/Player/inputs/ClassSelect'
import AllAmericanConferenceSelect from '@/components/Player/inputs/AllAmericanConfSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import SearchableSelect from '@/components/SearchableSelect'
import getPlayerOptions from '@/queries/players/getPlayerOptions'
import { useRouter, useSearchParams } from 'next/navigation'

export const allAmericanSchema = yup.object({
  allAmericans: yup.array().of(
    yup.object({
      playerId: yup.number().required(),
      redshirt: yup.boolean(),
      doesPlayerExist: yup.boolean(),
      teamId: yup.number().required(),
      position: yup.string(),
      firstName: yup.string(),
      lastName: yup.string(),
      playerClass: yup.string(),
      selection: yup.string(),
      conference: yup.string().required(),
    })
  ),
})

type AllAmericanForm = yup.InferType<typeof allAmericanSchema>

type AllAmericansPageProps = {
  params: {
    dynastyId: string
    teamId: string
    year: string
  }
}

const AllAmericansPage: React.FC<AllAmericansPageProps> = ({
  params: { dynastyId, year, teamId },
}: AllAmericansPageProps) => {
  const params = useSearchParams()

  const editMode = params.get('edit') === 'true'

  const teamOptions = useLiveQuery(() => getTeamSelectOptions())
  const playerOptions = useLiveQuery(() => getPlayerOptions(dynastyId))
  const router = useRouter()

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(allAmericanSchema),
    defaultValues: {
      allAmericans: [
        {
          playerId: 0,
          teamId: 0,
          position: '',
          firstName: '',
          lastName: '',
          playerClass: '',
          selection: '',
          conference: '',
        },
      ],
    },
  })

  const addEmptyPlayer = () => {
    append({
      playerId: 0,
      teamId: 0,
      position: '',
      firstName: '',
      lastName: '',
      playerClass: '',
      selection: '',
      conference: '',
    })
  }

  const handleSave = async (data: AllAmericanForm) => {
    if (!data.allAmericans) return

    const filterNonExistentPlayers = data.allAmericans.filter(
      (allAmerican) => !allAmerican.doesPlayerExist
    )
    const filterExistentPlayers = data.allAmericans.filter(
      (allAmerican) => allAmerican.doesPlayerExist
    )

    const minPlayerDetails: MinPlayerDetails[] = filterNonExistentPlayers.map(
      (allAmerican) => ({
        firstName: allAmerican.firstName || '',
        lastName: allAmerican.lastName || '',
        position: allAmerican.position as Position,
        teamId: allAmerican.teamId,
        year: parseInt(year),
        dynastyId: parseInt(dynastyId),
      })
    )

    const newPlayers = await createNewPlayer(minPlayerDetails, true)

    const formattedNewPlayers: AllAmerican[] = newPlayers.map((player) => {
      const nonExistentPlayer = filterNonExistentPlayers.find(
        (allAmerican) =>
          `${allAmerican.firstName} ${allAmerican.lastName}` ===
          `${player.information.firstName} ${player.information.lastName}`
      )

      return {
        dynastyId: parseInt(dynastyId),
        playerId: player.id || 0,
        teamId: player.teamId,
        year: parseInt(year),
        position: player.information.position as Position,
        name: `${player.information.firstName} ${player.information.lastName}`,
        playerClass: nonExistentPlayer?.playerClass,
        selection: nonExistentPlayer?.selection as TeamSelection,
        conference: nonExistentPlayer?.conference || '',
      }
    })

    const formattedExistingPlayers: AllAmerican[] = filterExistentPlayers.map(
      (allAmerican) => {
        const player = playerOptions?.find(
          (p) => p.value === String(allAmerican.playerId)
        )

        return {
          dynastyId: parseInt(dynastyId),
          playerId: allAmerican.playerId,
          teamId: allAmerican.teamId,
          year: parseInt(year),
          position: allAmerican.position as Position,
          name: player?.label || '',
          playerClass: allAmerican.playerClass,
          selection: allAmerican.selection as TeamSelection,
          conference: allAmerican.conference,
        }
      }
    )

    await db.allAmerican.bulkAdd([
      ...formattedExistingPlayers,
      ...formattedNewPlayers,
    ])

    router.push(`/dynasty/${dynastyId}/dashboard/${teamId}/${year}`)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'allAmericans',
  })

  return (
    <div className="flex flex-col gap-8 max-w-screen-xl bg-content1 p-4 rounded">
      <div>
        <h1 className="text-4xl font-bold">All Americans</h1>
        <p className="text-small font-light">
          Create existing or new All American players for {year}
        </p>
      </div>
      <Form
        className="flex flex-col gap-8  justify-center"
        onSubmit={handleSubmit(handleSave)}
      >
        {fields.map((field, index) => (
          <div className=" grid grid-cols-13 gap-4" key={field.id}>
            <button onClick={() => remove(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Controller
              name={`allAmericans.${index}.doesPlayerExist`}
              control={control}
              render={({ field, fieldState }) => (
                <div
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      console.log('enter')
                      field.onChange(!field.value)
                    }
                  }}
                >
                  <Checkbox
                    validationBehavior="aria"
                    isInvalid={fieldState.invalid}
                    defaultSelected={field.value}
                    checked={field.value}
                    onChange={field.onChange}
                  >
                    Existing Player?
                  </Checkbox>
                </div>
              )}
            />
            <Controller
              name={`allAmericans.${index}.position`}
              control={control}
              render={({ field }) => <PositionSelect {...field} />}
            />
            <Controller
              name={`allAmericans.${index}.playerId`}
              control={control}
              render={({ field, fieldState }) => {
                const existingPlayer = watch(
                  `allAmericans.${index}.doesPlayerExist`
                )

                if (!existingPlayer) return <span />

                const selectedValue = playerOptions?.find(
                  (player) => String(player.value) === String(field.value)
                )

                return (
                  <div className="col-span-2">
                    <SearchableSelect
                      label="Player"
                      value={selectedValue}
                      onChange={field.onChange}
                      options={playerOptions || []}
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                    />
                  </div>
                )
              }}
            />
            <Controller
              name={`allAmericans.${index}.firstName`}
              control={control}
              render={({ field, fieldState }) => {
                const existingPlayer = watch(
                  `allAmericans.${index}.doesPlayerExist`
                )

                if (existingPlayer) return <span />

                return (
                  <Input
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    {...field}
                    label="First Name"
                  />
                )
              }}
            />
            <Controller
              name={`allAmericans.${index}.lastName`}
              control={control}
              render={({ field, fieldState }) => {
                const existingPlayer = watch(
                  `allAmericans.${index}.doesPlayerExist`
                )

                if (existingPlayer) return <span />

                return (
                  <Input
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    {...field}
                    label="Last Name"
                  />
                )
              }}
            />
            <Controller
              name={`allAmericans.${index}.teamId`}
              control={control}
              render={({ field, fieldState }) => (
                <TeamSelect
                  value={String(field.value)}
                  onChange={field.onChange}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  classname="w-1/4 col-span-2"
                  teamOptions={teamOptions || []}
                />
              )}
            />
            <Controller
              name={`allAmericans.${index}.redshirt`}
              control={control}
              render={({ field, fieldState }) => (
                <Checkbox
                  defaultSelected={field.value}
                  checked={field.value}
                  onChange={field.onChange}
                  validationBehavior="aria"
                  isInvalid={fieldState.invalid}
                >
                  Redshirt?
                </Checkbox>
              )}
            />
            <Controller
              control={control}
              name={`allAmericans.${index}.playerClass`}
              render={({ field, fieldState }) => {
                const isRedshirt = watch(`allAmericans.${index}.redshirt`)

                return (
                  <ClassSelect
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    isRedshirt={isRedshirt || false}
                    {...field}
                  />
                )
              }}
            />
            <Controller
              control={control}
              name={`allAmericans.${index}.selection`}
              render={({ field, fieldState }) => (
                <AllAmericanSelectionSelect
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  className="col-span-2"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name={`allAmericans.${index}.conference`}
              render={({ field, fieldState }) => (
                <AllAmericanConferenceSelect
                  className="col-span-2"
                  validationBehavior="aria"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  {...field}
                />
              )}
            />
          </div>
        ))}
        <div className="w-full flex flex-col gap-2">
          <Button onPress={addEmptyPlayer}>Add Another Player</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AllAmericansPage
