import Dexie, { Table } from 'dexie';

export interface TeamSchedule {
  id: number;
  teamId: number;
  year: number;
  games: Game[];
}

type GameSite = 'home' | 'away' | 'neutral';

type GameBroadcast = 'national' | 'local' | 'streaming'

type BoxScore = {
  "1": {
    home: number;
    away: number;
  },
  "2": {
    home: number;
    away: number;
  },
  "3": {
    home: number;
    away: number;
  },
  "4": {
    home: number;
    away: number;
  },
}

type GameStats = {
  score: {
    home: number;
    away: number;
  }
  firstDowns: {
    home: number;
    away: number;
  }
  totalOffense: {
    home: number;
    away: number;
  }
  rushing: {
    home: {
      yards: number;
      tds: number;
    }
    away: {
      yards: number;
      tds: number;
    }
  }
  yardsPerRush: {
    home: number;
    away: number;
  }
  passing: {
    home: {
      comp: number;
      att: number;
      ypp: number;
      yards: number;
      tds: number;
    }
    away: {
      comp: number;
      att: number;
      ypp: number;
      yards: number;
      tds: number;
    }
  }
  conversions: {
    home: {
      '3rdCov': number;
      '4thCov': number;
      '2ptCov': number;
      redzone: {
        td: number;
        fgPct: number;
      }
    }
    away: {
      '3rdCov': number;
      '4thCov': number;
      '2ptCov': number;
      redzone: {
        td: number;
        fgPct: number;
      }
    }
  }
  defense: {
    home: {
      turnovers: number;
      fumbleLost: number;
      ints: number;
    }
    away: {
      turnovers: number;
      fumbleLost: number;
      ints: number;
    }
  }
  specialTeams: {
    home: {
      prYards: number;
      krYards: number;
    }
    away: {
      prYards: number;
      krYards: number;
    }
  }
  penalties: {
    home: number;
    away: number;
  }
  timeOfPossession: {
    home: number;
    away: number;
  }
}

type Game = {
  homeTeamId: number;
  awayTeamId: number;
  finalScore: {
    home: number;
    away: number;
  }
  rivalryGame: boolean;
  site: GameSite;
  broadcast: GameBroadcast;
  boxScore: BoxScore;
  stats: GameStats | null;
}

export class TeamScheduleDB extends Dexie {
  teamSchedule!: Table<TeamSchedule>;
  constructor() {
    super('teamSchedule');
    this.version(1).stores({
      teamSchedule: '++id, teamId, year, games'
    });
  }
}

export const teamScheduleDB = new TeamScheduleDB();