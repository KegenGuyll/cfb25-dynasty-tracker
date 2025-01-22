import { db } from "@/db/db.model"
import { Game } from "@/db/types"
import { TeamInfo } from "@/db/types/teamInfo"

type BowlGame = Game & { year: number } & { teamInfo?: TeamInfo }

type BowlGames = {
  wins: BowlGame[]
  losses: BowlGame[]
  totalAppearances: number
}

const getTeamBowlGames = async (dynastyId: string, teamId: string) => {
  const bowlGamesApp: BowlGames = { wins: [], losses: [], totalAppearances: 0 }

  const teamSeasons = await db.teamSchedule.where({ dynastyId: Number(dynastyId), teamId: Number(teamId) }).toArray();

  if (!teamSeasons) return bowlGamesApp

  await Promise.all(teamSeasons.map(async (teamSeason) => {

    const bowlGames = teamSeason.games.filter(game => game.week >= 16 && game.week <= 19);



    await Promise.all(bowlGames.map(async (bowlGame) => {
      if (bowlGame) {
        bowlGame.awayTeam = await db.teams.get(bowlGame.awayTeamId)
        bowlGame.homeTeam = await db.teams.get(bowlGame.homeTeamId)

        if (bowlGame.result === 'W') {
          bowlGamesApp.wins.push({
            ...bowlGame,
            year: teamSeason.year,
            teamInfo: await db.teamInfo.get({ teamId: Number(teamId), dynastyId: Number(dynastyId), year: teamSeason.year })
          })
        } else if (bowlGame.result === 'L') {
          bowlGamesApp.losses.push({
            ...bowlGame,
            year: teamSeason.year,
            teamInfo: await db.teamInfo.get({ teamId: Number(teamId), dynastyId: Number(dynastyId), year: teamSeason.year })
          })
        }
      }
    }))

  }))

  bowlGamesApp.totalAppearances =
    bowlGamesApp.wins.length + bowlGamesApp.losses.length

  return bowlGamesApp
}

export type {
  BowlGames,
  BowlGame,
}

export default getTeamBowlGames