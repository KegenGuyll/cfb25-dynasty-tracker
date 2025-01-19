import { db } from "@/db/db.model"
import { Player } from "@/db/types/player"

type MinPlayerDetails = {
  firstName: string
  lastName: string
  position: string
  teamId: number
  year: number
  dynastyId: number
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
      nickname: undefined,
      position: player.position,
      year: player.year,
      height: undefined,
      weight: undefined,
      hometown: undefined,
      tendency: '',
      hasRedshirt: undefined,
      number: undefined
    },
    development: {
      devTrait: undefined,
      mentalTraits: undefined,
      physicalTraits: undefined
    },
    awards: [],
    stats: {
      passing: undefined,
      rushing: undefined,
      receiving: undefined,
      defense: undefined,
    },
    recruit: undefined,
    historicalOverall: [],
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