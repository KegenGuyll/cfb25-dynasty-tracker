import {
  Game,
  PassingStateLeaders,
  ReceivingStatLeaders,
  RushingStatLeaders,
} from '@/db/types'
import {
  convertGameLocation,
  determineGameResultWithScore,
} from '@/utils/teamSchedule'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'
import ScoreSummaryTable from '../../tables/ScoreSummary'
import GenericDataTable, {
  TableColumn,
} from '@/components/tables/GenericDataTable'
import Link from 'next/link'

type GameItemProps = {
  game: Game
  scheduleId: number
  opponent: 'homeTeam' | 'awayTeam'
  setSelectedGame: (game: Game) => void
  setEditStatLeaders: Dispatch<SetStateAction<boolean>>
  setEditGame: Dispatch<SetStateAction<boolean>>
}

const weekName = (week: number): string => {
  if (week <= 14 || week === 16) return `Week ${week}`

  if (week === 15) return 'Conf Champ'

  if (week === 17) return 'Bowl 1'

  if (week === 18) return 'Bowl 2'

  if (week === 19) return 'Bowl 3'

  return "Nat'l Champ"
}

type GameItemSectionProps = {
  game?: Game
  title: string
  children: React.ReactNode
  setSelectedGame?: (game: Game) => void
  setEditStatLeaders?: Dispatch<SetStateAction<boolean>>
  weekName?: string
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

const GameItemSection: React.FC<GameItemSectionProps> = ({
  title,
  children,
  setEditStatLeaders,
  setSelectedGame,
  weekName,
  game,
}: GameItemSectionProps) => {
  const [hover, setHover] = useState(false)

  const clickable = setEditStatLeaders && setSelectedGame && game

  const handleOnClick = () => {
    if (!setEditStatLeaders || !setSelectedGame || !game) return

    setEditStatLeaders(true)
    setSelectedGame(game)
  }

  return (
    <div className="flex flex-col gap-4">
      {clickable && (
        <button
          className="text-left "
          aria-labelledby={`edit stat leaders for ${weekName}`}
          onClick={handleOnClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <h4 className="font-bold text-lg">
            {title}{' '}
            {hover && (
              <span className="pl-4">
                <FontAwesomeIcon icon={faPen} />
              </span>
            )}
          </h4>
        </button>
      )}
      {!clickable && <h4 className="font-bold text-lg">{title}</h4>}
      <div>{children}</div>
    </div>
  )
}

const GameItem: React.FC<GameItemProps> = ({
  game,
  opponent,
  setSelectedGame,
  setEditStatLeaders,
  setEditGame,
}: GameItemProps) => {
  const [hover, setHover] = useState(false)

  const formatHeaderId =
    game.customGameName?.toLowerCase().replace(' ', '-') ||
    weekName(game.week).toLowerCase().replace(' ', '-')

  return (
    <>
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex items-baseline">
          <button
            className="text-left scroll-smooth"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
              setEditGame(true)
              setSelectedGame(game)
            }}
          >
            <h3 id={formatHeaderId} className="text-xl">
              {game.customGameName || weekName(game.week)} -{' '}
              <span className=" text-sm">
                {convertGameLocation(game.location)}
              </span>{' '}
              {game[opponent]?.school} {game[opponent]?.nickname}
              {hover && (
                <span className="pl-4">
                  <FontAwesomeIcon icon={faPen} />
                </span>
              )}
            </h3>
          </button>
          <div className="flex-grow" />
          <span className="bg-content1 p-2 rounded">
            {determineGameResultWithScore(game)}
          </span>
        </div>
        <div>
          <h4>POTG</h4>
          <p>Summary text about the player of the game and a stat line.</p>
        </div>
        <GameItemSection title="Score Summary">
          <div className=" max-w-96">
            {game.scoreSummary && game.homeTeam && game.awayTeam && (
              <ScoreSummaryTable
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                scoreSummary={game.scoreSummary}
                overtime={game.overtime}
              />
            )}
          </div>
        </GameItemSection>
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
                      <p className="text-tiny font-light">
                        Summary text about the passing stats and a stat line.
                      </p>
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
                      <p className="text-tiny font-light">
                        Summary text about the passing stats and a stat line.
                      </p>
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
                      <p className="text-tiny font-light">
                        Summary text about the passing stats and a stat line.
                      </p>
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
        <div>
          <h4>Game Notes</h4>
          <p>Summary text about the player of the game and a stat line.</p>
        </div>
      </div>
    </>
  )
}

export default GameItem
