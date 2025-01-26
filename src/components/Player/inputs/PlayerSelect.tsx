import { OptionType } from '@/components/SearchableSelect'
import { Autocomplete, AutocompleteItem } from '@heroui/react'
import classNames from 'classnames'

type PlayerSelectProps = {
  label?: string
  value: string
  onChange: (value: string | undefined) => void
  isInvalid?: boolean
  errorMessage?: string
  classname?: string
  playerOptions: OptionType[]
  isRequired?: boolean
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({
  value,
  onChange,
  isInvalid,
  errorMessage,
  classname,
  playerOptions,
  isRequired,
  label = 'Player',
}: PlayerSelectProps) => {
  return (
    <Autocomplete
      className={classNames(classname)}
      defaultItems={playerOptions || []}
      label={label}
      selectedKey={value?.toString() || ''}
      placeholder="Select Team"
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired={isRequired}
      onSelectionChange={(key) => onChange(key?.toString())}
      validationBehavior="aria"
      fullWidth
    >
      {(playerOption) => (
        <AutocompleteItem key={playerOption.value}>
          {playerOption.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}

export default PlayerSelect
