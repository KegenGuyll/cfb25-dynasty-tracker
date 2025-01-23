'use client'

import getTeamConfChampionships, {
  ConfChampionshipGame,
} from '@/queries/teamInfo/getTeamConfChampoinships'
import {
  determineOpponent,
  determineGameResultWithScore,
} from '@/utils/teamSchedule'
import Link from 'next/link'
import GenericDataTable, { TableColumn } from '../tables/GenericDataTable'
import { useLiveQuery } from 'dexie-react-hooks'

type ConferenceChampTableProps = {
  dynastyId: string
  teamId: string
}

const confChampionshipsColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<ConfChampionshipGame>[] => [
  {
    allowSort: true,
    title: 'Year',
    key: 'year',
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  {
    allowSort: true,
    title: 'Conf',
    key: 'teamInfo.conference',
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
    title: 'Conf Record',
    key: 'record',
    render: (dataRow) =>
      `${dataRow.teamInfo?.conferenceWins}-${dataRow.teamInfo?.conferenceLosses}`,
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

const ConferenceChampTable: React.FC<ConferenceChampTableProps> = ({
  dynastyId,
  teamId,
}: ConferenceChampTableProps) => {
  const conferenceChampionships = useLiveQuery(() =>
    getTeamConfChampionships(dynastyId, teamId)
  )
  return (
    <GenericDataTable<ConfChampionshipGame>
      columns={confChampionshipsColumns(dynastyId, teamId)}
      data={[
        ...(conferenceChampionships?.wins || []),
        ...(conferenceChampionships?.losses || []),
      ]}
      defaultSortDescriptor={{
        column: 'year',
        direction: 'descending',
      }}
      keySelector={(_, i) => i}
    />
  )
}

export default ConferenceChampTable
