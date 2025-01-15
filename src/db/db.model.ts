import Dexie, { EntityTable, Transaction } from 'dexie';
import { AvailableAwards, Awards, DraftResults, Team, TeamSchedule, TeamStats } from './types';
import initialTeams from '../data/initialTeamData.json';
import initialAwards from '../data/initialAwardData.json';
import { RecruitingClass } from './types/recruiting';
import { Player } from './types/player';
import { Dynasty } from './types/dynasty';
import { TeamInfo } from './types/teamInfo';
import { Media } from './types/media';


const db = new Dexie('cfbDynastyTracker') as Dexie & {
  draftResults: EntityTable<DraftResults, 'id'>;
  teamStats: EntityTable<TeamStats, 'id'>;
  teamSchedule: EntityTable<TeamSchedule, 'id'>;
  recruitingClass: EntityTable<RecruitingClass, 'id'>;
  players: EntityTable<Player, 'id'>;
  awards: EntityTable<Awards, 'id'>;
  availableAwards: EntityTable<AvailableAwards, 'id'>;
  teams: EntityTable<Team, 'id'>;
  dynasties: EntityTable<Dynasty, 'id'>;
  teamInfo: EntityTable<TeamInfo, 'id'>;
  media: EntityTable<Media, 'id'>;
}

db.version(1).stores({
  draftResults: '++id,teamId,year,dynastyId',
  teamStats: '++id,teamId,year,dynastyId',
  teamSchedule: '++id,teamId,year,dynastyId',
  recruitingClass: '++id,teamId,year,dynastyId',
  awards: '++id,trophy,playerName,teamId,year,dynastyId',
  teams: '++id,teamId',
  availableAwards: '++id,name,awardId',
  players: '++id,teamId,dynastyId',
  dynasties: '++id',
  teamInfo: '++id,teamId,dynastyId,year',
  media: '++id'
});

db.on('populate', async (tx: Transaction) => {
  await tx.table('teams').bulkAdd(initialTeams)
  await tx.table('availableAwards').bulkAdd(initialAwards)
})

export { db };