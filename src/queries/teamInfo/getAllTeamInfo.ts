import { db } from "@/db/db.model"

const getAllTeamInfo = async (dynastyId: string, teamId: string) => {
  const result = db.teamInfo.where({ dynastyId: Number(dynastyId), teamId: Number(teamId) }).toArray()

  if (!result) return []

  return result
}

export default getAllTeamInfo