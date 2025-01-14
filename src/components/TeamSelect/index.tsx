import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import { useLiveQuery } from 'dexie-react-hooks'
import SearchableSelect from '../SearchableSelect'
import classNames from 'classnames'

type Props = {
  value: string
  onChange?: (value: string | undefined) => void
  errors?: Record<string, { message: string }>
  classname?: string
}

const TeamSelect: React.FC<Props> = ({
  value,
  onChange,
  errors,
  classname,
}: Props) => {
  const teamOptions = useLiveQuery(() => getTeamSelectOptions())

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
        isInvalid={errors?.teamId?.message ? true : false}
        isRequired
      />
      <span className="text-xs text-danger">{errors?.teamId?.message}</span>
    </div>
  )
}

export default TeamSelect
