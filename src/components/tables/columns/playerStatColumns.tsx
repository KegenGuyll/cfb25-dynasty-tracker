import { Input } from '@nextui-org/input'
import { TableColumn } from '../GenericInputTable'
import { Control, Controller } from 'react-hook-form'

const passingColumns = <T extends {}>(control: Control<any>): TableColumn[] => [
  {
    title: 'Year',
    key: 'year',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.year`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Year" />
        )}
      />
    ),
  },
  {
    title: 'Class',
    key: 'class',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.class`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Class" />
        )}
      />
    ),
  },
  {
    title: 'Team',
    key: 'teamid',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.teamId`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Team" />
        )}
      />
    ),
  },
  {
    title: 'Rating',
    key: 'rating',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.rating`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Rating" />
        )}
      />
    ),
  },
  {
    title: 'Yards',
    key: 'yards',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.yards`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Yards" />
        )}
      />
    ),
  },
  {
    title: 'TD',
    key: 'td',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.td`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="TD" />
        )}
      />
    ),
  },
  {
    title: 'INT',
    key: 'int',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.int`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="INT" />
        )}
      />
    ),
  },
  {
    title: 'Long',
    key: 'long',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.long`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Long" />
        )}
      />
    ),
  },
  {
    title: 'Sacks',
    key: 'sacks',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.sacks`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Sacks" />
        )}
      />
    ),
  },
  {
    title: 'Comp',
    key: 'comp',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.comp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Comp" />
        )}
      />
    ),
  },
  {
    title: 'Att',
    key: 'att',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.att`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Att" />
        )}
      />
    ),
  },
  {
    title: 'Comp %',
    key: 'compPct',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.compPct`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Comp %" />
        )}
      />
    ),
  },
  {
    title: 'YPG',
    key: 'ypg',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.ypg`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="YPG" />
        )}
      />
    ),
  },
  {
    title: 'YPA',
    key: 'ypa',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.ypa`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="YPA" />
        )}
      />
    ),
  },
  {
    title: 'GP',
    key: 'gp',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.gp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Games Played" />
        )}
      />
    ),
  },
  {
    title: 'DP',
    key: 'dp',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`stats.passing.${rowIndex}.dp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Downs Played" />
        )}
      />
    ),
  },
]

export { passingColumns }
