import { OptionType } from "@/components/SearchableSelect"
import { db } from "@/db/db.model"



const getPlayerOptions = async (dynastyId: string) => {
  const query = await db.players.where({
    dynastyId: Number(dynastyId),
  }).toArray()


  const formattedPlayerOptions: OptionType[] = query.map((player) => ({
    label: `${player.information.firstName} ${player.information.lastName}`,
    value: String(player.id)
  }))

  return formattedPlayerOptions
}

export default getPlayerOptions