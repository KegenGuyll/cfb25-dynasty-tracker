'use client'

import getTeamNationalChampionships, {
  NationalChampionshipsGames,
} from '@/queries/teamInfo/getTeamNationalChampionships'
import {
  determineOpponent,
  determineGameResultWithScore,
} from '@/utils/teamSchedule'
import Link from 'next/link'
import GenericDataTable, { TableColumn } from '../tables/GenericDataTable'
import { useLiveQuery } from 'dexie-react-hooks'
import { SortDescriptor } from '@heroui/react'

const nationalChampionshipsColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<NationalChampionshipsGames>[] => [
  {
    title: 'Year',
    key: 'year',
    allowSort: true,
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  {
    allowSort: true,
    title: 'Coach',
    key: 'teamInfo.headCoach',
  },
  {
    allowSort: true,
    title: 'Off Playbook',
    key: 'teamInfo.offPlaybook',
  },
  {
    allowSort: true,
    title: 'Def Playbook',
    key: 'teamInfo.defPlaybook',
  },
  {
    allowSort: true,
    title: 'Record',
    key: 'record',
    render: (dataRow) =>
      `${dataRow.teamInfo?.teamWins}-${dataRow.teamInfo?.teamLosses}`,
  },
  {
    allowSort: false,
    title: 'Opponent',
    key: 'opponent',
    render: (dataRow) => dataRow[determineOpponent(dataRow)]?.school,
  },
  {
    allowSort: true,
    title: 'Result',
    key: 'result',
    render: (dataRow) => determineGameResultWithScore(dataRow),
  },
]

type NationalChampTableProps = {
  dynastyId: string
  teamId: string
}

const yearDefaultSortDescriptor: SortDescriptor = {
  column: 'year',
  direction: 'descending',
}

const NationalChampTable: React.FC<NationalChampTableProps> = ({
  dynastyId,
  teamId,
}: NationalChampTableProps) => {
  const nationalChampionships = useLiveQuery(() =>
    getTeamNationalChampionships(dynastyId, teamId)
  )

  return (
    <GenericDataTable<NationalChampionshipsGames>
      columns={nationalChampionshipsColumns(dynastyId, teamId)}
      data={[
        ...(nationalChampionships?.wins || []),
        ...(nationalChampionships?.losses || []),
      ]}
      defaultSortDescriptor={yearDefaultSortDescriptor}
      keySelector={(_, i) => i}
    />
  )
}

export default NationalChampTable
