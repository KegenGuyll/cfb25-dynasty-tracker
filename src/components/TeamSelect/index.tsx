import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { OptionType } from '../SearchableSelect'
import classNames from 'classnames'

type Props = {
  label?: string
  value: string
  onChange: (value: string | undefined) => void
  isInvalid?: boolean
  errorMessage?: string
  classname?: string
  teamOptions: OptionType[]
  isRequired?: boolean
}

const TeamSelect: React.FC<Props> = ({
  value,
  onChange,
  isInvalid,
  errorMessage,
  classname,
  teamOptions,
  isRequired,
  label = 'Team',
}: Props) => {
  return (
    <div className={classNames(classname, 'w-full')}>
      <Autocomplete
        defaultItems={teamOptions || []}
        label={label}
        selectedKey={value?.toString() || ''}
        placeholder="Select Team"
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        isRequired={isRequired}
        onSelectionChange={(key) => onChange(key?.toString())}
        validationBehavior="aria"
      >
        {(teamOption) => (
          <AutocompleteItem key={teamOption.value}>
            {teamOption.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  )
}

export default TeamSelect
