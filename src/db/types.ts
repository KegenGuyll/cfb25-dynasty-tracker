type AwardName =
  'Player of the Year' |
  'Head Coach of the Year' |
  'Best QB' |
  'Best Defensive Player' |
  'Best DB' |
  'Best RB' |
  'Best WR' |
  'Lomardi' |
  'Johnny Unitas Golden Arm' |
  'Best DE' |
  'Best Interior Lineman' |
  'Best TE' |
  'Broyles' |
  'Best Linebacker' |
  'Best Center' |
  'Lou Gorza' |
  'Best Punter' |
  'Best Returner' |
  'Heisman'

interface Awards {
  id?: number;
  awardId: number;
  playerFirstName: string;
  playerLastName: string;
  teamId: number;
  year: number;
  team?: Team;
  trophyName?: string;
  dynastyId: number;
}

interface AvailableAwards {
  id?: number;
  name: AwardName;
  awardId: number;
}

interface DraftResults {
  id: number;
  teamId: number;
  year: number;
  dynastyId: number;
  firstRound: number;
  secondRound: number;
  thirdRound: number;
  fourthRound: number;
  fifthRound: number;
  sixthRound: number;
  seventhRound: number;
}

interface TeamSchedule {
  id?: number;
  teamId: number;
  year: number;
  games: Game[];
  team?: Team;
  dynastyId: number;
}

type GameLocation = 'home' | 'away' | 'neutral' | 'bye';

type GameBroadcast = 'national' | 'local' | 'streaming'

type ScoreSummary = {
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
  "final": {
    home: number;
    away: number;
  }
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
  customGameName?: string
  week: number;
  homeTeamId: number;
  awayTeamId: number;
  awayTeam?: Team;
  homeTeam?: Team;
  finalScore: {
    home: number;
    away: number;
  } | null;
  rivalryGame: boolean;
  stadium: string | null;
  location: GameLocation;
  broadcast: GameBroadcast;
  scoreSummary: ScoreSummary | null;
  stats: GameStats | null;
  result: string | null;
}

interface TeamStats {
  id?: number;
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
  dynastyId: number;
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

interface Team {
  id?: number;
  teamId: number;
  school: string;
  nickname: string;
  state: string;
  conference: string;
  primaryColor: string;
  secondaryColor: string;
}

export type {
  Awards,
  AwardName,
  AvailableAwards,
  DraftResults,
  TeamSchedule,
  Game,
  GameLocation,
  GameBroadcast,
  ScoreSummary,
  GameStats,
  TeamStats,
  Offense,
  Defense,
  Conversions,
  Redzone,
  Turnovers,
  Team
}