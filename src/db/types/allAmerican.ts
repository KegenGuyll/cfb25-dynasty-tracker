import { Position } from "./player"

const TeamSelectionOptions = [
  {
    label: '1st Team',
    value: '1st Team',
  },
  {
    label: '2nd Team',
    value: '2nd Team',
  },
  {
    label: 'Freshman',
    value: 'Freshman',
  },
  {
    label: 'Preseason 1st Team',
    value: 'Preseason 1st Team',
  },
  {
    label: 'Preseason 2nd Team',
    value: 'Preseason 2nd Team',
  }
]

type TeamSelection = '1st Team' | '2nd Team' | 'Freshman' | 'Preseason 1st Team' | 'Preseason 2nd Team'

interface AllAmerican {
  id?: number
  dynastyId: number
  playerId: number
  teamId: number
  year: number
  position: Position
  name: string
  playerClass: string // FR, SO, JR, SR etc.
  selection: TeamSelection
  conference: string
}

export { TeamSelectionOptions }

export type { AllAmerican, TeamSelection }