import getTeamInfo from '@/queries/teamInfo/getTeamInfo'
import { useLiveQuery } from 'dexie-react-hooks'
import SectionWrapper from './SectionWrapper'

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
  const teamInfo = useLiveQuery(() =>
    getTeamInfo(Number(dynastyId), Number(teamId), Number(year))
  )

  return (
    <SectionWrapper
      title={`${teamInfo?.data?.school} ${teamInfo?.data?.nickname} ${year}`}
      summary=""
    >
      <div>
        <div className="flex gap-1">
          <span>Record:</span>
          <span>
            {teamInfo?.teamWins}-{teamInfo?.teamLosses}
          </span>
          <span>|</span>
          <span>
            {teamInfo?.positionInConference} in {teamInfo?.conference}
          </span>
        </div>
        <div className="flex gap-1">
          <span>Ovr:</span>
          <span>{teamInfo?.teamOverall} TEAM</span>
          <span>|</span>
          <span>{teamInfo?.teamOffense} OFF</span>
          <span>|</span>
          <span>{teamInfo?.teamDefense} DEF</span>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default TeamOverview
