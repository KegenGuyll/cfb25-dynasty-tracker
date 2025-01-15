import { Team } from "../types"


type AvailableTeams = {
  teamId: number
  year: number
  data?: Team
}

interface Dynasty {
  id?: number
  name: string
  description: string
  availableTeams: AvailableTeams[]
}

export type {
  Dynasty,
  AvailableTeams,
}