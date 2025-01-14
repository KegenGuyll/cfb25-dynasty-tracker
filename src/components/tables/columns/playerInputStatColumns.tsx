import { Input, Button, Select, SelectItem, Checkbox } from '@nextui-org/react'
import { TableColumn } from '../GenericInputTable'
import { Control, Controller, UseFormWatch } from 'react-hook-form'
import TeamSelect from '@/components/TeamSelect'
import { playerClassOptions } from '@/db/types/player'

const basicInputColumns = (
  control: Control<any>,
  deleteRow: (rowIndex: number) => void,
  statCategory: string,
  watch: UseFormWatch<any>
): TableColumn[] => [
  {
    title: '',
    key: 'options',
    render: (rowIndex: number) => (
      <Button onClick={() => deleteRow(rowIndex)}>Delete</Button>
    ),
  },
  {
    title: 'Year',
    key: 'year',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`${statCategory}.${rowIndex}.year`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Year" />
        )}
      />
    ),
  },
  {
    title: 'Redshirt',
    key: 'redshirt',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`${statCategory}.${rowIndex}.redshirt`}
        render={({ field }) => (
          <Checkbox defaultSelected={field.value} {...field}>
            Has Redshirt?
          </Checkbox>
        )}
      />
    ),
  },
  {
    title: 'Class',
    key: 'class',
    render: (rowIndex: number) => {
      const redshirt = watch(`${statCategory}.${rowIndex}.redshirt`)
      const options = playerClassOptions(redshirt)

      return (
        <Controller
          control={control}
          name={`${statCategory}.${rowIndex}.class`}
          render={({ field }) => (
            <Select
              items={options}
              {...field}
              className="w-[105px]"
              label="Class"
              selectedKeys={[field.value]}
            >
              {(option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              )}
            </Select>
          )}
        />
      )
    },
  },
  {
    title: 'Team',
    key: 'teamid',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`${statCategory}.${rowIndex}.teamId`}
        render={({ field }) => (
          <TeamSelect
            classname="min-w-[250px]"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    ),
  },
]

const passingInputColumns = (
  control: Control<any>,
  deleteRow: (rowIndex: number) => void,
  watch: UseFormWatch<any>
): TableColumn[] => [
  ...basicInputColumns(control, deleteRow, 'passing', watch),
  {
    title: 'Rating',
    key: 'rating',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`passing.${rowIndex}.rating`}
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
        name={`passing.${rowIndex}.yards`}
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
        name={`passing.${rowIndex}.td`}
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
        name={`passing.${rowIndex}.int`}
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
        name={`passing.${rowIndex}.long`}
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
        name={`passing.${rowIndex}.sacks`}
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
        name={`passing.${rowIndex}.comp`}
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
        name={`passing.${rowIndex}.att`}
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
        name={`passing.${rowIndex}.compPct`}
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
        name={`passing.${rowIndex}.ypg`}
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
        name={`passing.${rowIndex}.ypa`}
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
        name={`passing.${rowIndex}.gp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="GP" />
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
        name={`passing.${rowIndex}.dp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="DP" />
        )}
      />
    ),
  },
]

const rushingInputColumns = (
  control: Control<any>,
  deleteRow: (rowIndex: number) => void,
  watch: UseFormWatch<any>
): TableColumn[] => [
  ...basicInputColumns(control, deleteRow, 'rushing', watch),
  {
    title: 'Car',
    key: 'car',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.car`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Car" />
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
        name={`rushing.${rowIndex}.yards`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Yards" />
        )}
      />
    ),
  },
  {
    title: 'AVG',
    key: 'avg',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.avg`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="AVG" />
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
        name={`rushing.${rowIndex}.td`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="TD" />
        )}
      />
    ),
  },
  {
    title: 'AVG G',
    key: 'avgG',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.avgPerGame`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="AVG G" />
        )}
      />
    ),
  },
  {
    title: 'BTK',
    key: 'btk',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.btk`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="BTK" />
        )}
      />
    ),
  },
  {
    title: 'Fumb',
    key: 'fumb',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.fumb`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="Fumb" />
        )}
      />
    ),
  },
  {
    title: 'YAC',
    key: 'yac',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.yac`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="YAC" />
        )}
      />
    ),
  },
  {
    title: 'LONG',
    key: 'long',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.long`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="LONG" />
        )}
      />
    ),
  },
  {
    title: '20+',
    key: '20+',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`rushing.${rowIndex}.20+`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="20+" />
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
        name={`rushing.${rowIndex}.gp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="GP" />
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
        name={`rushing.${rowIndex}.dp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="DP" />
        )}
      />
    ),
  },
]

const receivingInputColumns = (
  control: Control<any>,
  deleteRow: (rowIndex: number) => void,
  watch: UseFormWatch<any>
): TableColumn[] => [
  ...basicInputColumns(control, deleteRow, 'receiving', watch),
  {
    title: 'rec',
    key: 'rec',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.rec`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="REC" />
        )}
      />
    ),
  },
  {
    title: 'yards',
    key: 'yards',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.yards`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="YARDDS" />
        )}
      />
    ),
  },
  {
    title: 'avg',
    key: 'avg',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.avg`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="AVG" />
        )}
      />
    ),
  },
  {
    title: 'avg G',
    key: 'avgG',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.avgPerGame`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="AVG G" />
        )}
      />
    ),
  },
  {
    title: 'td',
    key: 'td',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.td`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="TD" />
        )}
      />
    ),
  },
  {
    title: 'rac',
    key: 'rac',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.rac`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="RAC" />
        )}
      />
    ),
  },
  {
    title: 'racAvg',
    key: 'racAvg',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.racAvg`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="RAC AVG" />
        )}
      />
    ),
  },
  {
    title: 'long',
    key: 'long',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.long`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="LONG" />
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
        name={`receiving.${rowIndex}.gp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="GP" />
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
        name={`receiving.${rowIndex}.dp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="DP" />
        )}
      />
    ),
  },
  {
    title: 'drops',
    key: 'drops',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`receiving.${rowIndex}.drops`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="DROPS" />
        )}
      />
    ),
  },
]

const defenseInputColumns = (
  control: Control<any>,
  deleteRow: (rowIndex: number) => void,
  watch: UseFormWatch<any>
): TableColumn[] => [
  ...basicInputColumns(control, deleteRow, 'defense', watch),
  {
    title: 'solo',
    key: 'solo',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.solo`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="SOLO" />
        )}
      />
    ),
  },
  {
    title: 'Assists',
    key: 'Assists',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.assists`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="ASSISTS" />
        )}
      />
    ),
  },
  {
    title: 'Tak',
    key: 'tak',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.tak`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="TAK" />
        )}
      />
    ),
  },
  {
    title: 'tfl',
    key: 'tfl',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.tfl`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="TFL" />
        )}
      />
    ),
  },
  {
    title: 'SACK',
    key: 'sack',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.sack`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="SACK" />
        )}
      />
    ),
  },
  {
    title: 'int',
    key: 'int',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.int`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="INT" />
        )}
      />
    ),
  },
  {
    title: 'INT YDS',
    key: 'intYds',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.intYds`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="INT YDS" />
        )}
      />
    ),
  },
  {
    title: 'int AVG',
    key: 'intAvg',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.intAvg`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="INT AVG" />
        )}
      />
    ),
  },
  {
    title: 'int LNG',
    key: 'intLng',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.intLng`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="INT LONG" />
        )}
      />
    ),
  },
  {
    title: 'DEFL',
    key: 'defl',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.defl`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="DEFL" />
        )}
      />
    ),
  },
  {
    title: 'CTHA',
    key: 'ctha',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.ctha`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="CTHA" />
        )}
      />
    ),
  },
  {
    title: 'ffumb',
    key: 'ffumb',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.ffumb`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="FFUMB" />
        )}
      />
    ),
  },
  {
    title: 'FUMBREC',
    key: 'fumbRec',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.fumbRec`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="FUMBREC" />
        )}
      />
    ),
  },
  {
    title: 'FUMBYDS',
    key: 'FUMBYDS',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.fumbYds`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="FUMBYDS" />
        )}
      />
    ),
  },
  {
    title: 'BLOCK',
    key: 'BLOCK',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.block`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="BLOCK" />
        )}
      />
    ),
  },
  {
    title: 'SFTY',
    key: 'sfty',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`defense.${rowIndex}.sfty`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="SFTY" />
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
        name={`defense.${rowIndex}.td`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="TD" />
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
        name={`defense.${rowIndex}.gp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="GP" />
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
        name={`defense.${rowIndex}.dp`}
        render={({ field }) => (
          <Input {...field} className="w-[100px]" label="DP" />
        )}
      />
    ),
  },
]

export {
  passingInputColumns,
  rushingInputColumns,
  receivingInputColumns,
  defenseInputColumns,
}
