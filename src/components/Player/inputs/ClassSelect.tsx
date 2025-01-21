import { playerClassOptions } from '@/db/types/player'
import { Select, SelectItem } from "@heroui/react"
import { ChangeEventHandler } from 'react'

type ClassSelectProps = {
  isRedshirt: boolean
  value: string | undefined
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
  onBlur?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  onFocus?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  ref: React.Ref<HTMLSelectElement>
  className?: string
}

const ClassSelect: React.FC<ClassSelectProps> = ({
  isRedshirt,
  value,
  onChange,
  ...other
}: ClassSelectProps) => {
  return (
    <Select
      label="Year"
      value={value}
      defaultSelectedKeys={[value || '']}
      onChange={onChange}
      {...other}
    >
      {playerClassOptions(isRedshirt).map((classObj) => (
        <SelectItem key={classObj.key}>{classObj.label}</SelectItem>
      ))}
    </Select>
  )
}

export default ClassSelect
