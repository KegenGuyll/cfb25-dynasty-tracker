import Dexie, { Table } from 'dexie';

export interface RecruitingClass {
  id: number
  teamId: number;
  year: number;
  pts: number;
  classRank: number;
  '1Stars': number;
  '2Stars': number;
  '3Stars': number;
  '4Stars': number;
  '5Stars': number;
}

export class RecruitingClassDB extends Dexie {
  recruitingClass!: Table<RecruitingClass>;
  constructor() {
    super('recruitingClass');
    this.version(1).stores({
      recruitingClass: '++id,teamId, year, pts, classRank, 1Stars, 2Stars, 3Stars, 4Stars, 5Stars'
    });
  }
}