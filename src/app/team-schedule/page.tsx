'use client'

import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { Game } from '@/db/types'
import { Button } from '@nextui-org/button'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'

const determineGameResult = (game: Game): string => {
  const didTeamWin =
    game.finalScore?.home &&
    game.finalScore?.away &&
    game.finalScore.home > game.finalScore.away

  if (game.finalScore?.home || game.finalScore?.away) {
    return ` ${didTeamWin ? 'W' : 'L'} ${game.finalScore?.home} - ${
      game.finalScore?.away
    }`
  }

  if (game.location === 'bye') return 'BYE'

  return 'TBD'
}

const determineTeamName = (game: Game): string => {
  if (game.location === 'home') {
    return `${game.homeTeam?.school}` || ''
  }

  if (game.location === 'bye') {
    return 'BYE WEEK'
  }

  return `${game.awayTeam?.school}` || ''
}

const TeamSchedulePage = () => {
  const allTeamSchedules = useLiveQuery(() => getTeamScheduleWithTeam())

  if (!allTeamSchedules?.length) {
    return (
      <div>
        <h1>No Team Schedules</h1>
        <Button as={Link} href="/team-schedule/create">
          Create
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Team Schedules</h1>
      {allTeamSchedules?.map((teamSchedule) => (
        <div key={teamSchedule.id}>
          <div className="flex flex-row items-center gap-4 mb-4">
            <div>
              <h1 className="font-semibold">Team Name</h1>
              <span className="font-light text-sm">
                {teamSchedule.team?.school} {teamSchedule.team?.nickname}
              </span>
            </div>
            <div className="flex-grow">
              <h1 className="font-semibold">Year</h1>
              <span className="font-light text-sm">{teamSchedule.year}</span>
            </div>
            <div className="flex gap-2">
              <Button>Update</Button>
              <Button color="danger">Remove</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableColumn>WEEK</TableColumn>
              <TableColumn>OPPONENT</TableColumn>
              <TableColumn>RESULT</TableColumn>
            </TableHeader>
            <TableBody>
              {teamSchedule.games.map((game) => (
                <TableRow key={game.week}>
                  <TableCell>{game.week - 1}</TableCell>
                  <TableCell>{determineTeamName(game)}</TableCell>
                  <TableCell>{determineGameResult(game)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <Button as={Link} href="/team-schedule/create">
        New Create Schedule
      </Button>
    </div>
  )
}

export default TeamSchedulePage
