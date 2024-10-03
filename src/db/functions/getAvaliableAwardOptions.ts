import { db } from "../db.model"

const getAvailableAwardOptions = async () => {
  const availableAwards = await db.availableAwards.toArray()

  return availableAwards.map((award) => ({
    value: String(award.awardId),
    label: award.name,
  }))
}

export default getAvailableAwardOptions