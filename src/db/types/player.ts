import { Awards } from "../types"

type Position =
  'QB' |
  'RB' |
  'FB' |
  'WR' |
  'TE' |
  'LT' |
  'LG' |
  'C' |
  'RG' |
  'RT' |
  'RE' |
  'DT' |
  'LE' |
  'ROLB' |
  'MLB' |
  'LOLB' |
  'CB' |
  'FS' |
  'SS' |
  'K' |
  'P' |
  'ATH'

type PlayerDevTrait = 'Normal' | 'Impact' | 'Star' | 'Elite'

type TraitTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

type historicalOverall = {
  year: number
  overall: number
}

type PlayerMentalTrait = {
  name: string
  tier: TraitTier
}

type GeneralStats = {
  year: number;
  class: string
  teamId: number;
  gp: number;
  dp: number;
}

type PassingStats = GeneralStats & {
  rating: number
  yards: number
  td: number
  int: number
  long: number
  sacks: number
  comp: number
  att: number
  compPct: number
  ypa: number
  ypg: number
}

type RushingStats = GeneralStats & {
  car: number
  yards: number
  avg: number
  td: number
  avgPerGame: number
  btk: number
  fumb: number
  yac: number
  long: number
  '20+': number
}

type ReceivingStats = GeneralStats & {
  rec: number
  yards: number
  avg: number
  td: number
  avgPerGame: number
  rac: number
  racAvg: number
  long: number
  drops: number
}

type DefenseStats = GeneralStats & {
  solo: number
  assists: number
  tak: number
  tfl: number
  sack: number
  int: number
  intYds: number
  intAvg: number
  intLng: number
  defl: number
  ctha: number
  ffumb: number
  fumbRec: number
  fumbYds: number
  block: number
  sfty: number
  td: number
}

type PlayerInformation = {
  position: Position[]
  name: string;
  height: string; // inches
  weight: number; // lbs
  hometown: string;
  tendency: string;
}

type PlayerDevelopment = {
  devTrait: PlayerDevTrait;
  mentalTraits: PlayerMentalTrait[];
  physicalTraits: PlayerMentalTrait[];
}

interface Player {
  id?: number;
  teamId: number;
  information: PlayerInformation;
  development: PlayerDevelopment;
  awards: number[];
  stats: {
    passing: PassingStats[];
    rushing: RushingStats[];
    receiving: ReceivingStats[];
    defense: DefenseStats[];
  }
  historicalOverall: historicalOverall[]
}


export type {
  Player,
  Position,
  PlayerDevTrait,
  TraitTier,
  PlayerMentalTrait,
  GeneralStats,
  PassingStats,
  RushingStats,
  ReceivingStats,
  DefenseStats,
  PlayerInformation,
  PlayerDevelopment,
  historicalOverall
}