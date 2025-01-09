import getDynastyById from "./getDynastyById"


const getAllTeamSeason = async (dynastyId: number, teamId: number) => {
  const dynasties = await getDynastyById(dynastyId)

  if (!dynasties) return null

  console.log(dynasties)

  const teamSeasons = dynasties.availableTeams.filter((team) => team.teamId === teamId)

  return teamSeasons
}

export default getAllTeamSeason