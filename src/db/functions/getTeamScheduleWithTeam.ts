import { db } from "../db.model";

const getTeamScheduleWithTeam = async (teamId: number, year: number) => {
  const teamSchedule = await db.teamSchedule.get({ teamId, year })

  if (!teamSchedule) return null

  teamSchedule.team = await db.teams.get(teamId)

  await Promise.all(teamSchedule.games.map(async (game) => {
    game.awayTeam = await db.teams.get(game.awayTeamId),
      game.homeTeam = await db.teams.get(game.homeTeamId)
  }))

  return teamSchedule;
};

export default getTeamScheduleWithTeam;