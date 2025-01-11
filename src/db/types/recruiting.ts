import { Player } from "./player";

interface RecruitingClass {
  id?: number
  teamId: number;
  year: number;
  classRank: number;
  conferenceClassRank: number;
  recruits: number[];
  players: Player[];
  transfersPlayers: Player[];
  transfers: number[];
  notableLostRecruits: Recruit[];
  dynastyId: number;
  overview: Overview;
}

type Overview = {
  total: number
  '5star': number
  '4star': number
  '3star': number
  '2star': number
  '1star': number
  pts: number
}

type Recruit = {
  firstName: string;
  lastName: string;
  nickname?: string;
  position: string
  stars: number
  devTrait: string
  overall?: number
  nationalRank?: number
  gem: string
  playerId?: number
}

type Transfer = Recruit & {
  year: number
  from: number // teamId
}


export type {
  RecruitingClass
}