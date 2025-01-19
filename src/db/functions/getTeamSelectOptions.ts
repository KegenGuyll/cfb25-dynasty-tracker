import { OptionType } from "@/components/SearchableSelect";
import { db } from "../db.model";

const getTeamSelectOptions = async (): Promise<OptionType[]> => {
  const teams = await db.teams.toArray();

  if (!teams) return []

  return teams.map((team) => ({
    value: String(team.teamId),
    label: `${team.school} ${team.nickname}`,
  }));
}

export default getTeamSelectOptions;