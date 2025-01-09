'use client'

import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

import SectionWrapper from './SectionWrapper'
import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { determineGameResultWithScore } from '@/utils/teamSchedule'
import { Game } from '@/db/types'

type TeamScheduleProps = {
  teamId: number
  year: number
}

const determineTeamName = (game: Game): string => {
  if (game.location === 'away') {
    return `${game.homeTeam?.school}` || ''
  }

  if (game.location === 'bye') {
    return 'BYE WEEK'
  }

  return `${game.awayTeam?.school}` || ''
}

const TeamSchedule: React.FC<TeamScheduleProps> = ({
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
      title="Team Schedule"
      summary="The Razorbacks have a 11-1 record in the 2034 season."
    >
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableColumn>WEEK</TableColumn>
            <TableColumn>OPPONENT</TableColumn>
            <TableColumn>RESULT</TableColumn>
          </TableHeader>
          <TableBody>
            {currentTeam?.games.map((game) => (
              <TableRow key={game.week}>
                <TableCell>{game.week}</TableCell>
                <TableCell>{determineTeamName(game)}</TableCell>
                <TableCell>{determineGameResultWithScore(game)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionWrapper>
  )
}

export default TeamSchedule
