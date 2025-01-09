'use client'

import { db } from '@/db/db.model'
import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import getAllTeamSeason from '@/queries/dynasty/getAllTeamSeason'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'

type TeamPageProps = {
  params: {
    dynastyId: string
    teamId: string
  }
}

const TeamPage: React.FC<TeamPageProps> = ({ params }: TeamPageProps) => {
  const { dynastyId, teamId } = params
  const team = useLiveQuery(() => db.teams.get(Number(teamId)))
  const teamSeasons = useLiveQuery(() =>
    getAllTeamSeason(Number(dynastyId), Number(teamId))
  )

  return (
    <div>
      {!team && <p>Loading...</p>}
      {teamSeasons && (
        <div className="bg-content1 p-2 rounded flex flex-col gap-6">
          <h1>
            {team?.school} {team?.nickname} Season Index
          </h1>
          <ul>
            {teamSeasons?.map((season) => (
              <li key={season.year}>
                <Link
                  href={`/dynasty/${dynastyId}/dashboard/${teamId}/${season.year}`}
                >
                  {season.year}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TeamPage
