import {
  DefenseStats,
  GeneralStats,
  PassingStats,
  ReceivingStats,
  RushingStats,
} from '@/db/types/player'
import { TableColumn } from '../GenericDataTable'
import Link from 'next/link'

const basicStatsColumns = (dynastyId: string): TableColumn<GeneralStats>[] => [
  {
    title: 'Season',
    key: 'year',
    allowSort: true,
    render: (data) => (
      <Link
        href={`/dynasty/${dynastyId}/dashboard/${data.teamId}/${data.year}#season`}
      >
        {data.year}
      </Link>
    ),
  },
  {
    title: 'Team',
    key: 'teamData.school',
  },
  {
    title: 'GP',
    key: 'gp',
    allowSort: true,
  },
]

const passingStatsColumns = (
  dynastyId: string
): TableColumn<PassingStats>[] => [
  ...basicStatsColumns(dynastyId),
  {
    title: 'Att',
    key: 'att',
    allowSort: true,
  },
  {
    title: 'Comp %',
    key: 'compPct',
    allowSort: true,
    render: (data) => `${data.compPct}%`,
  },
  {
    title: 'Yds',
    key: 'yards',
    allowSort: true,
  },

  {
    title: 'YPG',
    key: 'ypg',
    allowSort: true,
  },
  {
    title: 'TD',
    key: 'td',
    allowSort: true,
  },
  {
    title: 'Int',
    key: 'int',
    allowSort: true,
  },
  {
    title: 'Comp',
    key: 'comp',
    allowSort: true,
  },
  {
    title: 'Rating',
    key: 'rating',
    allowSort: true,
  },
  {
    title: 'YPA',
    key: 'ypa',
    allowSort: true,
  },
  {
    title: 'Sacks',
    key: 'sacks',
    allowSort: true,
  },
  {
    title: 'Long',
    key: 'long',
    allowSort: true,
  },
]

const rushingStatsColumns = (
  dynastyId: string
): TableColumn<RushingStats>[] => [
  ...basicStatsColumns(dynastyId),
  {
    title: 'Car',
    key: 'car',
    allowSort: true,
  },
  {
    title: 'Yds',
    key: 'yards',
    allowSort: true,
  },
  {
    title: 'Avg',
    key: 'avg',
    allowSort: true,
  },
  {
    title: 'TD',
    key: 'td',
    allowSort: true,
  },
  {
    title: 'Avg/G',
    key: 'avgPerGame',
    allowSort: true,
  },
  {
    title: 'BTK',
    key: 'btk',
    allowSort: true,
  },
  {
    title: 'Fumb',
    key: 'fumb',
    allowSort: true,
  },
  {
    title: 'YAC',
    key: 'yac',
    allowSort: true,
  },
  {
    title: 'Long',
    key: 'long',
    allowSort: true,
  },
  {
    title: '20+',
    key: '20+',
    allowSort: true,
  },
]

const receivingStatsColumns = (
  dynastyId: string
): TableColumn<ReceivingStats>[] => [
  ...basicStatsColumns(dynastyId),
  {
    title: 'Rec',
    key: 'rec',
    allowSort: true,
  },
  {
    title: 'Yds',
    key: 'yards',
    allowSort: true,
  },
  {
    title: 'Avg',
    key: 'avg',
    allowSort: true,
  },
  {
    title: 'TD',
    key: 'td',
    allowSort: true,
  },
  {
    title: 'Avg/G',
    key: 'avgPerGame',
    allowSort: true,
  },
  {
    title: 'RAC',
    key: 'rac',
    allowSort: true,
  },
  {
    title: 'RAC Avg',
    key: 'racAvg',
    allowSort: true,
  },
  {
    title: 'Long',
    key: 'long',
    allowSort: true,
  },
  {
    title: 'Drops',
    key: 'drops',
    allowSort: true,
  },
]

const defenseStatsColumns = (
  dynastyId: string
): TableColumn<DefenseStats>[] => [
  ...basicStatsColumns(dynastyId),
  {
    title: 'Tkl',
    key: 'tkl',
    allowSort: true,
  },
  {
    title: 'Solo',
    key: 'solo',
    allowSort: true,
  },
  {
    title: 'Ast',
    key: 'assists',
    allowSort: true,
  },
  {
    title: 'TFL',
    key: 'tfl',
    allowSort: true,
  },
  {
    title: 'Sacks',
    key: 'sack',
    allowSort: true,
  },
  {
    title: 'Int',
    key: 'int',
    allowSort: true,
  },
  {
    title: 'Defl',
    key: 'defl',
    allowSort: true,
  },
  {
    title: 'FF',
    key: 'ffumb',
    allowSort: true,
  },
  {
    title: 'FR',
    key: 'fumbRec',
    allowSort: true,
  },
  {
    title: 'Fumb Yds',
    key: 'fumbYds',
    allowSort: true,
  },
  {
    title: 'Safety',
    key: 'sfty',
    allowSort: true,
  },
  {
    title: 'TD',
    key: 'td',
    allowSort: true,
  },
  {
    title: 'Block',
    key: 'block',
    allowSort: true,
  },
  {
    title: 'Int Yds',
    key: 'intYds',
    allowSort: true,
  },
  {
    title: 'Int Avg',
    key: 'intAvg',
    allowSort: true,
  },
  {
    title: 'Int Long',
    key: 'intLng',
    allowSort: true,
  },
  {
    title: 'Ctha',
    key: 'ctha',
    allowSort: true,
  },
]

export {
  passingStatsColumns,
  rushingStatsColumns,
  receivingStatsColumns,
  defenseStatsColumns,
}
