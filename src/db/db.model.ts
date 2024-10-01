import Dexie, { EntityTable, Transaction } from 'dexie';
import { Awards, DraftResults, RecruitingClass, Team, TeamSchedule, TeamStats } from './types';
import initialTeams from '../data/initialTeamData.json';


const db = new Dexie('cfbDynastyTracker') as Dexie & {
  draftResults: EntityTable<DraftResults, 'id'>;
  teamStats: EntityTable<TeamStats, 'id'>;
  teamSchedule: EntityTable<TeamSchedule, 'id'>;
  recruitingClass: EntityTable<RecruitingClass, 'id'>;
  awards: EntityTable<Awards, 'id'>;
  teams: EntityTable<Team, 'id'>;
}

db.version(1).stores({
  draftResults: '++id,teamId, year',
  teamStats: '++id, teamId, year',
  teamSchedule: '++id, teamId, year',
  recruitingClass: '++id,teamId, year',
  awards: '++id,trophy,playerName,teamId, year',
  teams: '++id,teamId'
});

db.on('populate', async (tx: Transaction) => {
  console.log('Populating database with initial data')
  await tx.table('teams').bulkAdd(initialTeams)
})

export { db };