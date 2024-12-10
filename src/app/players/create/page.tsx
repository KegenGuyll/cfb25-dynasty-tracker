'use client'

import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { NextPage } from 'next'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TeamSelect from '@/components/TeamSelect'
import { useLiveQuery } from 'dexie-react-hooks'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { Select, SelectItem } from '@nextui-org/select'
import {
  abilitiesByPosition,
  playerDevTraitOptions,
  playerMentalAbilitiesOptions,
  playerPositionOptions,
  Position,
} from '@/db/types/player'
import { useMemo } from 'react'
import { db } from '@/db/db.model'
import { useRouter } from 'next/navigation'
import { playerDashboardUrl } from '@/constants/urls'

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
            year: yup.number().required(),
            class: yup.string().required(),
            teamId: yup.number().required(),
            gp: yup.number().required(),
            dp: yup.number().required(),
            rating: yup.number().required(),
            yards: yup.number().required(),
            td: yup.number().required(),
            int: yup.number().required(),
            long: yup.number().required(),
            sacks: yup.number().required(),
            comp: yup.number().required(),
            att: yup.number().required(),
            compPct: yup.number().required(),
            ypa: yup.number().required(),
            ypg: yup.number().required(),
          })
        )
        .optional(),
      rushing: yup
        .array()
        .of(
          yup.object({
            year: yup.number().required(),
            class: yup.string().required(),
            teamId: yup.number().required(),
            gp: yup.number().required(),
            dp: yup.number().required(),
            car: yup.number().required(),
            yards: yup.number().required(),
            avg: yup.number().required(),
            td: yup.number().required(),
            avgPerGame: yup.number().required(),
            btk: yup.number().required(),
            fumb: yup.number().required(),
            yac: yup.number().required(),
            long: yup.number().required(),
            '20+': yup.number().required(),
          })
        )
        .optional(),
      receiving: yup
        .array()
        .of(
          yup.object({
            year: yup.number().required(),
            class: yup.string().required(),
            teamId: yup.number().required(),
            gp: yup.number().required(),
            dp: yup.number().required(),
            rec: yup.number().required(),
            yards: yup.number().required(),
            avg: yup.number().required(),
            td: yup.number().required(),
            avgPerGame: yup.number().required(),
            rac: yup.number().required(),
            racAvg: yup.number().required(),
            long: yup.number().required(),
            drops: yup.number().required(),
          })
        )
        .optional(),
      defense: yup
        .array()
        .of(
          yup.object({
            year: yup.number().required(),
            class: yup.string().required(),
            teamId: yup.number().required(),
            gp: yup.number().required(),
            dp: yup.number().required(),
            solo: yup.number().required(),
            ast: yup.number().required(),
            total: yup.number().required(),
            tfl: yup.number().required(),
            sack: yup.number().required(),
            int: yup.number().required(),
            pd: yup.number().required(),
            ff: yup.number().required(),
            fr: yup.number().required(),
            blk: yup.number().required(),
            assists: yup.number().required(),
            tak: yup.number().required(),
            intYds: yup.number().required(),
            intAvg: yup.number().required(),
            intLng: yup.number().required(),
            defl: yup.number().required(),
            ctha: yup.number().required(),
            ffumb: yup.number().required(),
            fumbRec: yup.number().required(),
            fumbYds: yup.number().required(),
            block: yup.number().required(),
            sfty: yup.number().required(),
            td: yup.number().required(),
          })
        )
        .optional(),
    })
    .optional(),
  awards: yup.array().of(yup.number().required()).optional(),
})

type CreatePlayerFormData = yup.InferType<typeof createPlayerSchema>

const CreatePlayerPage: NextPage = () => {
  const router = useRouter()
  const { control, handleSubmit, watch } = useForm<CreatePlayerFormData>({
    resolver: yupResolver(createPlayerSchema),
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
    await db.players.add({
      information: {
        ...data.playerInformation,
        height: `${data.playerInformation?.height?.ft}'${data.playerInformation?.height?.in}"`,
      },
      development: data.playerDevelopment,
      stats: {
        passing: data.stats?.passing,
        rushing: data.stats?.rushing,
        receiving: data.stats?.receiving,
        defense: data.stats?.defense,
      },
      awards: data.awards ?? [],
      historicalOverall: data.historicalOverall,
      teamId: +data.teamId,
    })

    router.push(playerDashboardUrl)
  }

  return (
    <div>
      <h1>Create Player</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded p-8 w-full divide-y flex flex-col gap-8"
      >
        <Button color="primary" variant="solid" type="submit">
          Save Player
        </Button>
        <div className="flex flex-col gap-8 pt-8">
          <h2>Player Information</h2>
          <div className="flex gap-4 max-w-full">
            <Controller
              control={control}
              name="playerInformation.firstName"
              render={({ field }) => (
                <Input {...field} required label="First Name" />
              )}
            />
            <Controller
              control={control}
              name="playerInformation.nickname"
              render={({ field }) => <Input {...field} label="Nickname" />}
            />
            <Controller
              control={control}
              name="playerInformation.lastName"
              render={({ field }) => (
                <Input {...field} required label="Last Name" />
              )}
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
              <div className="flex gap-4 w-full">
                <Controller
                  control={control}
                  name="playerInformation.position"
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => (
                    <Select
                      required
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
                      required
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
                  required={false}
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
                  required
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
          <h2>Development</h2>
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
          <h2>Career Stats</h2>
          <div className="flex gap-4">
            <Button>Create Passing Table</Button>
            <Button>Create Rushing Table</Button>
            <Button>Create Receiving Table</Button>
            <Button>Create Defense Table</Button>
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2>Awards</h2>
          <div className="flex gap-4">
            <Button>Create new Award</Button>
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2>Historical Ovr</h2>
          <div className="flex gap-4">
            <Button>Create Ovr datapoint</Button>
          </div>
        </div>
        <div className="pt-8 flex flex-col gap-8">
          <h2>Notes</h2>
          <div className="flex gap-4">
            <Textarea label="Notes" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePlayerPage
