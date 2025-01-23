'use client'

import { db } from '@/db/db.model'
import getTeamNationalChampionships from '@/queries/teamInfo/getTeamNationalChampionships'
import {
  determineGameResultWithScore,
  determineOpponent,
} from '@/utils/teamSchedule'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'

type DynastySidePanelProps = {
  dynastyId: string
  teamId: string
}

const DynastySidePanel: React.FC<DynastySidePanelProps> = ({
  dynastyId,
  teamId,
}: DynastySidePanelProps) => {
  const team = useLiveQuery(() => db.teams.get(Number(teamId)))

  const nationalChampionships = useLiveQuery(() =>
    getTeamNationalChampionships(dynastyId, teamId)
  )

  return (
    <div className="col-span-2 p-4 flex flex-col gap-12">
      <div>
        <h1 className="text-xl font-bold text-center">
          {team?.school} {team?.nickname}
        </h1>
      </div>
      <ul className="flex flex-col divide-y">
        <li className="flex flex-col gap-2">
          <div>
            <h2 className="text-lg font-semibold">National Championships</h2>
            <span>
              {nationalChampionships?.totalAppearances} appearances in{' '}
              {nationalChampionships?.numberOfSeasons} seasons
            </span>
          </div>
          <ul className="flex flex-col gap-2 pl-4 list-disc">
            {nationalChampionships?.wins.map((game) => (
              <li key={game.year}>
                <Link
                  href={`/dynasty/${dynastyId}/dashboard/${teamId}/${game.year}#${game.week}`}
                >
                  {determineGameResultWithScore(game)} VS{' '}
                  {game[determineOpponent(game)]?.school} ({game.year})
                </Link>
              </li>
            ))}
            {nationalChampionships?.losses.map((game) => (
              <li key={game.year}>
                <Link
                  href={`/dynasty/${dynastyId}/dashboard/${teamId}/${game.year}#${game.week}`}
                >
                  {determineGameResultWithScore(game)} VS{' '}
                  {game[determineOpponent(game)]?.school} ({game.year})
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default DynastySidePanel
