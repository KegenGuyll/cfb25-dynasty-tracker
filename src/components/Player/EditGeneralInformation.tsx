import {
  Player,
  playerDevTraitOptions,
  playerPositionOptions,
} from '@/db/types/player'
import EditModal from '../Modal/EditModal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Input, Select, SelectItem } from '@heroui/react'
import { db } from '@/db/db.model'

type EditPlayerGeneralInformationProps = {
  player: Player
  isOpen: boolean
  handleClose: () => void
}

export const generalInformationSchema = yup.object({
  number: yup.string().nullable(),
  position: yup.string().optional(),
  devTrait: yup.string().optional(),
})

type GeneralInformationFormData = yup.InferType<typeof generalInformationSchema>

const EditGeneralInformation: React.FC<EditPlayerGeneralInformationProps> = ({
  player,
  isOpen,
  handleClose,
}: EditPlayerGeneralInformationProps) => {
  const { control, handleSubmit } = useForm<GeneralInformationFormData>({
    resolver: yupResolver(generalInformationSchema),
    defaultValues: {
      number: player.information.number
        ? String(player.information.number)
        : null,
      position: player.information.position,
      devTrait: player.development.devTrait,
    },
  })

  const onSubmit = async (data: GeneralInformationFormData) => {
    await db.players.update(player.id, {
      'information.number': Number(data.number),
      'information.position': data.position,
      'development.devTrait': data.devTrait,
    })
    handleClose()
  }

  return (
    <EditModal
      handleClose={handleClose}
      isOpen={isOpen}
      formId="general-information-form"
      title={`${player.information.firstName} ${player.information.lastName}`}
    >
      <Form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        id="general-information-form"
      >
        <Controller
          name="number"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <Input
              value={value || undefined}
              onChange={onChange}
              label="Number"
              placeholder="Number"
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <Select
              label="Pos."
              value={value}
              defaultSelectedKeys={[value || '']}
              onChange={onChange}
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            >
              {playerPositionOptions.map((position) => (
                <SelectItem key={position.key}>{position.label}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="devTrait"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <Select
              label="Dev Trait"
              value={value}
              defaultSelectedKeys={[value || '']}
              onChange={onChange}
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            >
              {playerDevTraitOptions.map((trait) => (
                <SelectItem key={trait.key}>{trait.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </Form>
    </EditModal>
  )
}

export default EditGeneralInformation
