import { db } from "@/db/db.model";

const getTeamInfo = async (dynastyId: number, teamId: number, year: number) => {
  const teamInfo = await db.teamInfo.where({ dynastyId, teamId, year }).toArray();

  await Promise.all(teamInfo.map(async (team) => {
    [team.data] = await Promise.all([
      db.teams.get(team.teamId)
    ])
  }))

  return teamInfo[0];
}

export default getTeamInfo;