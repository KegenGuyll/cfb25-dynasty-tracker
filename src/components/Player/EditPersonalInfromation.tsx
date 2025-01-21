import { Player } from '@/db/types/player'
import EditModal from '../Modal/EditModal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { db } from '@/db/db.model'
import { Form, Input, Select, SelectItem } from '@heroui/react'
import states from '@/data/States.json'
import convertInchesToFeet from '@/utils/convertInchesToFeet'

type EditPersonalInformationProps = {
  player: Player
  isOpen: boolean
  handleClose: () => void
}

export const personalInformationSchema = yup.object({
  hometown: yup.object({
    city: yup.string().required(),
    state: yup.string().required(),
  }),
  height: yup
    .object({
      feet: yup.number().required(),
      inches: yup.number().required(),
    })
    .optional(),
  weight: yup.number().optional(),
})

type PersonalInformationFormData = yup.InferType<
  typeof personalInformationSchema
>

const EditPersonalInformation: React.FC<EditPersonalInformationProps> = ({
  player,
  isOpen,
  handleClose,
}: EditPersonalInformationProps) => {
  const { control, handleSubmit } = useForm<PersonalInformationFormData>({
    resolver: yupResolver(personalInformationSchema),
    defaultValues: {
      hometown: player.information.hometown,
      height: player.information.height
        ? {
            feet: convertInchesToFeet(player.information.height).feet,
            inches: convertInchesToFeet(player.information.height).inches,
          }
        : undefined,
      weight: player.information.weight,
    },
  })

  const onSubmit = async (data: PersonalInformationFormData) => {
    const heightInInches = data.height
      ? data.height.feet * 12 + data.height.inches
      : undefined
    await db.players.update(player.id, {
      'information.hometown': data.hometown,
      'information.height': heightInInches,
      'information.weight': data.weight,
    })
    handleClose()
  }

  return (
    <EditModal
      title="Personal Information"
      isOpen={isOpen}
      handleClose={handleClose}
      formId="personal-information-form"
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        id="personal-information-form"
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4">
          <Controller
            name="hometown.city"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                value={value}
                onChange={onChange}
                label="City"
              />
            )}
          />
          <Controller
            name="hometown.state"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <Select
                label="State"
                value={value}
                defaultSelectedKeys={[value || '']}
                onChange={onChange}
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              >
                {Object.entries(states).map(([state, stateName]) => (
                  <SelectItem key={state}>{stateName}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            name="height.feet"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                value={value ? String(value) : undefined}
                onChange={onChange}
                label="Feet"
                type="number"
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />
            )}
          />
          <Controller
            name="height.inches"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                value={value ? String(value) : undefined}
                onChange={onChange}
                label="Inches"
                type="number"
                validationBehavior="aria"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
              />
            )}
          />
        </div>
        <Controller
          name="weight"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <Input
              value={value ? String(value) : undefined}
              onChange={onChange}
              label="Weight"
              type="number"
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
            />
          )}
        />
      </Form>
    </EditModal>
  )
}

export default EditPersonalInformation
