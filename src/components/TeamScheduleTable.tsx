import React from 'react'
import TeamSelect from './TeamSelect'
import { Select, SelectItem } from '@nextui-org/select'
import { Input } from '@nextui-org/input'
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
    <table className="table-auto border-separate rounded bg-default-50">
      <thead className="bg-default-100 text-center uppercase text-md font-semibold rounded-t">
        <tr>
          <th scope="col" className="px-4 py-3 text-center bg-default-100">
            Week
          </th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Opponent</th>
          <th className="px-4 py-3">Final Score</th>
          <th className="px-4 py-3">Result</th>
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
                render={({ field, formState: { errors, isValid } }) => (
                  <Select
                    tabIndex={0}
                    fullWidth
                    size="lg"
                    isRequired
                    isInvalid={
                      errors.games?.[i]?.location?.message ? true : false
                    }
                    {...field}
                    selectedKeys={[field.value]}
                    defaultSelectedKeys={[field.value]}
                    errorMessage={errors.games?.[i]?.location?.message}
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
                render={({ field: { value, onChange } }) => (
                  <TeamSelect
                    label="Opponent"
                    value={teamOptions?.find(
                      (option) => option.value === value
                    )}
                    onChange={onChange}
                    placeholder="Select Opponent"
                    options={teamOptions}
                  />
                )}
              />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-center flex-row gap-x-1 w-full">
                <div className="max-w-[80px]">
                  <Controller
                    control={control}
                    name={`games.${i}.finalScore.score1`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        tabIndex={0}
                        placeholder="0"
                        fullWidth
                        size="lg"
                        value={value}
                        onChange={onChange}
                        type="number"
                      />
                    )}
                  />
                </div>
                <span className="font-bold text-xl">-</span>
                <div className="max-w-[80px]">
                  <Controller
                    control={control}
                    name={`games.${i}.finalScore.score2`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        tabIndex={0}
                        placeholder="0"
                        fullWidth
                        size="lg"
                        value={value}
                        onChange={onChange}
                        type="number"
                      />
                    )}
                  />
                </div>
              </div>
            </td>
            <td className="px-4 py-3">
              <Controller
                control={control}
                name={`games.${i}.result`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Select
                      tabIndex={0}
                      fullWidth
                      size="lg"
                      value={value || ''}
                      selectedKeys={[String(value)]}
                      defaultSelectedKeys={[String(value)]}
                      onChange={onChange}
                    >
                      {['W', 'L'].map((result) => (
                        <SelectItem key={result} value={result}>
                          {result}
                        </SelectItem>
                      ))}
                    </Select>
                  )
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TeamScheduleTable
