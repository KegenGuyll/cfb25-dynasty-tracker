import { db } from "@/db/db.model"

const getRecruitingData = async (dynastyId: string, teamId: string, year: string) => {
  const result = await db.recruitingClass.where(
    {
      dynastyId: Number(dynastyId),
      teamId: Number(teamId),
      year: Number(year)
    }).first()

  if (!result) return null

  await Promise.all(result.recruits.map(async (id) => {
    const player = await db.players.get(id);
    if (player) {
      result.players.push(player);
    }
  }))

  await Promise.all(result.transfers.map(async (id) => {
    const player = await db.players.get(id);
    if (player) {
      result.transfersPlayers.push(player);
    }

    result.transfersPlayers.map((player) => {
      if (player.recruit.transfers) {
        player.recruit.transfers.map(async (transfer) => {
          const team = await db.teams.get(transfer.teamId);

          if (team) {
            transfer.teamData = team;
          }
        })
      }

    })
  }))

  return result
}

export default getRecruitingData