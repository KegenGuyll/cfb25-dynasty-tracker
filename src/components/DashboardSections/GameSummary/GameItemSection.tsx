import { Game } from '@/db/types'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'

type GameItemSectionProps = {
  game?: Game
  title: string
  children: React.ReactNode
  setSelectedGame?: (game: Game) => void
  setEditStatLeaders?: Dispatch<SetStateAction<boolean>>
  weekName?: string
}

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

export default GameItemSection
