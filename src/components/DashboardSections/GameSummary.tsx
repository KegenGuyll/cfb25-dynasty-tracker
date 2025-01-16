'use client'

import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo, useState } from 'react'
import SectionWrapper from './SectionWrapper'
import {
  convertGameLocation,
  determineGameResultWithScore,
  determineOpponent,
} from '@/utils/teamSchedule'
import { Game } from '@/db/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import EditGame from '../Player/EditGame'
import GenericDataTable, { TableColumn } from '../tables/GenericDataTable'
import ScoreSummaryTable from '../tables/ScoreSummary'

type TeamScheduleProps = {
  teamId: number
  year: number
}

const weekName = (week: number): string => {
  if (week <= 14 || week === 16) return `Week ${week}`

  if (week === 15) return 'Conf Champ'

  if (week === 17) return 'Bowl 1'

  if (week === 18) return 'Bowl 2'

  if (week === 19) return 'Bowl 3'

  return "Nat'l Champ"
}

type GameListProps = {
  games: Game[]
  scheduleId: number
}

type GameItemProps = {
  game: Game
  scheduleId: number
  opponent: 'homeTeam' | 'awayTeam'
}

type ScoreSummary = {
  quarter: number
  home: number
  away: number
}

const scoreSummaryColumns: TableColumn<ScoreSummary>[] = [
  { key: 'quarter', title: 'Quarter' },
  { key: 'home', title: 'Home' },
  { key: 'away', title: 'Away' },
]

const GameItem: React.FC<GameItemProps> = ({
  game,
  opponent,
  scheduleId,
}: GameItemProps) => {
  const [hover, setHover] = useState(false)
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex items-baseline">
          <button
            className="text-left"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setEditMode(!editMode)}
          >
            <h3 className="text-xl">
              {weekName(game.week)} -{' '}
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
        <div className="flex flex-col gap-4">
          <h4>Score Summary</h4>
          <div className=" max-w-96">
            {game.scoreSummary && game.homeTeam && game.awayTeam && (
              <ScoreSummaryTable
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                scoreSummary={game.scoreSummary}
              />
            )}
          </div>
        </div>
        <div>
          <h4>Game Notes</h4>
          <p>Summary text about the player of the game and a stat line.</p>
        </div>
      </div>
      <EditGame
        game={game}
        isOpen={editMode}
        handleClose={() => setEditMode(false)}
        scheduleId={scheduleId}
      />
    </>
  )
}

const GameList: React.FC<GameListProps> = ({
  games,
  scheduleId,
}: GameListProps) => {
  return (
    <div className="flex flex-col gap-12 divide-y">
      {games?.map((game, index) => {
        const opponent = determineOpponent(game)

        if (game.location === 'bye')
          return (
            <div key={index} className="flex flex-col gap-4 pt-6">
              <div className="flex items-baseline  ">
                <h3 className="text-xl flex-grow">
                  {weekName(game.week)} -{' '}
                  <span className=" text-sm">
                    {convertGameLocation(game.location)}
                  </span>
                </h3>
              </div>
            </div>
          )

        return (
          <GameItem
            scheduleId={scheduleId}
            key={index}
            game={game}
            opponent={opponent}
          />
        )
      })}
    </div>
  )
}

const GameSummary: React.FC<TeamScheduleProps> = ({
  teamId,
  year,
}: TeamScheduleProps) => {
  const teamSchedule = useLiveQuery(() => getTeamScheduleWithTeam(teamId, year))

  const currentTeam = useMemo(
    () => (teamSchedule ? teamSchedule[0] : null),
    [teamSchedule]
  )

  if (!currentTeam) return null

  return (
    <SectionWrapper
      title="Game Summary"
      summary="The Razorbacks have a 11-1 record in the 2034 season."
      editable={false}
    >
      <GameList scheduleId={currentTeam.id || 0} games={currentTeam.games} />
    </SectionWrapper>
  )
}

export default GameSummary
