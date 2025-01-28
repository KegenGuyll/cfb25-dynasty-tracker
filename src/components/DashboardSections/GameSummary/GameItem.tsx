import { Game } from '@/db/types'
import {
  convertGameLocation,
  determineGameResultWithScore,
} from '@/utils/teamSchedule'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'
import ScoreSummaryTable from '../../tables/ScoreSummary'
import weekName from '@/utils/weekName'
import GameItemSection from './GameItemSection'
import GameLeaders from './GameLeaders'

type GameItemProps = {
  game: Game
  scheduleId: number
  opponent: 'homeTeam' | 'awayTeam'
  setSelectedGame: (game: Game) => void
  setEditStatLeaders: Dispatch<SetStateAction<boolean>>
  setEditGame: Dispatch<SetStateAction<boolean>>
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
          <div className="max-w-96">
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
        <GameLeaders
          game={game}
          setEditStatLeaders={setEditStatLeaders}
          setSelectedGame={setSelectedGame}
        />
        <div>
          <h4>Game Notes</h4>
          <p>Summary text about the player of the game and a stat line.</p>
        </div>
      </div>
    </>
  )
}

export default GameItem
