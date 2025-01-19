import { Team } from "../types"

interface TeamInfo {
  id?: number
  dynastyId: number
  teamId: number
  year: number
  data?: Team
  conference: string
  teamOverall: number
  teamOffense: number
  teamDefense: number
  positionInConference: number
  teamWins: number
  teamLosses: number
  conferenceWins: number
  conferenceLosses: number
  headCoach?: string
  offensiveCoordinator?: string
  defensiveCoordinator?: string
  offPlaybook?: string
  defPlaybook?: string
  coachesPollRanking?: number
  apPollRanking?: number
  programPrestige?: number
}

export type {
  TeamInfo
}