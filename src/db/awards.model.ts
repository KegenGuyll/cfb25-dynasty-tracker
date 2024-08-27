import Dexie, { Table } from 'dexie';

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

export interface Awards {
  trophy: AwardName;
  playerName: string;
  teamId: number;
  year: number;
}

export class AwardsDB extends Dexie {
  awards!: Table<Awards>;
  constructor() {
    super('awards');
    this.version(1).stores({
      awards: '++id,trophy,playerName,teamId, year'
    });
  }
}