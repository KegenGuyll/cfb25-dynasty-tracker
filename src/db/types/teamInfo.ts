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
}

export type {
  TeamInfo
}