'use client'

import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmation'
import { teamScheduleUpdateUrl } from '@/constants/urls'
import { db } from '@/db/db.model'
import getTeamScheduleWithTeam from '@/db/functions/getTeamScheduleWithTeam'
import { Game } from '@/db/types'
import { determineGameResultWithScore } from '@/utils/teamSchedule'
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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const determineTeamName = (game: Game): string => {
  if (game.location === 'away') {
    return `${game.homeTeam?.school}` || ''
  }

  if (game.location === 'bye') {
    return 'BYE WEEK'
  }

  return `${game.awayTeam?.school}` || ''
}

const TeamSchedulePage = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<{
    id: number
    teamName: string
  } | null>(null)
  const allTeamSchedules = useLiveQuery(() => getTeamScheduleWithTeam())
  const router = useRouter()

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
              <Button
                onClick={() => {
                  if (!teamSchedule.id) return
                  router.push(teamScheduleUpdateUrl(teamSchedule.id))
                }}
              >
                Update
              </Button>
              <Button
                onClick={() =>
                  setDeleteModalOpen({
                    id: teamSchedule.id || -1,
                    teamName: `${teamSchedule.team?.school} ${teamSchedule.team?.nickname}`,
                  })
                }
                color="danger"
              >
                Delete
              </Button>
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
                  <TableCell>{game.week}</TableCell>
                  <TableCell>{determineTeamName(game)}</TableCell>
                  <TableCell>{determineGameResultWithScore(game)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <Button as={Link} href="/team-schedule/create">
        New Create Schedule
      </Button>
      <DeleteConfirmationModal
        context={`${deleteModalOpen?.teamName} schedule`}
        isOpen={!!deleteModalOpen}
        deleteAction={() => {
          setDeleteModalOpen(null)
          if (deleteModalOpen?.id) {
            db.teamSchedule.delete(deleteModalOpen.id)
          }
        }}
      />
    </div>
  )
}

export default TeamSchedulePage
