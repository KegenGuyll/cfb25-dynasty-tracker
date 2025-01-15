import { db } from '@/db/db.model'

const getDynastyById = async (id: number) => {
  const dynasty = await db.dynasties.where({ id }).first()

  if (!dynasty) return null

  await Promise.all(
    dynasty.availableTeams.map(async (team) => {
      [team.data] = await Promise.all([db.teams.get(team.teamId)])
    })
  )

  return dynasty
}

export default getDynastyById
