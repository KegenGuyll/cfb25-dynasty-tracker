import { Position } from "./player"

const teamSelectionOptions = [
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

const allAmericanConfOptions = [
  {
    label: 'National',
    value: 'National'
  },
  {
    label: 'ACC',
    value: 'ACC'
  },
  {
    label: 'American',
    value: 'American'
  },
  {
    label: 'Big 12',
    value: 'Big 12',
  },
  {
    label: 'Big Ten',
    value: 'Big Ten'
  },
  {
    label: 'CUSA',
    value: 'CUSA'
  },
  {
    label: 'FBS Independents',
    value: 'FBS Independents'
  },
  {
    label: 'MAC',
    value: 'MAC'
  },
  {
    label: 'MWC',
    value: 'MWC'
  },
  {
    label: 'PAC-12',
    value: 'PAC-12'
  },
  {
    label: 'SEC',
    value: 'SEC'
  },
  {
    label: 'Sun Belt',
    value: 'Sun Belt'
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
  playerClass?: string // FR, SO, JR, SR etc.
  selection: TeamSelection
  conference: string
}

export { teamSelectionOptions, allAmericanConfOptions }

export type { AllAmerican, TeamSelection }