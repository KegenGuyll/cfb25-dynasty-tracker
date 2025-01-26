import { playerPositionOptions } from '@/db/types/player'
import { Select, SelectItem, SelectProps } from '@heroui/react'
import { ChangeEventHandler } from 'react'

type PositionSelectProps = {
  value: string | undefined
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
  onBlur?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  onFocus?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  ref: React.Ref<HTMLSelectElement>
  className?: string
  isRequired?: boolean
}

const PositionSelect: React.FC<PositionSelectProps> = ({
  value,
  onChange,
  ...other
}: PositionSelectProps) => {
  return (
    <Select
      label="Pos."
      value={value}
      defaultSelectedKeys={[value || '']}
      onChange={onChange}
      {...other}
    >
      {playerPositionOptions.map((position) => (
        <SelectItem key={position.key}>{position.label}</SelectItem>
      ))}
    </Select>
  )
}

export default PositionSelect
