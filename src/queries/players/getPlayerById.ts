import { db } from "@/db/db.model"

const getPlayerById = async (dynastyId: string, playerId: string) => {
  const result = await db.players.where({ dynastyId: Number(dynastyId), id: Number(playerId) }).first()

  if (!result) return null

  result.currentTeamData = await db.teams.where({ id: result.teamId }).first()

  if (result.stats.passing) {
    Promise.all(result.stats.passing.map(async (stat) => {
      stat.teamData = await db.teams.where({ id: stat.teamId }).first()
    }))
  }

  if (result.stats.rushing) {
    Promise.all(result.stats.rushing.map(async (stat) => {
      stat.teamData = await db.teams.where({ id: stat.teamId }).first()
    }))
  }

  if (result.stats.receiving) {
    Promise.all(result.stats.receiving.map(async (stat) => {
      stat.teamData = await db.teams.where({ id: stat.teamId }).first()
    }))
  }

  if (result.stats.defense) {
    Promise.all(result.stats.defense.map(async (stat) => {
      stat.teamData = await db.teams.where({ id: stat.teamId }).first()
    }))
  }

  return result;
}

export default getPlayerById