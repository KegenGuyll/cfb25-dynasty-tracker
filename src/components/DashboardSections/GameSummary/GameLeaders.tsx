import GenericDataTable, {
  TableColumn,
} from '@/components/tables/GenericDataTable'
import {
  Game,
  PassingStateLeaders,
  ReceivingStatLeaders,
  RushingStatLeaders,
} from '@/db/types'
import GameItemSection from './GameItemSection'
import Link from 'next/link'
import weekName from '@/utils/weekName'
import { Dispatch, SetStateAction } from 'react'

type GameLeadersProps = {
  game: Game
  setSelectedGame: (game: Game) => void
  setEditStatLeaders: Dispatch<SetStateAction<boolean>>
}

const commonStatColumns: TableColumn<any>[] = [
  {
    key: 'playerId',
    title: 'Player',
    render: (data) => (
      <Link
        href={`/dynasty/${data.player?.dynastyId}/player/${data.player?.id}`}
      >
        {data.player?.information.firstName} {data.player?.information.lastName}
      </Link>
    ),
  },
  {
    key: 'player.information.position',
    title: 'Pos',
    allowSort: true,
  },
  {
    key: 'teamId',
    title: 'Team',
    render: (data) => `${data.team?.school}`,
  },
]

const passingStatColumns: TableColumn<PassingStateLeaders>[] = [
  ...commonStatColumns,
  {
    key: 'attempts',
    title: 'Att',
    allowSort: true,
  },
  {
    key: 'completions',
    title: 'Comp',
    allowSort: true,
  },
  {
    key: 'yards',
    title: 'Yds',
    allowSort: true,
  },
  {
    key: 'tds',
    title: 'TD',
    allowSort: true,
  },
  {
    key: 'ints',
    title: 'INT',
    allowSort: true,
  },
]

const rushingStatColumns: TableColumn<RushingStatLeaders>[] = [
  ...commonStatColumns,
  {
    key: 'attempts',
    title: 'Car',
    allowSort: true,
  },
  {
    key: 'yards',
    title: 'Yds',
    allowSort: true,
  },
  {
    key: 'tds',
    title: 'TD',
    allowSort: true,
  },
]

const receivingStatColumns: TableColumn<ReceivingStatLeaders>[] = [
  ...commonStatColumns,
  {
    key: 'receptions',
    title: 'Rec',
    allowSort: true,
  },
  {
    key: 'yards',
    title: 'Yds',
    allowSort: true,
  },
  {
    key: 'tds',
    title: 'TD',
    allowSort: true,
  },
]

const GameLeaders: React.FC<GameLeadersProps> = ({
  game,
  setEditStatLeaders,
  setSelectedGame,
}: GameLeadersProps) => {
  return (
    <GameItemSection
      game={game}
      weekName={weekName(game.week)}
      setEditStatLeaders={setEditStatLeaders}
      setSelectedGame={setSelectedGame}
      title="Game Leaders"
    >
      <div className="flex flex-col gap-4">
        {game.statLeaders?.homeTeam.passing?.playerId &&
          game.statLeaders?.awayTeam.passing?.playerId && (
            <GenericDataTable<PassingStateLeaders>
              topContent={
                <div>
                  <h5 className="text-bold text-sm uppercase">Passing</h5>
                </div>
              }
              columns={passingStatColumns}
              data={[
                game.statLeaders.homeTeam.passing,
                game.statLeaders.awayTeam.passing,
              ]}
              keySelector={(data) => data.playerId}
            />
          )}
        {game.statLeaders?.homeTeam.rushing?.playerId &&
          game.statLeaders?.awayTeam.rushing?.playerId && (
            <GenericDataTable<RushingStatLeaders>
              topContent={
                <div>
                  <h5 className="text-bold text-sm uppercase">Rushing</h5>
                </div>
              }
              columns={rushingStatColumns}
              data={[
                game.statLeaders.homeTeam.rushing,
                game.statLeaders.awayTeam.rushing,
              ]}
              keySelector={(data) => data.playerId}
            />
          )}
        {game.statLeaders?.homeTeam.receiving?.playerId &&
          game.statLeaders?.awayTeam.receiving?.playerId && (
            <GenericDataTable<ReceivingStatLeaders>
              topContent={
                <div>
                  <h5 className="text-bold text-sm uppercase">Receiving</h5>
                </div>
              }
              columns={receivingStatColumns}
              data={[
                game.statLeaders.homeTeam.receiving,
                game.statLeaders.awayTeam.receiving,
              ]}
              keySelector={(data) => data.playerId}
            />
          )}
      </div>
    </GameItemSection>
  )
}

export default GameLeaders
