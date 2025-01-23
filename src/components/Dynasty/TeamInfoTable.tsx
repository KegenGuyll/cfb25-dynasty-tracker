'use client'

import { TeamInfo } from '@/db/types/teamInfo'
import Link from 'next/link'
import GenericDataTable, { TableColumn } from '../tables/GenericDataTable'
import { useLiveQuery } from 'dexie-react-hooks'
import getAllTeamInfo from '@/queries/teamInfo/getAllTeamInfo'

type TeamInfoTableProps = {
  dynastyId: string
  teamId: string
}

const teamInfoColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<TeamInfo>[] => [
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
  { allowSort: true, key: 'teamOverall', title: 'Overall' },
  { allowSort: true, key: 'teamOffense', title: 'Offense' },
  { allowSort: true, key: 'teamDefense', title: 'Defense' },
  { allowSort: true, key: 'teamWins', title: 'Wins' },
  { allowSort: true, key: 'teamLosses', title: 'Losses' },
  { allowSort: true, key: 'positionInConference', title: 'Conf Rank' },
  { allowSort: true, key: 'conferenceWins', title: 'Conf Wins' },
  { allowSort: true, key: 'conferenceLosses', title: 'Conf Losses' },
]

const TeamInfoTable: React.FC<TeamInfoTableProps> = ({
  dynastyId,
  teamId,
}: TeamInfoTableProps) => {
  const teamInfo = useLiveQuery(() => getAllTeamInfo(dynastyId, teamId))

  if (!teamInfo) return null

  return (
    <GenericDataTable<TeamInfo>
      data={teamInfo}
      columns={teamInfoColumns(dynastyId, teamId)}
      keySelector={(dataRow) => dataRow?.id?.toString() || ''}
      defaultSortDescriptor={{
        column: 'year',
        direction: 'descending',
      }}
    />
  )
}

export default TeamInfoTable
