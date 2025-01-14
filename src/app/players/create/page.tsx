'use client'

import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { NextPage } from 'next'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SearchableSelect from '@/components/SearchableSelect'
import { useLiveQuery } from 'dexie-react-hooks'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import {
  abilitiesByPosition,
  playerDevTraitOptions,
  playerMentalAbilitiesOptions,
  playerPositionOptions,
  Position,
} from '@/db/types/player'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import GenericInputTable from '@/components/tables/GenericInputTable'
import {
  defenseColumns,
  passingColumns,
  receivingColumns,
  rushingColumns,
} from '@/components/tables/columns/playerInputStatColumns'

export const createPlayerSchema = yup.object({
  teamId: yup.string().required('Select a team'),
  playerInformation: yup.object({
    number: yup.number().required('Number is required'),
    position: yup.string().required('Position is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    nickname: yup.string().optional(),
    height: yup
      .object({
        ft: yup.number(),
        in: yup.number(),
      })
      .optional(),
    weight: yup.number().optional(),
    hometown: yup.string().optional(),
    tendency: yup.string().required('Tendency is required'),
    recruitId: yup.number().optional(),
    hasRedshirt: yup.boolean().optional(),
  }),
  playerDevelopment: yup.object({
    devTrait: yup.string().optional(),
    mentalTraits: yup
      .array()
      .of(
        yup.object({
          trait: yup.string().required(),
          tier: yup.string().required(),
        })
      )
      .optional(),
    physicalTraits: yup
      .array()
      .of(
        yup.object({
          trait: yup.string().required(),
          tier: yup.string().required(),
        })
      )
      .optional(),
  }),
  historicalOverall: yup
    .array()
    .of(
      yup.object({
        year: yup.number().required(),
        overall: yup.number().required(),
      })
    )
    .optional(),
  stats: yup
    .object({
      passing: yup
        .array()
        .of(
          yup.object({
            year: yup.number().nullable(),
            class: yup.string().optional(),
            teamId: yup.number().nullable(),
            redshirt: yup.boolean().nullable(),
            gp: yup.number().nullable(),
            dp: yup.number().nullable(),
            rating: yup.number().nullable(),
            yards: yup.number().nullable(),
            td: yup.number().nullable(),
            int: yup.number().nullable(),
            long: yup.number().nullable(),
            sacks: yup.number().nullable(),
            comp: yup.number().nullable(),
            att: yup.number().nullable(),
            compPct: yup.number().nullable(),
            ypa: yup.number().nullable(),
            ypg: yup.number().nullable(),
          })
        )
        .optional(),
      rushing: yup
        .array()
        .of(
          yup.object({
            year: yup.number().nullable(),
            class: yup.string().optional(),
            teamId: yup.number().nullable(),
            redshirt: yup.boolean().nullable(),
            gp: yup.number().nullable(),
            dp: yup.number().nullable(),
            car: yup.number().nullable(),
            yards: yup.number().nullable(),
            avg: yup.number().nullable(),
            td: yup.number().nullable(),
            avgPerGame: yup.number().nullable(),
            btk: yup.number().nullable(),
            fumb: yup.number().nullable(),
            yac: yup.number().nullable(),
            long: yup.number().nullable(),
            '20+': yup.number().nullable(),
          })
        )
        .optional(),
      receiving: yup
        .array()
        .of(
          yup.object({
            year: yup.number().nullable(),
            class: yup.string().optional(),
            teamId: yup.number().nullable(),
            redshirt: yup.boolean().nullable(),
            gp: yup.number().nullable(),
            dp: yup.number().nullable(),
            rec: yup.number().nullable(),
            yards: yup.number().nullable(),
            avg: yup.number().nullable(),
            td: yup.number().nullable(),
            avgPerGame: yup.number().nullable(),
            rac: yup.number().nullable(),
            racAvg: yup.number().nullable(),
            long: yup.number().nullable(),
            drops: yup.number().nullable(),
          })
        )
        .optional(),
      defense: yup
        .array()
        .of(
          yup.object({
            year: yup.number().nullable(),
            class: yup.string().optional(),
            teamId: yup.number().nullable(),
            redshirt: yup.boolean().nullable(),
            gp: yup.number().nullable(),
            dp: yup.number().nullable(),
            solo: yup.number().nullable(),
            tfl: yup.number().nullable(),
            sack: yup.number().nullable(),
            int: yup.number().nullable(),
            assists: yup.number().nullable(),
            tak: yup.number().nullable(),
            intYds: yup.number().nullable(),
            intAvg: yup.number().nullable(),
            intLng: yup.number().nullable(),
            defl: yup.number().nullable(),
            ctha: yup.number().nullable(),
            ffumb: yup.number().nullable(),
            fumbRec: yup.number().nullable(),
            fumbYds: yup.number().nullable(),
            block: yup.number().nullable(),
            sfty: yup.number().nullable(),
            td: yup.number().nullable(),
          })
        )
        .optional(),
    })
    .optional(),
  awards: yup.array().of(yup.number().required()).optional(),
})

const emptyPassingStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  rating: null,
  yards: null,
  td: null,
  int: null,
  long: null,
  sacks: null,
  comp: null,
  att: null,
  compPct: null,
  ypa: null,
  ypg: null,
}

const emptyRushingStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  car: null,
  yards: null,
  avg: null,
  td: null,
  avgPerGame: null,
  btk: null,
  fumb: null,
  yac: null,
  long: null,
  '20+': null,
}

const emptyReceivingStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  rec: null,
  yards: null,
  avg: null,
  td: null,
  avgPerGame: null,
  rac: null,
  racAvg: null,
  long: null,
  drops: null,
}

const emptyDefenseStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  solo: null,
  tfl: null,
  sack: null,
  int: null,
  assists: null,
  tak: null,
  intYds: null,
  intAvg: null,
  intLng: null,
  defl: null,
  ctha: null,
  ffumb: null,
  fumbRec: null,
  fumbYds: null,
  block: null,
  sfty: null,
  td: null,
}

type CreatePlayerFormData = yup.InferType<typeof createPlayerSchema>

const CreatePlayerPage: NextPage = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePlayerFormData>({
    resolver: yupResolver(createPlayerSchema),
  })

  const {
    fields: passingFields,
    append: passingAppend,
    remove: passingRemove,
  } = useFieldArray({
    control,
    name: 'stats.passing',
  })
  const {
    fields: rushingFields,
    append: rushingAppend,
    remove: rushingRemove,
  } = useFieldArray({
    control,
    name: 'stats.rushing',
  })
  const {
    fields: receivingFields,
    append: receivingAppend,
    remove: receivingRemove,
  } = useFieldArray({
    control,
    name: 'stats.receiving',
  })
  const {
    fields: defenseFields,
    append: defenseAppend,
    remove: defenseRemove,
  } = useFieldArray({
    control,
    name: 'stats.defense',
  })

  const playerPosition = watch('playerInformation.position')
  const playerTendency = watch('playerInformation.tendency')

  const playerTendencies = useMemo(() => {
    if (abilitiesByPosition[playerPosition as Position]) {
      const tendencies = abilitiesByPosition[playerPosition as Position].map(
        (tendency) => ({
          key: tendency.name,
          label: tendency.name,
        })
      )
      return tendencies
    }

    return []
  }, [playerPosition])

  const playerPhysicalAbilities = useMemo(() => {
    if (abilitiesByPosition[playerPosition as Position] && playerTendency) {
      const tendency = abilitiesByPosition[playerPosition as Position].find(
        (tendency) => tendency.name === playerTendency
      )

      if (!tendency) return []

      return tendency.abilities
    }

    return []
  }, [playerTendency, playerPosition])

  const teamOptions = useLiveQuery(() => getTeamSelectOptions())

  const onSubmit = async (data: CreatePlayerFormData) => {
    console.log(data)

    // await db.players.add({
    //   information: {
    //     ...data.playerInformation,
    //     height: `${data.playerInformation?.height?.ft}'${data.playerInformation?.height?.in}"`,
    //   },
    //   development: data.playerDevelopment,
    //   stats: {
    //     passing: data.stats?.passing,
    //     rushing: data.stats?.rushing,
    //     receiving: data.stats?.receiving,
    //     defense: data.stats?.defense,
    //   },
    //   awards: data.awards ?? [],
    //   historicalOverall: data.historicalOverall,
    //   teamId: +data.teamId,
    // })

    // router.push(playerDashboardUrl)
  }

  return (
    <div>
      <h1>Create Player</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full divide-y flex flex-col gap-8"
      >
        <Button color="primary" variant="solid" type="submit">
          Save Player
        </Button>
        <div className="flex flex-col gap-8 pt-8">
          <h2 className="text-2xl">Player Information</h2>
          <div className="flex gap-4 max-w-full">
            <Controller
              control={control}
              name="playerInformation.firstName"
              render={({ field }) => (
                <Input {...field} isRequired label="First Name" />
              )}
            />
            <Controller
              control={control}
              name="playerInformation.lastName"
              render={({ field }) => (
                <Input {...field} isRequired label="Last Name" />
              )}
            />
            <Controller
              control={control}
              name="playerInformation.nickname"
              render={({ field }) => <Input {...field} label="Nickname" />}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4">
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
              <div className="flex gap-4 w-full">
                <Controller
                  control={control}
                  name="playerInformation.position"
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => (
                    <Select
                      isRequired
                      label="Position"
                      value={value}
                      onChange={onChange}
                      isInvalid={
                        errors.playerInformation?.position?.message
                          ? true
                          : false
                      }
                      errorMessage={errors.playerInformation?.position?.message}
                    >
                      {playerPositionOptions.map((position) => (
                        <SelectItem key={position.key}>
                          {position.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="playerInformation.number"
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field?.value?.toString() || undefined}
                      type="number"
                      isRequired
                      label="Number"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-gray-500 bg-opacity-20 rounded flex gap-2 p-1 items-center">
              <Controller
                control={control}
                name="playerInformation.height.ft"
                render={({ field, formState: { errors } }) => (
                  <Input
                    {...field}
                    className="max-w-32"
                    value={field?.value?.toString()}
                    type="number"
                    isInvalid={
                      errors.playerInformation?.height?.ft?.message
                        ? true
                        : false
                    }
                    errorMessage={errors.playerInformation?.height?.ft?.message}
                    label="Height (ft)"
                  />
                )}
              />
              <span className="font-bold text-xl">-</span>
              <Controller
                control={control}
                name="playerInformation.height.in"
                render={({ field, formState: { errors } }) => (
                  <Input
                    {...field}
                    className="max-w-32"
                    value={field?.value?.toString()}
                    isInvalid={
                      errors.playerInformation?.height?.in?.message
                        ? true
                        : false
                    }
                    errorMessage={errors.playerInformation?.height?.in?.message}
                    type="number"
                    label="Height (in)"
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="playerInformation.weight"
              render={({ field }) => (
                <Input
                  {...field}
                  className="max-w-32"
                  value={field?.value?.toString() || undefined}
                  type="number"
                  label="Weight (lbs)"
                />
              )}
            />
          </div>
          <div className="flex gap-4 max-w-full">
            <Controller
              control={control}
              name="playerInformation.tendency"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <Select
                  label="Tendency"
                  isRequired
                  disabled={!playerTendencies.length}
                  value={value}
                  onChange={onChange}
                  isInvalid={
                    errors.playerInformation?.tendency?.message ? true : false
                  }
                  errorMessage={errors.playerInformation?.tendency?.message}
                >
                  {playerTendencies?.map((tendency) => (
                    <SelectItem key={tendency.key}>{tendency.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              control={control}
              name="playerInformation.hometown"
              render={({ field }) => <Input {...field} label="Home Town" />}
            />
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2 className="text-2xl">Development</h2>
          <div className="flex gap-4 max-w-64">
            <Controller
              control={control}
              name="playerDevelopment.devTrait"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <Select
                  label="Dev Trait"
                  value={value}
                  onChange={onChange}
                  isInvalid={
                    errors.playerDevelopment?.devTrait?.message ? true : false
                  }
                  errorMessage={errors.playerDevelopment?.devTrait?.message}
                >
                  {playerDevTraitOptions.map((trait) => (
                    <SelectItem key={trait.key}>{trait.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="flex gap-4">
            <Controller
              control={control}
              name="playerDevelopment.mentalTraits"
              render={({ field }) => (
                <Select
                  className="max-w-80"
                  selectionMode="multiple"
                  label="Mental Abilities"
                  {...field}
                  value={field.value?.map((v) => v.trait)}
                  onChange={(value) => {
                    const values = value.target.value.split(',')
                    field.onChange(
                      values.map((v) => ({ trait: v, tier: 'Bronze' }))
                    )
                  }}
                >
                  {playerMentalAbilitiesOptions.map((ability) => (
                    <SelectItem key={ability.name}>{ability.name}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              control={control}
              name="playerDevelopment.physicalTraits"
              render={({ field }) => (
                <Select
                  className="max-w-80"
                  selectionMode="multiple"
                  label="Physical Abilities"
                  {...field}
                  value={field.value?.map((v) => v.trait)}
                  onChange={(value) => {
                    const values = value.target.value.split(',')
                    field.onChange(
                      values.map((v) => ({ trait: v, tier: 'Bronze' }))
                    )
                  }}
                >
                  {playerPhysicalAbilities?.map((ability) => (
                    <SelectItem key={ability.key}>{ability.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2 className="text-2xl">Career Stats</h2>
          <div className="flex gap-4">
            <Button onPress={() => passingAppend(emptyPassingStat)}>
              Create Passing Table
            </Button>
            <Button onPress={() => rushingAppend(emptyRushingStat)}>
              Create Rushing Table
            </Button>
            <Button onPress={() => receivingAppend(emptyReceivingStat)}>
              Create Receiving Table
            </Button>
            <Button onPress={() => defenseAppend(emptyDefenseStat)}>
              Create Defense Table
            </Button>
          </div>
          {passingFields.length > 0 && (
            <GenericInputTable
              title="Passing"
              rowCount={passingFields.length}
              columns={passingColumns(control, (i) => passingRemove(i), watch)}
            />
          )}
          {rushingFields.length > 0 && (
            <GenericInputTable
              title="Rushing"
              rowCount={rushingFields.length}
              columns={rushingColumns(control, (i) => rushingRemove(i), watch)}
            />
          )}
          {receivingFields.length > 0 && (
            <GenericInputTable
              title="Receiving"
              rowCount={receivingFields.length}
              columns={receivingColumns(
                control,
                (i) => receivingRemove(i),
                watch
              )}
            />
          )}
          {defenseFields.length > 0 && (
            <GenericInputTable
              title="Defense"
              rowCount={defenseFields.length}
              columns={defenseColumns(control, (i) => defenseRemove(i), watch)}
            />
          )}
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2 className="text-2xl">Awards</h2>
          <div className="flex gap-4">
            <Button>Create new Award</Button>
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2 className="text-2xl">Historical Ovr</h2>
          <div className="flex gap-4">
            <Button>Create Ovr datapoint</Button>
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2 className="text-2xl">Notes</h2>
          <div className="flex gap-4">
            <Textarea label="Notes" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePlayerPage
