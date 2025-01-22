import { db } from "@/db/db.model"
import { Game } from "@/db/types"
import { TeamInfo } from "@/db/types/teamInfo"

type ConfChampionshipGame = Game & { year: number } & { teamInfo?: TeamInfo }

type ConferenceChampionships = {
  wins: ConfChampionshipGame[]
  losses: ConfChampionshipGame[]
  totalAppearances: number
}

const getTeamConfChampionships = async (dynastyId: string, teamId: string) => {
  const championships: ConferenceChampionships = { wins: [], losses: [], totalAppearances: 0 }

  const teamSeasons = await db.teamSchedule.where({ dynastyId: Number(dynastyId), teamId: Number(teamId) }).toArray();

  if (!teamSeasons) return championships

  await Promise.all(teamSeasons.map(async (teamSeason) => {
    const conferenceChampionship = teamSeason.games.find(game => game.week === 15);

    if (conferenceChampionship) {
      conferenceChampionship.awayTeam = await db.teams.get(conferenceChampionship.awayTeamId)
      conferenceChampionship.homeTeam = await db.teams.get(conferenceChampionship.homeTeamId)

      if (conferenceChampionship.result === 'W') {
        championships.wins.push({
          ...conferenceChampionship,
          year: teamSeason.year,
          teamInfo: await db.teamInfo.get({ teamId: Number(teamId), dynastyId: Number(dynastyId), year: teamSeason.year })
        })
      } else if (conferenceChampionship.result === 'L') {
        championships.losses.push({
          ...conferenceChampionship,
          year: teamSeason.year,
          teamInfo: await db.teamInfo.get({ teamId: Number(teamId), dynastyId: Number(dynastyId), year: teamSeason.year })
        })
      }
    }
  }))

  championships.totalAppearances =
    championships.wins.length + championships.losses.length

  return championships

}

export type {
  ConferenceChampionships,
  ConfChampionshipGame,
}

export default getTeamConfChampionships