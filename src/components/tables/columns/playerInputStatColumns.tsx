import { Input, Button, Select, SelectItem, Checkbox } from '@heroui/react'
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
      <Button onPress={() => deleteRow(rowIndex)}>Delete</Button>
    ),
  },
  {
    title: 'Year',
    key: 'year',
    render: (rowIndex: number) => (
      <Controller
        control={control}
        name={`${statCategory}.${rowIndex}.year`}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            className="w-[100px]"
            label="Year"
          />
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
        render={({ field, fieldState }) => (
          <Checkbox
            validationBehavior="aria"
            isInvalid={fieldState.invalid}
            defaultSelected={field.value}
            {...field}
          >
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
          render={({ field, fieldState }) => (
            <Select
              items={options}
              {...field}
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
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
        render={({ field, fieldState }) => (
          <TeamSelect
            classname="min-w-[250px]"
            value={field.value}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            onChange={field.onChange}
            teamOptions={[]}
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Rating"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Yards"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="TD"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="INT"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Long"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Sacks"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Comp"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Att"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Comp %"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="YPG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="YPA"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="GP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="DP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Car"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Yards"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="AVG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="TD"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="AVG G"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="BTK"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="Fumb"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="YAC"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="LONG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="20+"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="GP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="DP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="REC"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="YARDS"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="AVG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="AVG G"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="TD"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="RAC"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="RAC AVG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="LONG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="GP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="DP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="DROPS"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="SOLO"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="ASSISTS"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="TAK"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="TFL"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="SACK"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="INT"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="INT YDS"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="INT AVG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="INT LONG"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="DEFL"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="CTHA"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="FFUMB"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="FUMBREC"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="FUMBYDS"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="BLOCK"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="SFTY"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="TD"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="GP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
            className="w-[100px]"
            label="DP"
            validationBehavior="aria"
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          />
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
