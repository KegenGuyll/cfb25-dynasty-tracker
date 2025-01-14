import { db } from "@/db/db.model"

const getPlayerById = async (dynastyId: string, playerId: string) => {
  const result = await db.players.where({ dynastyId: Number(dynastyId), id: Number(playerId) }).first()

  if (!result) return null

  result.currentTeamData = await db.teams.where({ id: result.teamId }).first()

  return result;
}

export default getPlayerById