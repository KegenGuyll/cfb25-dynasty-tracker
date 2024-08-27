import Dexie, { Table } from 'dexie';

export interface DraftResults {
  id: number;
  teamId: number;
  year: number;
  firstRound: number;
  secondRound: number;
  thirdRound: number;
  fourthRound: number;
  fifthRound: number;
  sixthRound: number;
  seventhRound: number;
}

export class DraftResultsDB extends Dexie {
  draftResults!: Table<DraftResults>;
  constructor() {
    super('draftResults');
    this.version(1).stores({
      draftResults: '++id,teamId, year, firstRound, secondRound, thirdRound, fourthRound, fifthRound, sixthRound, seventhRound'
    });
  }
}