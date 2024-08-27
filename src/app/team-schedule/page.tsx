'use client'

import { db } from "@/db/db.model";
import { Button } from "@nextui-org/button";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";

const TeamSchedulePage = () => {
  const allTeamSchedules = useLiveQuery(() => db.teamSchedule.toArray());


  console.log(allTeamSchedules);

  if(!allTeamSchedules?.length) {
    return (
      <div>
        <h1>No Team Schedules</h1>
        <Button as={Link} href='/team-schedule/create' >Create</Button>
      </div>
    )
  }

  return (
    <div>
      <h1>Team Schedule</h1>
      {allTeamSchedules?.map((teamSchedule) => (
        <div key={teamSchedule.id}>
          {teamSchedule.teamId} - {teamSchedule.year}
        </div>
      ))}
    </div>
  );
}

export default TeamSchedulePage;