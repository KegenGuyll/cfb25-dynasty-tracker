import { db } from "@/db/db.model"

const searchPlayers = async () => {
  const allPlayers = await db.players.toArray()

  return allPlayers
}

export default searchPlayers