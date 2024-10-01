import { db } from "../db.model";

const getTeamScheduleWithTeam = async () => {
  const teamSchedules = await db.teamSchedule.toArray();

  await Promise.all(teamSchedules.map(async (teamSchedule) => {
      [teamSchedule.team] = await Promise.all([
        db.teams.get(teamSchedule.teamId)
      ])
  }))

  await Promise.all(teamSchedules.map(async (teamSchedule) => {
    teamSchedule.games.map(async (game) => {
      [game.awayTeam, game.homeTeam] = await Promise.all([
        db.teams.get(game.awayTeamId),
        db.teams.get(game.homeTeamId)
      ])
    })
  }))

  return teamSchedules;
};

export default getTeamScheduleWithTeam;