import { db } from "../db.model";

const getTeamSelectOptions = async () => {
  const teams = await db.teams.toArray();

  return teams.map((team) => ({
    value: String(team.teamId),
    label: `${team.school} ${team.nickname}`,
  }));
}

export default getTeamSelectOptions;