import {
  DefenseStats,
  GeneralStats,
  PassingStats,
  ReceivingStats,
  RushingStats,
} from '@/db/types/player'
import { TableColumn } from '../GenericDataTable'

const basicStatsColumns: TableColumn<GeneralStats>[] = [
  {
    title: 'Season',
    key: 'year',
  },
  {
    title: 'Team',
    key: 'teamData.school',
  },
  {
    title: 'GP',
    key: 'gp',
  },
]

const passingStatsColumns: TableColumn<PassingStats>[] = [
  ...basicStatsColumns,
  {
    title: 'Att',
    key: 'att',
  },
  {
    title: 'Comp %',
    key: 'compPct',
    render: (data) => `${data.compPct}%`,
  },
  {
    title: 'Yds',
    key: 'yards',
  },

  {
    title: 'YPG',
    key: 'ypg',
  },
  {
    title: 'TD',
    key: 'td',
  },
  {
    title: 'Int',
    key: 'int',
  },
  {
    title: 'Comp',
    key: 'comp',
  },
  {
    title: 'Rating',
    key: 'rating',
  },
  {
    title: 'YPA',
    key: 'ypa',
  },
  {
    title: 'Sacks',
    key: 'sacks',
  },
  {
    title: 'Long',
    key: 'long',
  },
]

const rushingStatsColumns: TableColumn<RushingStats>[] = [
  ...basicStatsColumns,
  {
    title: 'Car',
    key: 'car',
  },
  {
    title: 'Yds',
    key: 'yards',
  },
  {
    title: 'Avg',
    key: 'avg',
  },
  {
    title: 'TD',
    key: 'td',
  },
  {
    title: 'Avg/G',
    key: 'avgPerGame',
  },
  {
    title: 'BTK',
    key: 'btk',
  },
  {
    title: 'Fumb',
    key: 'fumb',
  },
  {
    title: 'YAC',
    key: 'yac',
  },
  {
    title: 'Long',
    key: 'long',
  },
  {
    title: '20+',
    key: '20+',
  },
]

const receivingStatsColumns: TableColumn<ReceivingStats>[] = [
  ...basicStatsColumns,
  {
    title: 'Rec',
    key: 'rec',
  },
  {
    title: 'Yds',
    key: 'yards',
  },
  {
    title: 'Avg',
    key: 'avg',
  },
  {
    title: 'TD',
    key: 'td',
  },
  {
    title: 'Avg/G',
    key: 'avgPerGame',
  },
  {
    title: 'RAC',
    key: 'rac',
  },
  {
    title: 'RAC Avg',
    key: 'racAvg',
  },
  {
    title: 'Long',
    key: 'long',
  },
  {
    title: 'Drops',
    key: 'drops',
  },
]

const defenseStatsColumns: TableColumn<DefenseStats>[] = [
  ...basicStatsColumns,
  {
    title: 'Tkl',
    key: 'tkl',
  },
  {
    title: 'Solo',
    key: 'solo',
  },
  {
    title: 'Ast',
    key: 'assists',
  },
  {
    title: 'TFL',
    key: 'tfl',
  },
  {
    title: 'Sacks',
    key: 'sack',
  },
  {
    title: 'Int',
    key: 'int',
  },
  {
    title: 'Defl',
    key: 'defl',
  },
  {
    title: 'FF',
    key: 'ffumb',
  },
  {
    title: 'FR',
    key: 'fumbRec',
  },
  {
    title: 'Fumb Yds',
    key: 'fumbYds',
  },
  {
    title: 'Safety',
    key: 'sfty',
  },
  {
    title: 'TD',
    key: 'td',
  },
  {
    title: 'Block',
    key: 'block',
  },
  {
    title: 'Int Yds',
    key: 'intYds',
  },
  {
    title: 'Int Avg',
    key: 'intAvg',
  },
  {
    title: 'Int Long',
    key: 'intLng',
  },
  {
    title: 'Ctha',
    key: 'ctha',
  },
]

export {
  passingStatsColumns,
  rushingStatsColumns,
  receivingStatsColumns,
  defenseStatsColumns,
}
