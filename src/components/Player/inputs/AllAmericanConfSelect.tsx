import { allAmericanConfOptions } from '@/db/types/allAmerican'
import { playerClassOptions } from '@/db/types/player'
import { Select, SelectItem } from '@heroui/react'
import { ChangeEventHandler, ReactNode } from 'react'

type AllAmericanConfSelectProps = {
  value: string | undefined
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
  onBlur?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  onFocus?: ((e: React.FocusEvent<Element, Element>) => void) | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  ref: React.Ref<HTMLSelectElement>
  className?: string
  validationBehavior?: 'aria' | 'native' | undefined
  errorMessage?: ReactNode | ((v: any) => ReactNode)
  isInvalid?: boolean | undefined
}

const AllAmericanConferenceSelect: React.FC<AllAmericanConfSelectProps> = ({
  value,
  onChange,
  ...other
}: AllAmericanConfSelectProps) => {
  return (
    <Select
      label="Conf."
      value={value}
      defaultSelectedKeys={[value || '']}
      onChange={onChange}
      {...other}
    >
      {allAmericanConfOptions.map((conf) => (
        <SelectItem key={conf.value}>{conf.label}</SelectItem>
      ))}
    </Select>
  )
}

export default AllAmericanConferenceSelect
