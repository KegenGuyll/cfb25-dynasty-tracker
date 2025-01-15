import { AvailableTeams } from "@/db/types/dynasty"
import getDynastyById from "./getDynastyById"
import { TeamSchedule, TeamStats } from "@/db/types"
import { RecruitingClass } from "@/db/types/recruiting"
import { TeamInfo } from "@/db/types/teamInfo"
import { db } from "@/db/db.model"

type AvailableTeamsWithStats = AvailableTeams & {
  teamSchedule?: TeamSchedule
  teamStats?: TeamStats
  teamInfo?: TeamInfo
  recruitingClass?: RecruitingClass
}

const getAllTeamSeason = async (dynastyId: number, teamId: number) => {
  const dynasties = await getDynastyById(dynastyId)

  if (!dynasties) return null

  const teamSeasons = dynasties.availableTeams.filter((team) => team.teamId === teamId)

  const teamWithStats: AvailableTeamsWithStats[] = teamSeasons.map((team) => {
    return {
      ...team,
      teamSchedule: undefined,
      teamStats: undefined,
      teamInfo: undefined,
      recruitingClass: undefined,
    }
  })

  await Promise.all(teamWithStats.map(async (team) => {
    const searchQuery = { teamId: team.teamId, dynastyId: dynastyId, year: team.year }

    team.teamSchedule = await db.teamSchedule.get(searchQuery)
    team.teamStats = await db.teamStats.get(searchQuery)
    team.teamInfo = await db.teamInfo.get(searchQuery)
    team.recruitingClass = await db.recruitingClass.get(searchQuery)
  }))

  return teamWithStats
}

export type { AvailableTeamsWithStats }

export default getAllTeamSeason