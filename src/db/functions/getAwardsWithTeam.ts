import { db } from "../db.model";

const getAwardsWithTeam = async () => {
  const awards = await db.awards.toArray();

  await Promise.all(awards.map(async (award) => {
    [award.team, award.trophyName] = await Promise.all([
      db.teams.get(award.teamId),
      db.availableAwards.get(award.awardId).then((award) => award?.name)
    ])
  }))

  return awards
}

export default getAwardsWithTeam;