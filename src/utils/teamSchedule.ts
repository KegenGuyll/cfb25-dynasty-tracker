import { Game, GameLocation } from "@/db/types"

const formatGameLocation = (location: string): GameLocation => {
  switch (location) {
    case 'VS':
      return 'away'
    case 'AT':
      return 'home'
    case 'BYE':
      return 'bye'
    default:
      return 'neutral'
  }
}

const determineGameResult = (game: Game): string => {
  const doesHaveFinalScore = game.finalScore?.home || game.finalScore?.away
  const didTeamWin =
    game.finalScore?.home &&
    game.finalScore?.away &&
    game.finalScore.home > game.finalScore.away

  if (!doesHaveFinalScore) return 'TBD'

  if (didTeamWin) return 'W'

  if (!didTeamWin) return 'L'

  if (game.location === 'bye') return 'BYE'

  return 'TBD'
}

const determineOpp = (game: Game): string => {
  if (game.location === 'home') return String(game.awayTeamId)
  if (game.location === 'away') return String(game.homeTeamId)

  return ''
}

const convertGameLocation = (location: GameLocation): 'VS' | 'AT' | 'BYE' => {
  if (location === 'home') return 'VS'
  if (location === 'away') return 'AT'
  return 'BYE'
}


const determineGameResultWithScore = (game: Game): string => {
  const didTeamWin =
    game.finalScore?.home &&
    game.finalScore?.away &&
    game.finalScore.home > game.finalScore.away

  // score outcome, the highest score must be displayed first
  const scoreOutcome = () => {
    if (game.finalScore?.home !== undefined && game.finalScore?.away !== undefined && game.finalScore.home > game.finalScore.away) {
      return `${game.finalScore?.home} - ${game.finalScore?.away}`
    } else {
      return `${game.finalScore?.away} - ${game.finalScore?.home}`
    }
  }


  if (game.finalScore?.home || game.finalScore?.away) {
    return ` ${game.result} ${scoreOutcome()}`
  }

  if (game.location === 'bye') return 'BYE'

  return 'TBD'
}



export {
  formatGameLocation,
  determineGameResult,
  determineOpp,
  convertGameLocation,
  determineGameResultWithScore
}