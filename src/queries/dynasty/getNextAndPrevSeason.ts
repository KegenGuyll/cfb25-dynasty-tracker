import getDynastyById from "./getDynastyById"

const getNextAndPrevSeason = async (currentSeason: number, teamId: number, dynastyId: number) => {
  const dynasties = await getDynastyById(dynastyId)

  if (!dynasties) return null

  const teamSeasons = dynasties.availableTeams.filter((team) => team.teamId === teamId);

  const nextSeasonTeam = teamSeasons.find((team) => team.year === currentSeason + 1);
  const prevSeasonTeam = teamSeasons.find((team) => team.year === currentSeason - 1);


  return {
    nextSeasonTeam,
    prevSeasonTeam
  }
}

export default getNextAndPrevSeason