import { teamSelectionOptions } from '@/db/types/allAmerican'
import { Select, SelectItem } from "@heroui/react"
import { ChangeEventHandler } from 'react'

type AllAmericanPositionSelectProps = {
  value: string | undefined
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
  onBlur?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  onFocus?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  ref: React.Ref<HTMLSelectElement>
  className?: string
}

const AllAmericanSelectionSelect: React.FC<AllAmericanPositionSelectProps> = ({
  value,
  onChange,
  ...other
}: AllAmericanPositionSelectProps) => {
  return (
    <Select
      label="Selection"
      value={value}
      defaultSelectedKeys={[value || '']}
      onChange={onChange}
      {...other}
    >
      {teamSelectionOptions.map((selection) => (
        <SelectItem key={selection.value}>{selection.label}</SelectItem>
      ))}
    </Select>
  )
}

export default AllAmericanSelectionSelect
