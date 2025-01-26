import { db } from "../db.model";
import { StatLeadersStats } from "../types";

const getTeamScheduleWithTeam = async (teamId: number, year: number) => {
  const teamSchedule = await db.teamSchedule.get({ teamId, year })

  if (!teamSchedule) return null

  teamSchedule.team = await db.teams.get(teamId)

  await Promise.all(teamSchedule.games.map(async (game) => {
    if (game.statLeaders?.homeTeam) {
      for (const statCategory of Object.keys(game.statLeaders.homeTeam) as (keyof StatLeadersStats)[]) {
        const homeStats = game.statLeaders?.homeTeam[statCategory];
        if (homeStats) {
          if (homeStats.playerId) {
            homeStats.player = await db.players.get(homeStats.playerId);
          }
          if (homeStats.teamId) {
            homeStats.team = await db.teams.get(homeStats.teamId);
          }
        }
      }
    }

    if (game.statLeaders?.awayTeam) {
      for (const statCategory of Object.keys(game.statLeaders.awayTeam) as (keyof StatLeadersStats)[]) {
        const awayStats = game.statLeaders?.awayTeam[statCategory];
        if (awayStats) {
          if (awayStats.playerId) {
            awayStats.player = await db.players.get(awayStats.playerId);
          }
          if (awayStats.teamId) {
            awayStats.team = await db.teams.get(awayStats.teamId);
          }
        }
      }
    }

    game.awayTeam = await db.teams.get(game.awayTeamId)
    game.homeTeam = await db.teams.get(game.homeTeamId)
  }))

  return teamSchedule;
};

export default getTeamScheduleWithTeam;