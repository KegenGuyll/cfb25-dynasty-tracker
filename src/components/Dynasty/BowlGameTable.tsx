'use client'

import getTeamBowlGames, { BowlGame } from '@/queries/teamInfo/getTeamBowlGames'
import {
  determineOpponent,
  determineGameResultWithScore,
} from '@/utils/teamSchedule'
import Link from 'next/link'
import GenericDataTable, { TableColumn } from '../tables/GenericDataTable'
import { useLiveQuery } from 'dexie-react-hooks'
import formatHeaderId from '@/utils/formatHeaderId'

type BowlGameTableProps = {
  dynastyId: string
  teamId: string
}

const bowlGameColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<BowlGame>[] => [
  {
    title: 'Year',
    key: 'year',
    allowSort: true,
    render: (dataRow) => {
      const headerId = formatHeaderId(dataRow.customGameName || 'conf-champ')

      return (
        <Link
          href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}#${headerId}`}
        >
          {dataRow.year}
        </Link>
      )
    },
  },
  {
    allowSort: true,
    title: 'Bowl',
    key: 'customGameName',
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

const BowlGameTable: React.FC<BowlGameTableProps> = ({
  dynastyId,
  teamId,
}: BowlGameTableProps) => {
  const bowlGames = useLiveQuery(() => getTeamBowlGames(dynastyId, teamId))

  return (
    <GenericDataTable<BowlGame>
      columns={bowlGameColumns(dynastyId, teamId)}
      data={[...(bowlGames?.wins || []), ...(bowlGames?.losses || [])].map(
        (game) => ({
          ...game,
          sortKey: `${determineOpponent(game)}.school`,
        })
      )}
      defaultSortDescriptor={{
        column: 'year',
        direction: 'descending',
      }}
      keySelector={(_, i) => i}
    />
  )
}

export default BowlGameTable
