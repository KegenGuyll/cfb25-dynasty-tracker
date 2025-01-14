'use client'

import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import SectionWrapper from './SectionWrapper'
import {
  convertGameLocation,
  determineGameResultWithScore,
  determineOpponent,
} from '@/utils/teamSchedule'

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

const GameSummary: React.FC<TeamScheduleProps> = ({
  teamId,
  year,
}: TeamScheduleProps) => {
  const teamSchedule = useLiveQuery(() => getTeamScheduleWithTeam(teamId, year))

  const currentTeam = useMemo(
    () => (teamSchedule ? teamSchedule[0] : null),
    [teamSchedule]
  )

  console.log(currentTeam)

  if (!currentTeam) return null

  return (
    <SectionWrapper
      title="Game Summary"
      summary="The Razorbacks have a 11-1 record in the 2034 season."
      editable={false}
    >
      <div className="flex flex-col gap-12 divide-y">
        {currentTeam.games?.map((game, index) => {
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
            <div key={index} className="flex flex-col gap-6 pt-6">
              <div className="flex items-baseline  ">
                <h3 className="text-xl flex-grow">
                  {weekName(game.week)} -{' '}
                  <span className=" text-sm">
                    {convertGameLocation(game.location)}
                  </span>{' '}
                  {game[opponent]?.school} {game[opponent]?.nickname}
                </h3>
                <span className="bg-content1 p-2 rounded">
                  {determineGameResultWithScore(game)}
                </span>
              </div>
              <div>
                <h4>POTG</h4>
                <p>
                  Summary text about the player of the game and a stat line.
                </p>
              </div>
              <div>
                <h4>Score Summary</h4>
                <p>
                  Summary text about the player of the game and a stat line.
                </p>
              </div>
              <div>
                <h4>Game Notes</h4>
                <p>
                  Summary text about the player of the game and a stat line.
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

export default GameSummary
