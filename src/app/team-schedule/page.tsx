'use client'

import getTeamScheduleWithTeam from "@/db/functions/getTeamScheduleWithTeam";
import { Button } from "@nextui-org/button";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";

const TeamSchedulePage = () => {
  const allTeamSchedules = useLiveQuery(() => getTeamScheduleWithTeam());

  if(!allTeamSchedules?.length) {
    return (
      <div>
        <h1>No Team Schedules</h1>
        <Button as={Link} href='/team-schedule/create'>Create</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold" >Team Schedules</h1>
      {allTeamSchedules?.map((teamSchedule) => (
        <div key={teamSchedule.id}>
          {`${teamSchedule.team?.school} ${teamSchedule.team?.nickname}`} - {teamSchedule.year}
          {teamSchedule.games.length && (
            <div className="pl-8">
              <ul>
                {teamSchedule.games.map((game) => (
                  <li key={game.week}>
                    Week {game.week} / {game.location === 'home' ? 'VS' : 'AT'} / {game.location === 'away' ? game.awayTeam?.nickname : game.homeTeam?.nickname}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <Button as={Link} href='/team-schedule/create' >New Create Schedule</Button>
    </div>
  );
}

export default TeamSchedulePage;