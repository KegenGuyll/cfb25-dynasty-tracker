import { Game } from '@/db/types'
import { determineOpponent } from '@/utils/teamSchedule'
import { useState } from 'react'
import EditGame from '../../Player/EditGame'
import GameItem from './GameItem'
import EditStatLeaders from '@/components/Game/EditStatLeaders'

type GameListProps = {
  games: Game[]
  scheduleId: number
  dynastyId: string
  year: string
}

const GameList: React.FC<GameListProps> = ({
  games,
  scheduleId,
  dynastyId,
  year,
}: GameListProps) => {
  const [selectedGame, setSelectedGame] = useState<Game>()
  const [editStatLeaders, setEditStatLeaders] = useState(false)
  const [editGame, setEditGame] = useState(false)

  return (
    <div className="flex flex-col gap-12 divide-y">
      {games.map((game, index) => {
        const opponent = determineOpponent(game)
        return (
          <GameItem
            setEditGame={setEditGame}
            setEditStatLeaders={setEditStatLeaders}
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
        isOpen={editGame}
        handleClose={() => setEditGame(false)}
        scheduleId={scheduleId}
      />
      <EditStatLeaders
        scheduleId={scheduleId}
        dynastyId={dynastyId}
        year={year}
        game={selectedGame}
        isOpen={editStatLeaders}
        handleClose={() => setEditStatLeaders(false)}
      />
    </div>
  )
}

export default GameList
