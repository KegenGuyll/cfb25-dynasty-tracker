import Dexie, { Table } from 'dexie';

export interface TeamStats {
  offScheme: string;
  defScheme: string;
  offPlaybook: string;
  defPlaybook: string;
  teamId: number;
  year: number;
  totalGames: number;
  wins: number;
  losses: number;
  offense: Offense | null;
  defense: Defense | null;
  conversions: Conversions | null;
  redzone: Redzone | null;
  turnovers: Turnovers | null;
}

type Offense = {
  totalYards: number;
  passingYards: number;
  rushingYards: number;
  ppg: number;
  passingTds: number;
  rushingTds: number;
  '1stDowns': number;
}

type Defense = {
  totalYards: number;
  passingYards: number;
  rushingYards: number;
  pts: number;
  sacks: number;
  fumbleRec: number;
  interceptions: number;
}

type Conversions = {
  thirdDownConv: number;
  thirdDownAtt: number;
  thirdDownPct: number;
  fourthDownConv: number;
  fourthDownAtt: number;
  fourthDownPct: number;
  twoPointConv: number;
  twoPointAtt: number;
  twoPointPct: number;
}

type Redzone = {
  offense: {
    attempts: number;
    touchdowns: number;
    fieldGoals: number;
    pct: number
  }
  defense: {
    attempts: number;
    touchdowns: number;
    fieldGoals: number;
    pct: number;
  }
}

type Turnovers = {
  diff: number;
  giveaways: number;
  intsThrown: number;
  fumLost: number;
  takeaways: number;
  defInts: number;
  fumRec: number;
}

export class TeamStatsDB extends Dexie {
  teamStats!: Table<TeamStats>;
  constructor() {
    super('teamStats');
    this.version(1).stores({
      teamStats: '++id, teamId, year, totalGames, wins, losses, offScheme, defScheme, offPlaybook, defPlaybook'
    });
  }
}