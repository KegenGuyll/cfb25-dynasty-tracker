'use client'

import { db } from "@/db/db.model";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

const CreateTeamSchedulePage = () => { 
  const [teamId, setTeamId] = useState<string>('1');
  const [year, setYear] = useState<string>('2024');
  const router = useRouter();

  const handleAddTeamSchedule = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await db.teamSchedule.add({
      teamId: Number(teamId),
      year: Number(year),
      games: []
    })
    router.push('/team-schedule');
  }, [router, teamId, year]);


  return (
    <div>
      <h1>Create Team Schedule</h1>

      <form className="gap-4 flex flex-col" onSubmit={handleAddTeamSchedule}>
        <Input 
          type="number"
          label="Team Id" 
          value={teamId} 
          onChange={(e) => setTeamId(e.target.value)}
        />
        <Input 
          type="number"
          label="Year" 
          value={year} 
          onChange={(e) => setYear(e.target.value)}
        />
        <Button type='submit' >Save</Button>
      </form>
    </div>
  );
}

export default CreateTeamSchedulePage;