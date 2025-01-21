'use client'

import getTeamInfo from '@/queries/teamInfo/getTeamInfo'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { Button, Spinner } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import EditTeamOverview from '../Team/EditTeamOverview'
import getNextAndPrevSeason from '@/queries/dynasty/getNextAndPrevSeason'
import Link from 'next/link'

type TeamOverviewProps = {
  dynastyId: string
  teamId: string
  year: string
}

const TeamOverview: React.FC<TeamOverviewProps> = ({
  dynastyId,
  teamId,
  year,
}: TeamOverviewProps) => {
  const [edit, setEdit] = useState(false)
  const [hover, setHover] = useState(false)
  const teamInfo = useLiveQuery(() =>
    getTeamInfo(Number(dynastyId), Number(teamId), Number(year))
  )
  const nextAndPrevSeason = useLiveQuery(() =>
    getNextAndPrevSeason(Number(year), Number(teamId), Number(dynastyId))
  )

  console.log(nextAndPrevSeason)

  if (!teamInfo)
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner />
      </div>
    )

  return (
    <>
      <div className="flex flex-col gap-16 bg-content1 p-2 rounded">
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onPress={() => setEdit(true)}
          aria-label="edit-team-info"
          variant="ghost"
        >
          <h3 className="text-center text-lg font-bold">{`${year} ${teamInfo?.data?.school} ${teamInfo?.data?.nickname}`}</h3>
          {hover && <FontAwesomeIcon icon={faPen} />}
        </Button>

        <ul className="w-full flex flex-col gap-4">
          <li className="flex justify-between">
            <span className="font-bold">Program Prestige</span>
            <span>{'⭐'.repeat(Number(teamInfo.programPrestige))}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Conference</span>
            <span>{teamInfo?.conference}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">AP Poll Ranking</span>
            <span>{teamInfo.apPollRanking}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Coaches Poll Ranking</span>
            <span>{teamInfo.coachesPollRanking}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Record</span>
            <div className="flex gap-2">
              <span>
                {teamInfo?.teamWins} - {teamInfo.teamLosses}
              </span>
              <span>
                ({teamInfo.conferenceWins} - {teamInfo.conferenceLosses})
              </span>
            </div>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Head Coach</span>
            <span>{teamInfo.headCoach}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Off Coordinator</span>
            <span>{teamInfo.offensiveCoordinator}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Def Coordinator</span>
            <span>{teamInfo.defensiveCoordinator}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Off Playbook</span>
            <span>{teamInfo.offPlaybook}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">Def Playbook</span>
            <span>{teamInfo.defPlaybook}</span>
          </li>
        </ul>
        <div className="flex justify-between">
          {nextAndPrevSeason?.prevSeasonTeam ? (
            <Link
              href={`/dynasty/${dynastyId}/dashboard/${teamId}/${nextAndPrevSeason.prevSeasonTeam.year}`}
              passHref
            >
              ← {nextAndPrevSeason.prevSeasonTeam.year}
            </Link>
          ) : (
            <span>No Previous Season</span>
          )}
          <div>Seasons</div>
          {nextAndPrevSeason?.nextSeasonTeam ? (
            <Link
              href={`/dynasty/${dynastyId}/dashboard/${teamId}/${nextAndPrevSeason.nextSeasonTeam.year}`}
              passHref
            >
              {nextAndPrevSeason.nextSeasonTeam.year} →
            </Link>
          ) : (
            <span>No Next Season</span>
          )}
        </div>
      </div>
      <EditTeamOverview
        dynastyId={dynastyId}
        teamId={teamId}
        year={year}
        isOpen={edit}
        handleClose={() => setEdit(false)}
        teamInfo={teamInfo}
      />
    </>
  )
}

export default TeamOverview
