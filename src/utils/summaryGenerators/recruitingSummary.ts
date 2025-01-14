import getRecruitingData from "@/queries/recruiting/getRecruitingData";
import getTeamInfo from "@/queries/teamInfo/getTeamInfo";



type RecruitingSummary = {
  headline: string;
  summary: string;
}


/**
 * This function will take the classId and generate a summary of the recruiting process for that class.
 * Highlighting key signed player and top transfers.
 * @param {number} classId 
 */
const recruitingSummary = async (dynastyId: string, teamId: string, year: string) => {
  const team = await getTeamInfo(Number(dynastyId), Number(teamId), Number(year));
  const recruitingClass = await getRecruitingData(dynastyId, teamId, year);

  if (!recruitingClass) return null;

  const identifyProspects = () => {
    const DevTraitRanking = {
      "Elite": 1,
      "Star": 2,
      "Impact": 3,
      "Normal": 4
    };

    const sortedByDevTrait = recruitingClass.players.sort((a, b) => {
      return DevTraitRanking[a.recruit.devTrait as keyof typeof DevTraitRanking] - DevTraitRanking[b.recruit.devTrait as keyof typeof DevTraitRanking];
    });

    // filter out any Normal dev trait players
    const skilledProspects = sortedByDevTrait.filter(player => player.recruit.devTrait !== "Normal");

    // filter out any players that are considered a bust
    const potentialProspects = skilledProspects.filter(player => player.recruit.gem.toLowerCase() !== 'bust');


    // // top players will be determined by the highest overall rating, 
    // // highest potential (dev trait), weather they are a gem and national rank
    const topPlayers = potentialProspects.sort((a, b) => {
      return (b.recruit.overall || 0) - (a.recruit.overall || 0);
    });

    // // take half of the top players
    const halfPlayers = topPlayers.slice(0, Math.ceil(topPlayers.length / 2));

    // if a player is in the halfPlayer array, but no in the top half of the array and has an elite dev trait
    const hiddenGems = halfPlayers.filter(player => {
      const halfSize = Math.floor(halfPlayers.length / 2);
      console.log(halfSize);

      return player.recruit.devTrait === "Elite" && topPlayers.indexOf(player) > halfSize;
    });

    return {
      topPlayer: topPlayers[0],
      followUpPlayers: topPlayers.slice(1),
      hiddenGems
    }
  }


  const generateAdjectiveBasedOnDevTrait = (devTrait: string) => {
    if (devTrait === "Elite") {
      const options = ["amazing", "incredible", "unbelievable", "unreal", "unmatched"];
      return options[Math.floor(Math.random() * options.length)];
    }
    if (devTrait === "Star") {
      const options = ["great", "fantastic", "awesome", "impressive", "stellar"];
      return options[Math.floor(Math.random() * options.length)];
    }
    if (devTrait === "Impact") {
      const options = ["good", "solid", "dependable", "reliable", "consistent"];
      return options[Math.floor(Math.random() * options.length)];
    }
    if (devTrait === "Normal") {
      const options = ["average", "okay", "decent", "mediocre", "ordinary"];
      return options[Math.floor(Math.random() * options.length)];
    }
  }


  const createSummary = () => {
    const prospects = identifyProspects();

    const headline = `The ${team.data?.school} ${team.data?.nickname} have signed ${recruitingClass.overview.total} recruits for the ${recruitingClass.year} season.`;
    const summary = `
      This class is headlined by ${prospects.topPlayer.information.firstName} ${prospects.topPlayer.information.lastName}, 
      a ${prospects.topPlayer.recruit.position} that was ranked ${prospects.topPlayer.recruit.nationalRank} nationally!
      ${prospects.topPlayer.information.lastName} is an ${generateAdjectiveBasedOnDevTrait(prospects.topPlayer.recruit.devTrait)} talent that will make an immediate impact on the field.
      The follow up player to watch is ${prospects.followUpPlayers[0].information.firstName} ${prospects.followUpPlayers[0].information.lastName}, a ${prospects.followUpPlayers[0].recruit.position} that is sure to be ${generateAdjectiveBasedOnDevTrait(prospects.followUpPlayers[0].recruit.devTrait)}.
      The ${prospects.hiddenGems.length > 1 ? "hidden gems" : "hidden gem"} in this class is ${prospects.hiddenGems.map(player => `${player.information.firstName} ${player.information.lastName}`).join(", ")}.
      `;

    return {
      headline,
      summary
    }
  }


  return createSummary();
}


export default recruitingSummary;