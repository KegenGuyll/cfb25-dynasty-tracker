import Dexie, { EntityTable } from 'dexie';
import { Awards, DraftResults, RecruitingClass, TeamSchedule, TeamStats } from './types';


const db = new Dexie('cfbDynastyTracker') as Dexie & {
  draftResults: EntityTable<DraftResults, 'id'>;
  teamStats: EntityTable<TeamStats, 'id'>;
  teamSchedule: EntityTable<TeamSchedule, 'id'>;
  recruitingClass: EntityTable<RecruitingClass, 'id'>;
  awards: EntityTable<Awards, 'id'>;
}

db.version(1).stores({
  draftResults: '++id,teamId, year',
  teamStats: '++id, teamId, year',
  teamSchedule: '++id, teamId, year',
  recruitingClass: '++id,teamId, year',
  awards: '++id,trophy,playerName,teamId, year'
});

export { db };