import React from 'react'
import SearchableSelect from './SearchableSelect'
import { Select, SelectItem, Input } from '@heroui/react'
import { Control, Controller } from 'react-hook-form'
import { TeamScheduleFormData } from '@/app/team-schedule/create/page'

type TeamScheduleTableProps = {
  numberOfWeeks: number
  teamOptions: { value: string; label: string }[]
  control: Control<TeamScheduleFormData, any>
}

const TeamScheduleTable: React.FC<TeamScheduleTableProps> = ({
  teamOptions,
  numberOfWeeks,
  control,
}: TeamScheduleTableProps) => {
  return (
    <table className="table-auto border-separate rounded bg-default-50 w-full">
      <thead className="bg-default-100 text-center uppercase text-md font-semibold rounded-t">
        <tr>
          <th scope="col" className="px-4 py-3 text-center bg-default-100">
            Week
          </th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Opponent</th>
        </tr>
      </thead>
      <tbody className="gap-4">
        {Array.from({ length: numberOfWeeks }, (_, i) => i).map((week, i) => (
          <tr tabIndex={-1} key={week.toString()}>
            <td className="px-4 py-3 text-center">
              <span className="w-full text-center">{week}</span>
            </td>
            <td className="px-4 py-3">
              <Controller
                control={control}
                name={`games.${i}.location`}
                render={({ field, fieldState }) => (
                  <Select
                    tabIndex={0}
                    fullWidth
                    size="lg"
                    isRequired
                    {...field}
                    validationBehavior="aria"
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    selectedKeys={[field.value]}
                    defaultSelectedKeys={[field.value]}
                  >
                    {['VS', 'AT', 'BYE'].map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </td>
            <td className="px-4 py-3">
              <Controller
                control={control}
                name={`games.${i}.opponent`}
                render={({ field: { value, onChange }, fieldState }) => (
                  <SearchableSelect
                    label="Opponent"
                    value={teamOptions?.find(
                      (option) => option.value === value
                    )}
                    onChange={onChange}
                    placeholder="Select Opponent"
                    options={teamOptions}
                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TeamScheduleTable
