'use client'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'

import SectionWrapper from './SectionWrapper'
import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { useLiveQuery } from 'dexie-react-hooks'
import { determineGameResultWithScore } from '@/utils/teamSchedule'
import { Game } from '@/db/types'
import { useRouter } from 'next/navigation'
import getTeamInfo from '@/queries/teamInfo/getTeamInfo'

type TeamScheduleProps = {
  teamId: number
  year: number
  dynastyId: number | string
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
  dynastyId,
}: TeamScheduleProps) => {
  const router = useRouter()
  const teamSchedule = useLiveQuery(() => getTeamScheduleWithTeam(teamId, year))
  const teamInfo = useLiveQuery(() =>
    getTeamInfo(Number(dynastyId), Number(teamId), Number(year))
  )

  const createSummary = (): string => {
    if (!teamSchedule)
      return 'No team schedule found. Get started by creating a team schedule.'

    const wins = teamSchedule.games.filter((game) => game.result === 'W').length
    const losses = teamSchedule.games.filter(
      (game) => game.result === 'L'
    ).length

    return `The ${teamSchedule.team?.school} has a ${wins}-${losses} record in the ${year} season.`
  }

  return (
    <SectionWrapper title="Team Schedule" summary={createSummary()}>
      {!teamSchedule ? (
        <div>
          <Button
            onPress={() =>
              router.push(
                `/team-schedule/create?dynastyId=${dynastyId}&teamInfoId=${teamInfo?.id}&year=${year}&teamId=${teamId}`
              )
            }
            color="primary"
          >
            Create Team Schedule
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableColumn>WEEK</TableColumn>
              <TableColumn>OPPONENT</TableColumn>
              <TableColumn>RESULT</TableColumn>
            </TableHeader>
            <TableBody>
              {teamSchedule?.games.map((game) => (
                <TableRow key={game.week}>
                  <TableCell>{game.week}</TableCell>
                  <TableCell>{determineTeamName(game)}</TableCell>
                  <TableCell>{determineGameResultWithScore(game)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </SectionWrapper>
  )
}

export default TeamSchedule
