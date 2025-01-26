import { Game } from '@/db/types'
import { determineOpponent } from '@/utils/teamSchedule'
import { useState } from 'react'
import EditGame from '../../Player/EditGame'
import GameItem from './GameItem'

type GameListProps = {
  games: Game[]
  scheduleId: number
}

const GameList: React.FC<GameListProps> = ({
  games,
  scheduleId,
}: GameListProps) => {
  const [selectedGame, setSelectedGame] = useState<Game>()
  return (
    <div className="flex flex-col gap-12 divide-y">
      {games.map((game, index) => {
        const opponent = determineOpponent(game)
        return (
          <GameItem
            scheduleId={scheduleId}
            key={index}
            game={game}
            opponent={opponent}
            setSelectedGame={setSelectedGame}
          />
        )
      })}
      <EditGame
        game={selectedGame}
        isOpen={!!selectedGame}
        handleClose={() => setSelectedGame(undefined)}
        scheduleId={scheduleId}
      />
    </div>
  )
}

export default GameList
