import { db } from "@/db/db.model"
import { Game } from "@/db/types"
import { TeamInfo } from "@/db/types/teamInfo"

type NationalChampionshipsGames = Game & { year: number } & { teamInfo?: TeamInfo }

type NationalChampionships = {
  wins: NationalChampionshipsGames[]
  losses: NationalChampionshipsGames[]
  totalAppearances: number
  numberOfSeasons: number
}

const getTeamNationalChampionships = async (dynastyId: string, teamId: string): Promise<NationalChampionships> => {
  const championships: NationalChampionships = { wins: [], losses: [], totalAppearances: 0, numberOfSeasons: 0 }

  const teamSeasons = await db.teamSchedule.where({ dynastyId: Number(dynastyId), teamId: Number(teamId) }).toArray();

  if (!teamSeasons) return championships

  await Promise.all(teamSeasons.map(async (teamSeason) => {
    const lastGame = teamSeason.games[teamSeason.games.length - 1]

    if (lastGame) {
      lastGame.awayTeam = await db.teams.get(lastGame.awayTeamId)
      lastGame.homeTeam = await db.teams.get(lastGame.homeTeamId)

      if (lastGame.result === 'W') {
        championships.wins.push({
          ...lastGame,
          year: teamSeason.year,
          teamInfo: await db.teamInfo.get({ teamId: Number(teamId), dynastyId: Number(dynastyId), year: teamSeason.year })
        })
      } else if (lastGame.result === 'L') {
        championships.losses.push({
          ...lastGame,
          year: teamSeason.year,
          teamInfo: await db.teamInfo.get({ teamId: Number(teamId), dynastyId: Number(dynastyId), year: teamSeason.year })
        })
      }
    }
  }))

  championships.totalAppearances =
    championships.wins.length + championships.losses.length
  championships.numberOfSeasons = teamSeasons.length

  return championships
}

export type {
  NationalChampionships,
  NationalChampionshipsGames,
}

export default getTeamNationalChampionships