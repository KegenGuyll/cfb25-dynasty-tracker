import {
  abilitiesByPosition,
  Player,
  playerMentalAbilitiesOptions,
  PlayerMentalTrait,
  Position,
} from '@/db/types/player'
import EditModal from '../Modal/EditModal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { db } from '@/db/db.model'
import { useEffect, useMemo, useState } from 'react'
import { Divider, Select, SelectItem } from "@heroui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type EditPlayerAbilitiesProps = {
  player: Player
  isOpen: boolean
  handleClose: () => void
}

export const playerAbilitiesSchema = yup.object({
  tendency: yup.string().required('Tendency is required'),
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
})

type PlayerAbilitiesFormData = yup.InferType<typeof playerAbilitiesSchema>

const EditPlayerAbilities: React.FC<EditPlayerAbilitiesProps> = ({
  player,
  isOpen,
  handleClose,
}: EditPlayerAbilitiesProps) => {
  const [selectedMentalTraits, setSelectedMentalTraits] = useState<
    PlayerMentalTrait[]
  >([])
  const [selectedPhysicalTraits, setSelectedPhysicalTraits] = useState<
    PlayerMentalTrait[]
  >([])

  const { control, handleSubmit, watch } = useForm<PlayerAbilitiesFormData>({
    resolver: yupResolver(playerAbilitiesSchema),
    defaultValues: {
      tendency: player.information.tendency,
      mentalTraits: player.development.mentalTraits,
      physicalTraits: player.development.physicalTraits,
    },
  })

  const playerTendency = watch('tendency')

  const updateSelectedMentalTraits = (values: string[]) => {
    console.log(values)
    if (values.length === 1 && values[0] === '')
      return setSelectedMentalTraits([])

    setSelectedMentalTraits(
      values.map((value) => ({ trait: value, tier: 'Bronze' }))
    )
  }

  const updateSelectedPhysicalTraits = (values: string[]) => {
    if (values.length === 1 && values[0] === '')
      return setSelectedPhysicalTraits([])

    setSelectedPhysicalTraits(
      values.map((value) => ({ trait: value, tier: 'Bronze' }))
    )
  }

  useEffect(() => {
    if (player.development.mentalTraits) {
      setSelectedMentalTraits(player.development.mentalTraits)
    }
  }, [])

  useEffect(() => {
    if (player.development.physicalTraits) {
      setSelectedPhysicalTraits(player.development.physicalTraits)
    }
  }, [])

  const updateMentalTrait = (index: number, value: PlayerMentalTrait) => {
    setSelectedMentalTraits((prevState) => {
      const newState = [...prevState]
      newState[index] = value
      return newState
    })
  }

  const removeMentalTrait = (index: number) => {
    setSelectedMentalTraits((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  const updatePhysicalTrait = (index: number, value: PlayerMentalTrait) => {
    setSelectedPhysicalTraits((prevState) => {
      const newState = [...prevState]
      newState[index] = value
      return newState
    })
  }

  const removePhysicalTrait = (index: number) => {
    setSelectedPhysicalTraits((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  const onSubmit = async (data: PlayerAbilitiesFormData) => {
    await db.players.update(player.id, {
      'information.tendency': data.tendency,
      'development.mentalTraits': selectedMentalTraits,
      'development.physicalTraits': selectedPhysicalTraits,
    })
    handleClose()
  }

  const playerTendencies = useMemo(() => {
    if (abilitiesByPosition[player.information.position as Position]) {
      const tendencies = abilitiesByPosition[
        player.information.position as Position
      ].map((tendency) => ({
        key: tendency.name,
        label: tendency.name,
      }))
      return tendencies
    }

    return []
  }, [player])

  const playerPhysicalAbilities = useMemo(() => {
    if (
      abilitiesByPosition[player.information.position as Position] &&
      playerTendency
    ) {
      const tendency = abilitiesByPosition[
        player.information.position as Position
      ].find((tendency) => tendency.name === playerTendency)

      if (!tendency) return []

      return tendency.abilities
    }

    return []
  }, [playerTendency, player])

  return (
    <EditModal
      title="Player Abilities"
      isOpen={isOpen}
      handleClose={handleClose}
      formId="player-abilities-form"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        id="player-abilities-form"
      >
        <Controller
          control={control}
          name="tendency"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Select
              label="Tendency"
              isRequired
              disabled={!playerTendencies.length}
              value={value}
              onChange={onChange}
              defaultSelectedKeys={[value || '']}
              isInvalid={errors.tendency?.message ? true : false}
              errorMessage={errors?.tendency?.message}
            >
              {playerTendencies?.map((tendency) => (
                <SelectItem key={tendency.key}>{tendency.label}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Divider />
        <Controller
          control={control}
          name="mentalTraits"
          render={({ field }) => (
            <Select
              selectionMode="multiple"
              label="Mental Abilities"
              {...field}
              defaultSelectedKeys={field.value?.map((v) => v.trait)}
              value={field.value?.map((v) => v.trait)}
              onChange={(value) => {
                const values = value.target.value.split(',')
                field.onChange(
                  values.map((v) => ({ trait: v, tier: 'Bronze' }))
                )
                updateSelectedMentalTraits(values)
              }}
            >
              {playerMentalAbilitiesOptions.map((ability) => (
                <SelectItem key={ability.name}>{ability.name}</SelectItem>
              ))}
            </Select>
          )}
        />
        <div>
          <label className="flex flex-col gap-2">
            <span>Mental Traits:</span>
            {selectedMentalTraits.length === 0 && (
              <span>No mental traits selected</span>
            )}
            {selectedMentalTraits.map((field, index) => (
              <div className="flex gap-2 items-center" key={field.trait}>
                <span className="flex-grow w-full">{field.trait}</span>
                <Select
                  value={field.trait}
                  label="Tier"
                  onChange={(e) => {
                    updateMentalTrait(index, {
                      trait: field.trait,
                      tier: e.target.value,
                    })
                  }}
                  defaultSelectedKeys={[field.tier]}
                >
                  <SelectItem key={'Bronze'}>Bronze</SelectItem>
                  <SelectItem key={'Silver'}>Silver</SelectItem>
                  <SelectItem key={'Gold'}>Gold</SelectItem>
                  <SelectItem key={'Platinum'}>Platinum</SelectItem>
                </Select>
                <button
                  name={`remove ${field.trait}`}
                  className="p-2"
                  onClick={() => {
                    removeMentalTrait(index)
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </label>
        </div>
        <Divider />
        <Controller
          control={control}
          name="physicalTraits"
          render={({ field }) => (
            <Select
              selectionMode="multiple"
              label="Physical Abilities"
              defaultSelectedKeys={field.value?.map((v) => v.trait)}
              {...field}
              value={field.value?.map((v) => v.trait)}
              onChange={(value) => {
                const values = value.target.value.split(',')
                field.onChange(
                  values.map((v) => ({ trait: v, tier: 'Bronze' }))
                )
                updateSelectedPhysicalTraits(values)
              }}
            >
              {playerPhysicalAbilities?.map((ability) => (
                <SelectItem key={ability.key}>{ability.label}</SelectItem>
              ))}
            </Select>
          )}
        />
        <div>
          <label className="flex flex-col gap-2">
            <span>Physical Traits:</span>
            {selectedPhysicalTraits.length === 0 && (
              <span>No physical traits selected</span>
            )}
            {selectedPhysicalTraits.map((field, index) => (
              <div className="flex gap-2 items-center" key={field.trait}>
                <span className="flex-grow w-full">{field.trait}</span>
                <Select
                  key={field.trait}
                  value={field.trait}
                  label="Tier"
                  onChange={(e) => {
                    updatePhysicalTrait(index, {
                      trait: field.trait,
                      tier: e.target.value,
                    })
                  }}
                  defaultSelectedKeys={[field.tier]}
                >
                  <SelectItem key={'Bronze'}>Bronze</SelectItem>
                  <SelectItem key={'Silver'}>Silver</SelectItem>
                  <SelectItem key={'Gold'}>Gold</SelectItem>
                  <SelectItem key={'Platinum'}>Platinum</SelectItem>
                </Select>
                <button
                  name={`remove ${field.trait}`}
                  className="p-2"
                  onClick={() => {
                    removePhysicalTrait(index)
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </label>
        </div>
        <Divider />
      </form>
    </EditModal>
  )
}

export default EditPlayerAbilities
