import SearchableSelect, { OptionType } from '../SearchableSelect'
import classNames from 'classnames'

type Props = {
  value: string
  onChange?: (value: string | undefined) => void
  isInvalid?: boolean
  errorMessage?: string
  classname?: string
  teamOptions: OptionType[]
}

const TeamSelect: React.FC<Props> = ({
  value,
  onChange,
  isInvalid,
  errorMessage,
  classname,
  teamOptions,
}: Props) => {
  return (
    <div className={classNames(classname, 'w-full')}>
      <SearchableSelect
        options={teamOptions || []}
        label="Team"
        placeholder="Select Team"
        value={teamOptions?.find(
          (option) => String(option.value) === String(value)
        )}
        onChange={onChange}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        isRequired
      />
    </div>
  )
}

export default TeamSelect
