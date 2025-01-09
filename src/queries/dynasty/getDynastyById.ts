import { db } from '@/db/db.model'

const getDynastyById = async (id: number) => {
  const dynasties = await db.dynasties.where({ id }).toArray()

  if (!dynasties) return null

  console.log(dynasties, id)

  const dynasty = dynasties[0]

  await Promise.all(
    dynasty.availableTeams.map(async (team) => {
      [team.data] = await Promise.all([db.teams.get(team.teamId)])
    })
  )

  return dynasty
}

export default getDynastyById
