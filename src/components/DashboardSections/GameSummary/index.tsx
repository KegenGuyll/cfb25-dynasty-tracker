'use client'

import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { useLiveQuery } from 'dexie-react-hooks'
import SectionWrapper from '../SectionWrapper'
import GameList from './GameList'

type TeamScheduleProps = {
  teamId: number
  year: number
}

const GameSummary: React.FC<TeamScheduleProps> = ({
  teamId,
  year,
}: TeamScheduleProps) => {
  const teamSchedule = useLiveQuery(() => getTeamScheduleWithTeam(teamId, year))

  if (!teamSchedule) return null

  return (
    <SectionWrapper
      title="Game Summary"
      summary="The Razorbacks have a 11-1 record in the 2034 season."
      editable={false}
    >
      <GameList scheduleId={teamSchedule.id || 0} games={teamSchedule.games} />
    </SectionWrapper>
  )
}

export default GameSummary
