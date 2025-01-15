import { Player } from '@/db/types/player'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nextui-org/react'
import GenericInputTable from '../tables/GenericInputTable'
import {
  defenseInputColumns,
  passingInputColumns,
  receivingInputColumns,
  rushingInputColumns,
} from '../tables/columns/playerInputStatColumns'
import EditModal from '../Modal/EditModal'
import { db } from '@/db/db.model'

type EditStatisticsProps = {
  player: Player
  isOpen: boolean
  handleClose: () => void
}

export const statisticsSchema = yup.object({
  passing: yup
    .array()
    .of(
      yup.object({
        year: yup.number().nullable(),
        class: yup.string().optional(),
        teamId: yup.number().nullable(),
        redshirt: yup.boolean().nullable(),
        gp: yup.number().nullable(),
        dp: yup.number().nullable(),
        rating: yup.number().nullable(),
        yards: yup.number().nullable(),
        td: yup.number().nullable(),
        int: yup.number().nullable(),
        long: yup.number().nullable(),
        sacks: yup.number().nullable(),
        comp: yup.number().nullable(),
        att: yup.number().nullable(),
        compPct: yup.number().nullable(),
        ypa: yup.number().nullable(),
        ypg: yup.number().nullable(),
      })
    )
    .optional(),
  rushing: yup
    .array()
    .of(
      yup.object({
        year: yup.number().nullable(),
        class: yup.string().optional(),
        teamId: yup.number().nullable(),
        redshirt: yup.boolean().nullable(),
        gp: yup.number().nullable(),
        dp: yup.number().nullable(),
        car: yup.number().nullable(),
        yards: yup.number().nullable(),
        avg: yup.number().nullable(),
        td: yup.number().nullable(),
        avgPerGame: yup.number().nullable(),
        btk: yup.number().nullable(),
        fumb: yup.number().nullable(),
        yac: yup.number().nullable(),
        long: yup.number().nullable(),
        '20+': yup.number().nullable(),
      })
    )
    .optional(),
  receiving: yup
    .array()
    .of(
      yup.object({
        year: yup.number().nullable(),
        class: yup.string().optional(),
        teamId: yup.number().nullable(),
        redshirt: yup.boolean().nullable(),
        gp: yup.number().nullable(),
        dp: yup.number().nullable(),
        rec: yup.number().nullable(),
        yards: yup.number().nullable(),
        avg: yup.number().nullable(),
        td: yup.number().nullable(),
        avgPerGame: yup.number().nullable(),
        rac: yup.number().nullable(),
        racAvg: yup.number().nullable(),
        long: yup.number().nullable(),
        drops: yup.number().nullable(),
      })
    )
    .optional(),
  defense: yup
    .array()
    .of(
      yup.object({
        year: yup.number().nullable(),
        class: yup.string().optional(),
        teamId: yup.number().nullable(),
        redshirt: yup.boolean().nullable(),
        gp: yup.number().nullable(),
        dp: yup.number().nullable(),
        solo: yup.number().nullable(),
        tfl: yup.number().nullable(),
        sack: yup.number().nullable(),
        int: yup.number().nullable(),
        assists: yup.number().nullable(),
        tak: yup.number().nullable(),
        intYds: yup.number().nullable(),
        intAvg: yup.number().nullable(),
        intLng: yup.number().nullable(),
        defl: yup.number().nullable(),
        ctha: yup.number().nullable(),
        ffumb: yup.number().nullable(),
        fumbRec: yup.number().nullable(),
        fumbYds: yup.number().nullable(),
        block: yup.number().nullable(),
        sfty: yup.number().nullable(),
        td: yup.number().nullable(),
      })
    )
    .optional(),
})

type StatisticsFormData = yup.InferType<typeof statisticsSchema>

const emptyPassingStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  rating: null,
  yards: null,
  td: null,
  int: null,
  long: null,
  sacks: null,
  comp: null,
  att: null,
  compPct: null,
  ypa: null,
  ypg: null,
}

const emptyRushingStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  car: null,
  yards: null,
  avg: null,
  td: null,
  avgPerGame: null,
  btk: null,
  fumb: null,
  yac: null,
  long: null,
  '20+': null,
}

const emptyReceivingStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  rec: null,
  yards: null,
  avg: null,
  td: null,
  avgPerGame: null,
  rac: null,
  racAvg: null,
  long: null,
  drops: null,
}

const emptyDefenseStat = {
  year: null,
  class: '',
  teamId: null,
  gp: null,
  dp: null,
  solo: null,
  tfl: null,
  sack: null,
  int: null,
  assists: null,
  tak: null,
  intYds: null,
  intAvg: null,
  intLng: null,
  defl: null,
  ctha: null,
  ffumb: null,
  fumbRec: null,
  fumbYds: null,
  block: null,
  sfty: null,
  td: null,
}

const EditStatistics: React.FC<EditStatisticsProps> = ({
  player,
  isOpen,
  handleClose,
}: EditStatisticsProps) => {
  const { control, handleSubmit, watch } = useForm<StatisticsFormData>({
    resolver: yupResolver(statisticsSchema),
    defaultValues: {
      passing: player.stats.passing,
      rushing: player.stats.rushing,
      receiving: player.stats.receiving,
      defense: player.stats.defense,
    },
  })

  const {
    fields: passingFields,
    append: passingAppend,
    remove: passingRemove,
  } = useFieldArray({
    control,
    name: 'passing',
  })
  const {
    fields: rushingFields,
    append: rushingAppend,
    remove: rushingRemove,
  } = useFieldArray({
    control,
    name: 'rushing',
  })
  const {
    fields: receivingFields,
    append: receivingAppend,
    remove: receivingRemove,
  } = useFieldArray({
    control,
    name: 'receiving',
  })
  const {
    fields: defenseFields,
    append: defenseAppend,
    remove: defenseRemove,
  } = useFieldArray({
    control,
    name: 'defense',
  })

  const onSubmit = async (data: StatisticsFormData) => {
    await db.players.update(player.id, {
      'stats.passing': data.passing,
      'stats.rushing': data.rushing,
      'stats.receiving': data.receiving,
      'stats.defense': data.defense,
    } as any)
    handleClose()
  }

  return (
    <EditModal
      isOpen={isOpen}
      handleClose={handleClose}
      formId="statistics-form"
      title="Statistics"
      size="full"
    >
      <form id="statistics-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-8 flex flex-col gap-8">
          <h2 className="text-2xl">Career Stats</h2>
          <div className="flex gap-4">
            <Button onPress={() => passingAppend(emptyPassingStat)}>
              Create Passing Table
            </Button>
            <Button onPress={() => rushingAppend(emptyRushingStat)}>
              Create Rushing Table
            </Button>
            <Button onPress={() => receivingAppend(emptyReceivingStat)}>
              Create Receiving Table
            </Button>
            <Button onPress={() => defenseAppend(emptyDefenseStat)}>
              Create Defense Table
            </Button>
          </div>
          {passingFields.length > 0 && (
            <GenericInputTable
              title="Passing"
              rowCount={passingFields.length}
              columns={passingInputColumns(
                control,
                (i) => passingRemove(i),
                watch
              )}
            />
          )}
          {rushingFields.length > 0 && (
            <GenericInputTable
              title="Rushing"
              rowCount={rushingFields.length}
              columns={rushingInputColumns(
                control,
                (i) => rushingRemove(i),
                watch
              )}
            />
          )}
          {receivingFields.length > 0 && (
            <GenericInputTable
              title="Receiving"
              rowCount={receivingFields.length}
              columns={receivingInputColumns(
                control,
                (i) => receivingRemove(i),
                watch
              )}
            />
          )}
          {defenseFields.length > 0 && (
            <GenericInputTable
              title="Defense"
              rowCount={defenseFields.length}
              columns={defenseInputColumns(
                control,
                (i) => defenseRemove(i),
                watch
              )}
            />
          )}
        </div>
      </form>
    </EditModal>
  )
}

export default EditStatistics
