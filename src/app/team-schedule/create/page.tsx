'use client'

import TeamScheduleTable from "@/components/TeamScheduleTable";
import TeamSelect from "@/components/TeamSelect";
import { db } from "@/db/db.model";
import { GameLocation, TeamSchedule } from "@/db/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup"

const validationSchema = yup.object({
  teamId: yup.string().required(),
  year: yup.string().required(),
  games: yup.array().of(yup.object({
    location: yup.string().required(),
    opponent: yup.string().optional().nullable(),
    stadium: yup.string().optional().nullable()
  })).default([])
})

type CreateTeamScheduleFormData = yup.InferType<typeof validationSchema>;

type CreateTeamScheduleForm = {
  teamId: string;
  year: string;
  games: {
    week: number;
    location: string;
    opponent?: string | null;
    stadium?: string | null;
  }[]
}

const CreateTeamSchedulePage = () => { 
  const { control, handleSubmit, formState: {errors} } = useForm<CreateTeamScheduleForm>({ resolver: yupResolver<any>(validationSchema) });
  const router = useRouter();

  console.log(errors);

  const [numberOfWeeks, setNumberOfWeeks] = useState(1);

  const teams = useLiveQuery(() => db.teams.toArray());

  const teamOptions = useMemo(() => teams?.map((team) => ({
    value: String(team.teamId),
    label: `${team.school} ${team.nickname}`
  })) ,[teams])

  const formatGameLocation = (location: string): GameLocation => {
    switch(location) {
      case 'VS':
        return 'home';
      case 'AT':
        return 'away';
      case 'BYE':
        return 'bye'
      default:
        return 'neutral'
    }
  }

  const handleAddTeamSchedule = useCallback(async (data: CreateTeamScheduleFormData) => {
    const teamSchedule: TeamSchedule = {
      teamId: Number(data.teamId),
      year: Number(data.year),
      games: data.games.map((game, i) => ({
        awayTeamId: game.location === 'AT' ? Number(game.opponent) : Number(data.teamId),
        homeTeamId: game.location === 'VS' ? Number(game.opponent) : Number(data.teamId),
        week: i + 1,
        stadium: game.stadium || null,
        location: formatGameLocation(game.location),
        rivalryGame: false,
        broadcast: 'local',
        boxScore: null,
        stats: null,
        finalScore: null
      }))
    }
   
    await db.teamSchedule.add(teamSchedule)
    router.push('/team-schedule');
  }, [router]);


  return (
    <div>
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit(handleAddTeamSchedule)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 items-end w-full">
            <Controller
              control={control}
              name="teamId"
              render={({ field: { value, onChange }, formState: {errors} }) => (
                <div className="w-full">
                  <TeamSelect 
                    options={teamOptions || []}
                    label="Team"
                    placeholder="Select Team"
                    value={teamOptions?.find((option) => option.value === value)}
                    onChange={onChange}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="year"
              render={({ field: { value, onChange }, formState: {errors} }) => (
                <Input 
                  fullWidth
                  type="number"
                  label="Year" 
                  value={value} 
                  onChange={onChange}
                  placeholder="2024"
                  errorMessage={errors.year?.message}
                />
              )}
            />
            <Input
              placeholder="Number of Weeks"
              label="Number of Weeks"
              type="number"
              value={String(numberOfWeeks)}
              onChange={(e) => setNumberOfWeeks(Number(e.target.value))}
            />
          </div>
          <Button color='primary' type='submit' >Save Schedule</Button>
        </div>
        <TeamScheduleTable 
          control={control}
          numberOfWeeks={numberOfWeeks} 
          teamOptions={teamOptions || []}
        />
      </form>
    </div>
  );
}

export type {
  CreateTeamScheduleForm,
  CreateTeamScheduleFormData
}

export default CreateTeamSchedulePage;