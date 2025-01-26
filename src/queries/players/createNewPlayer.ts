import { db } from "@/db/db.model"
import { HistoricalOverall, Player, PlayerDevelopment, PlayerInformation, PlayerStats, Recruit } from "@/db/types/player"

type MinPlayerDetails = {
  firstName: string
  lastName: string
  position: string
  teamId: number
  year: number
  dynastyId: number
  recruit?: Recruit
  historicalOverall?: HistoricalOverall[]
  stats?: PlayerStats
  information?: PlayerInformation
  development?: PlayerDevelopment
}



async function createNewPlayer(players: MinPlayerDetails[], returnPlayers?: false): Promise<number[]>;
async function createNewPlayer(players: MinPlayerDetails[], returnPlayers?: true): Promise<Player[]>;
async function createNewPlayer(players: MinPlayerDetails[], returnPlayers?: boolean): Promise<Player[] | number[]> {
  const formattedPlayers: Player[] = players.map((player) => ({
    teamId: player.teamId,
    dynastyId: player.dynastyId,
    information: {
      firstName: player.firstName,
      lastName: player.lastName,
      nickname: player.information?.nickname || undefined,
      position: player.position,
      year: player.year,
      height: player.information?.height || undefined,
      weight: player.information?.weight || undefined,
      hometown: player.information?.hometown || undefined,
      tendency: player.information?.tendency || '',
      hasRedshirt: player.information?.hasRedshirt || false,
      number: player.information?.number || undefined,
    },
    development: {
      devTrait: player.development?.devTrait || undefined,
      mentalTraits: player.development?.mentalTraits || undefined,
      physicalTraits: player.development?.physicalTraits || undefined,
    },
    awards: [],
    stats: {
      passing: player.stats?.passing || undefined,
      rushing: player.stats?.rushing || undefined,
      receiving: player.stats?.receiving || undefined,
      defense: player.stats?.defense || undefined,
    },
    recruit: player.recruit,
    historicalOverall: player.historicalOverall || [],
    mediaAttachments: [],
    currentTeamData: undefined,
  }))


  const playerIds = await db.players.bulkAdd(formattedPlayers, undefined, { allKeys: true }) as number[] | undefined

  if (playerIds) {
    if (returnPlayers) {
      const newPlayers = await db.players.bulkGet(playerIds)

      // filter out any undefined
      return newPlayers.filter((player) => player !== undefined) as Player[]
    }
    return playerIds
  }

  return []
}

export default createNewPlayer

export type {
  MinPlayerDetails
}