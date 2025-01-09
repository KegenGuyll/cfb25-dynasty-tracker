type PlayerPositionOptions = {
  key: Position
  label: Position
}

type Abilities = {
  key: string
  label: string
}

enum AbilitiesEnum {
  sleightOfHand = 'Sleight of Hand',
  stepUp = 'Step Up',
  resistance = 'Resistance',
  dot = 'Dot!',
  pullDown = 'Pull Down',
  mobileDeadeye = 'Mobile Deadeye',
  offPlatform = 'Off Platform',
  extender = 'Extender',
  magician = 'Magician',
  mobileResistance = 'Mobile Resistance',
  optionKing = 'Option King',
  shifty = 'Shifty',
  sideStep = 'Side Step',
  takeoff = 'Takeoff',
  threeSixty = '360',
  recoup = 'Recoup',
  headfirst = 'Headfirst',
  workhorse = 'Workhorse',
  downhill = 'Downhill',
  balanced = 'Balanced',
  armBar = 'Arm Bar',
  safetyValve = 'Safety Valve',
  sidekick = 'Sidekick',
  strongGrip = 'Strong Grip',
  quickDrop = 'Quick Drop',
  pocketShield = 'Pocket Shield',
  outsideShield = 'Outside Shield',
  secondLevel = 'Second Level',
  sureHands = 'Sure Hands',
  wearDown = 'Wear Down',
  cutter = 'Cutter',
  fiftyFifty = '50/50',
  pressPro = 'Press Pro',
  screenEnforcer = 'Screen Enforcer',
  optionShield = 'Option Shield',
  groundNPound = 'Ground N Pound',
  duress = 'Duress',
  gripBreaker = 'Grip Breaker',
  pocketDisruptor = 'Pocket Disruptor',
  takeDown = 'Take Down',
  insideDisruptor = 'Inside Disruptor',
  outsideDisruptor = 'Outside Disruptor',
  optionDisruptor = 'Option Disruptor',
  quickJump = 'Quick Jump',
  houseCall = 'House Call',
  knockout = 'Knockout',
  bouncer = 'Bouncer',
  hammer = 'Hammer',
  wrapUp = 'Wrap Up',
  afterShock = 'Aftershock',
  robber = 'Robber',
  blanketCoverage = 'Blanket Coverage',
  jammer = 'Jammer',
  ballHawk = 'Ball Hawk',
  deepRange = 'Deep Range',
  coffinCorner = 'Coffin Corner',
  chipShot = 'Chip Shot',
  megaLeg = 'Mega Leg',
  fieldFlipper = 'Field Flip',
  doubleDip = 'Double Dip',
  layout = 'Lay Out',
  paShield = 'PA Shield',
  insideShield = 'Inside Shield',
  blowUp = 'Blow Up',
}

type AbilitiesDict = {
  [key in AbilitiesEnum]: Abilities
}


const AllAbilities: AbilitiesDict = {
  [AbilitiesEnum.afterShock]: {
    key: AbilitiesEnum.afterShock,
    label: 'Aftershock'
  },
  [AbilitiesEnum.armBar]: {
    key: AbilitiesEnum.armBar,
    label: 'Arm Bar'
  },
  [AbilitiesEnum.ballHawk]: {
    key: AbilitiesEnum.ballHawk,
    label: 'Ball Hawk'
  },
  [AbilitiesEnum.balanced]: {
    key: AbilitiesEnum.balanced,
    label: 'Balanced'
  },
  [AbilitiesEnum.bouncer]: {
    key: AbilitiesEnum.bouncer,
    label: 'Bouncer'
  },
  [AbilitiesEnum.coffinCorner]: {
    key: AbilitiesEnum.coffinCorner,
    label: 'Coffin Corner'
  },
  [AbilitiesEnum.cutter]: {
    key: AbilitiesEnum.cutter,
    label: 'Cutter'
  },
  [AbilitiesEnum.deepRange]: {
    key: AbilitiesEnum.deepRange,
    label: 'Deep Range'
  },
  [AbilitiesEnum.dot]: {
    key: AbilitiesEnum.dot,
    label: 'Dot!'
  },
  [AbilitiesEnum.downhill]: {
    key: AbilitiesEnum.downhill,
    label: 'Downhill'
  },
  [AbilitiesEnum.doubleDip]: {
    key: AbilitiesEnum.doubleDip,
    label: 'Double Dip'
  },
  [AbilitiesEnum.duress]: {
    key: AbilitiesEnum.duress,
    label: 'Duress'
  },
  [AbilitiesEnum.extender]: {
    key: AbilitiesEnum.extender,
    label: 'Extender'
  },
  [AbilitiesEnum.fiftyFifty]: {
    key: AbilitiesEnum.fiftyFifty,
    label: '50/50'
  },
  [AbilitiesEnum.gripBreaker]: {
    key: AbilitiesEnum.gripBreaker,
    label: 'Grip Breaker'
  },
  [AbilitiesEnum.groundNPound]: {
    key: AbilitiesEnum.groundNPound,
    label: 'Ground N Pound'
  },
  [AbilitiesEnum.hammer]: {
    key: AbilitiesEnum.hammer,
    label: 'Hammer'
  },
  [AbilitiesEnum.headfirst]: {
    key: AbilitiesEnum.headfirst,
    label: 'Headfirst'
  },
  [AbilitiesEnum.houseCall]: {
    key: AbilitiesEnum.houseCall,
    label: 'House Call'
  },
  [AbilitiesEnum.insideDisruptor]: {
    key: AbilitiesEnum.insideDisruptor,
    label: 'Inside Disruptor'
  },
  [AbilitiesEnum.wrapUp]: {
    key: AbilitiesEnum.wrapUp,
    label: 'Wrap Up'
  },
  [AbilitiesEnum.sleightOfHand]: {
    key: AbilitiesEnum.sleightOfHand,
    label: 'Sleight of Hand'
  },
  [AbilitiesEnum.stepUp]: {
    key: AbilitiesEnum.stepUp,
    label: 'Step Up'
  },
  [AbilitiesEnum.resistance]: {
    key: AbilitiesEnum.resistance,
    label: 'Resistance'
  },
  [AbilitiesEnum.pullDown]: {
    key: AbilitiesEnum.pullDown,
    label: 'Pull Down'
  },
  [AbilitiesEnum.mobileDeadeye]: {
    key: AbilitiesEnum.mobileDeadeye,
    label: 'Mobile Deadeye'
  },
  [AbilitiesEnum.offPlatform]: {
    key: AbilitiesEnum.offPlatform,
    label: 'Off Platform'
  },
  [AbilitiesEnum.magician]: {
    key: AbilitiesEnum.magician,
    label: 'Magician'
  },
  [AbilitiesEnum.mobileResistance]: {
    key: AbilitiesEnum.mobileResistance,
    label: 'Mobile Resistance'
  },
  [AbilitiesEnum.optionKing]: {
    key: AbilitiesEnum.optionKing,
    label: 'Option King'
  },
  [AbilitiesEnum.shifty]: {
    key: AbilitiesEnum.shifty,
    label: 'Shifty'
  },
  [AbilitiesEnum.sideStep]: {
    key: AbilitiesEnum.sideStep,
    label: 'Side Step'
  },
  [AbilitiesEnum.takeoff]: {
    key: AbilitiesEnum.takeoff,
    label: 'Takeoff'
  },
  [AbilitiesEnum.threeSixty]: {
    key: AbilitiesEnum.threeSixty,
    label: '360'
  },
  [AbilitiesEnum.recoup]: {
    key: AbilitiesEnum.recoup,
    label: 'Recoup'
  },
  [AbilitiesEnum.workhorse]: {
    key: AbilitiesEnum.workhorse,
    label: 'Workhorse'
  },
  [AbilitiesEnum.safetyValve]: {
    key: AbilitiesEnum.safetyValve,
    label: 'Safety Valve'
  },
  [AbilitiesEnum.sidekick]: {
    key: AbilitiesEnum.sidekick,
    label: 'Sidekick'
  },
  [AbilitiesEnum.strongGrip]: {
    key: AbilitiesEnum.strongGrip,
    label: 'Strong Grip'
  },
  [AbilitiesEnum.quickDrop]: {
    key: AbilitiesEnum.quickDrop,
    label: 'Quick Drop'
  },
  [AbilitiesEnum.pocketShield]: {
    key: AbilitiesEnum.pocketShield,
    label: 'Pocket Shield'
  },
  [AbilitiesEnum.outsideShield]: {
    key: AbilitiesEnum.outsideShield,
    label: 'Outside Shield'
  },
  [AbilitiesEnum.secondLevel]: {
    key: AbilitiesEnum.secondLevel,
    label: 'Second Level'
  },
  [AbilitiesEnum.sureHands]: {
    key: AbilitiesEnum.sureHands,
    label: 'Sure Hands'
  },
  [AbilitiesEnum.wearDown]: {
    key: AbilitiesEnum.wearDown,
    label: 'Wear Down'
  },
  [AbilitiesEnum.pressPro]: {
    key: AbilitiesEnum.pressPro,
    label: 'Press Pro'
  },
  [AbilitiesEnum.screenEnforcer]: {
    key: AbilitiesEnum.screenEnforcer,
    label: 'Screen Enforcer'
  },
  [AbilitiesEnum.optionShield]: {
    key: AbilitiesEnum.optionShield,
    label: 'Option Shield'
  },
  [AbilitiesEnum.pocketDisruptor]: {
    key: AbilitiesEnum.pocketDisruptor,
    label: 'Pocket Disruptor'
  },
  [AbilitiesEnum.takeDown]: {
    key: AbilitiesEnum.takeDown,
    label: 'Take Down'
  },
  [AbilitiesEnum.outsideDisruptor]: {
    key: AbilitiesEnum.outsideDisruptor,
    label: 'Outside Disruptor'
  },
  [AbilitiesEnum.optionDisruptor]: {
    key: AbilitiesEnum.optionDisruptor,
    label: 'Option Disruptor'
  },
  [AbilitiesEnum.quickJump]: {
    key: AbilitiesEnum.quickJump,
    label: 'Quick Jump'
  },
  [AbilitiesEnum.knockout]: {
    key: AbilitiesEnum.knockout,
    label: 'Knockout'
  },
  [AbilitiesEnum.robber]: {
    key: AbilitiesEnum.robber,
    label: 'Robber'
  },
  [AbilitiesEnum.blanketCoverage]: {
    key: AbilitiesEnum.blanketCoverage,
    label: 'Blanket Coverage'
  },
  [AbilitiesEnum.jammer]: {
    key: AbilitiesEnum.jammer,
    label: 'Jammer'
  },
  [AbilitiesEnum.chipShot]: {
    key: AbilitiesEnum.chipShot,
    label: 'Chip Shot'
  },
  [AbilitiesEnum.megaLeg]: {
    key: AbilitiesEnum.megaLeg,
    label: 'Mega Leg'
  },
  [AbilitiesEnum.fieldFlipper]: {
    key: AbilitiesEnum.fieldFlipper,
    label: 'Field Flipper'
  },
  [AbilitiesEnum.layout]: {
    key: AbilitiesEnum.layout,
    label: 'Lay Out'
  },
  [AbilitiesEnum.paShield]: {
    key: AbilitiesEnum.paShield,
    label: 'PA Shield'
  },
  [AbilitiesEnum.insideShield]: {
    key: AbilitiesEnum.insideShield,
    label: 'Inside Shield'
  },
  [AbilitiesEnum.blowUp]: {
    key: AbilitiesEnum.blowUp,
    label: 'Blow Up'
  }
}


type PositionAbilities = {
  name: string
  abilities: Abilities[]
}

const QBAbilities: PositionAbilities[] = [
  {
    name: 'Field General',
    abilities: [
      AllAbilities[AbilitiesEnum.sleightOfHand],
      AllAbilities[AbilitiesEnum.stepUp],
      AllAbilities[AbilitiesEnum.resistance],
      AllAbilities[AbilitiesEnum.dot],
      AllAbilities[AbilitiesEnum.pullDown]
    ]
  },
  {
    name: 'Improviser',
    abilities: [
      AllAbilities[AbilitiesEnum.mobileDeadeye],
      AllAbilities[AbilitiesEnum.pullDown],
      AllAbilities[AbilitiesEnum.offPlatform],
      AllAbilities[AbilitiesEnum.sleightOfHand],
      AllAbilities[AbilitiesEnum.extender]
    ]
  },
  {
    name: 'Scrambler',
    abilities: [
      AllAbilities[AbilitiesEnum.magician],
      AllAbilities[AbilitiesEnum.mobileResistance],
      AllAbilities[AbilitiesEnum.optionKing],
      AllAbilities[AbilitiesEnum.extender],
      AllAbilities[AbilitiesEnum.offPlatform]
    ]
  }
]

const RBAbilities: PositionAbilities[] = [
  {
    name: "Elusive Back",
    abilities: [
      AllAbilities[AbilitiesEnum.shifty],
      AllAbilities[AbilitiesEnum.sideStep],
      AllAbilities[AbilitiesEnum.takeDown],
      AllAbilities[AbilitiesEnum.threeSixty],
      AllAbilities[AbilitiesEnum.recoup]
    ]
  },
  {
    name: "Power Back",
    abilities: [
      AllAbilities[AbilitiesEnum.headfirst],
      AllAbilities[AbilitiesEnum.sideStep],
      AllAbilities[AbilitiesEnum.downhill],
      AllAbilities[AbilitiesEnum.balanced],
      AllAbilities[AbilitiesEnum.armBar]
    ]
  },
  {
    name: "Receiving Back",
    abilities: [
      AllAbilities[AbilitiesEnum.balanced],
      AllAbilities[AbilitiesEnum.safetyValve],
      AllAbilities[AbilitiesEnum.takeoff],
      AllAbilities[AbilitiesEnum.sidekick],
      AllAbilities[AbilitiesEnum.recoup],
    ]
  }
]

const WRAbilities: PositionAbilities[] = [
  {
    name: 'Deep Threat',
    abilities: [
      AllAbilities[AbilitiesEnum.shifty],
      AllAbilities[AbilitiesEnum.doubleDip],
      AllAbilities[AbilitiesEnum.takeoff],
      AllAbilities[AbilitiesEnum.layout],
      AllAbilities[AbilitiesEnum.pressPro]
    ]
  },
  {
    name: 'Physical',
    abilities: [
      AllAbilities[AbilitiesEnum.fiftyFifty],
      AllAbilities[AbilitiesEnum.sureHands],
      AllAbilities[AbilitiesEnum.balanced],
      AllAbilities[AbilitiesEnum.recoup],
      AllAbilities[AbilitiesEnum.pressPro]
    ]
  },
  {
    name: 'Route Runner',
    abilities: [
      AllAbilities[AbilitiesEnum.cutter],
      AllAbilities[AbilitiesEnum.pressPro],
      AllAbilities[AbilitiesEnum.recoup],
      AllAbilities[AbilitiesEnum.doubleDip],
      AllAbilities[AbilitiesEnum.sureHands]
    ]
  }
]

const TEAbilities: PositionAbilities[] = [
  {
    name: 'Blocking',
    abilities: [
      AllAbilities[AbilitiesEnum.strongGrip],
      AllAbilities[AbilitiesEnum.quickDrop],
      AllAbilities[AbilitiesEnum.pocketShield],
      AllAbilities[AbilitiesEnum.outsideShield],
      AllAbilities[AbilitiesEnum.secondLevel]
    ]
  },
  {
    name: 'Possession',
    abilities: [
      AllAbilities[AbilitiesEnum.sureHands],
      AllAbilities[AbilitiesEnum.balanced],
      AllAbilities[AbilitiesEnum.strongGrip],
      AllAbilities[AbilitiesEnum.outsideShield],
      AllAbilities[AbilitiesEnum.wearDown]
    ]
  },
  {
    name: 'Vertical Threat',
    abilities: [
      AllAbilities[AbilitiesEnum.sureHands],
      AllAbilities[AbilitiesEnum.recoup],
      AllAbilities[AbilitiesEnum.cutter],
      AllAbilities[AbilitiesEnum.balanced],
      AllAbilities[AbilitiesEnum.fiftyFifty]
    ]
  },
]

const OLAbilities: PositionAbilities[] = [
  {
    name: 'Agile',
    abilities: [
      AllAbilities[AbilitiesEnum.secondLevel],
      AllAbilities[AbilitiesEnum.screenEnforcer],
      AllAbilities[AbilitiesEnum.optionShield],
      AllAbilities[AbilitiesEnum.outsideShield],
      AllAbilities[AbilitiesEnum.quickDrop]
    ]
  },
  {
    name: 'Pass Protector',
    abilities: [
      AllAbilities[AbilitiesEnum.pocketShield],
      AllAbilities[AbilitiesEnum.quickDrop],
      AllAbilities[AbilitiesEnum.paShield],
      AllAbilities[AbilitiesEnum.strongGrip],
      AllAbilities[AbilitiesEnum.wearDown]
    ]
  },
  {
    name: 'Power',
    abilities: [
      AllAbilities[AbilitiesEnum.secondLevel],
      AllAbilities[AbilitiesEnum.strongGrip],
      AllAbilities[AbilitiesEnum.optionShield],
      AllAbilities[AbilitiesEnum.insideShield],
      AllAbilities[AbilitiesEnum.groundNPound]
    ]
  },
]

const DEAbilities: PositionAbilities[] = [
  {
    name: 'Power Rusher',
    abilities: [
      AllAbilities[AbilitiesEnum.duress],
      AllAbilities[AbilitiesEnum.gripBreaker],
      AllAbilities[AbilitiesEnum.pocketDisruptor],
      AllAbilities[AbilitiesEnum.takeDown],
      AllAbilities[AbilitiesEnum.recoup]
    ]
  },
  {
    name: 'Run Stopper',
    abilities: [
      AllAbilities[AbilitiesEnum.gripBreaker],
      AllAbilities[AbilitiesEnum.insideDisruptor],
      AllAbilities[AbilitiesEnum.outsideDisruptor],
      AllAbilities[AbilitiesEnum.optionDisruptor],
      AllAbilities[AbilitiesEnum.recoup]
    ]
  },
  {
    name: 'Speed Rusher',
    abilities: [
      AllAbilities[AbilitiesEnum.quickJump],
      AllAbilities[AbilitiesEnum.pocketDisruptor],
      AllAbilities[AbilitiesEnum.takeDown],
      AllAbilities[AbilitiesEnum.duress],
      AllAbilities[AbilitiesEnum.recoup]
    ]
  }
]

const OLBAbilities: PositionAbilities[] = [
  {
    name: 'Pass Coverage',
    abilities: [
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.knockout],
      AllAbilities[AbilitiesEnum.bouncer],
      AllAbilities[AbilitiesEnum.hammer],
      AllAbilities[AbilitiesEnum.wrapUp]
    ]
  },
  {
    name: 'Power Rusher',
    abilities: [
      AllAbilities[AbilitiesEnum.duress],
      AllAbilities[AbilitiesEnum.quickJump],
      AllAbilities[AbilitiesEnum.pocketDisruptor],
      AllAbilities[AbilitiesEnum.takeDown],
      AllAbilities[AbilitiesEnum.gripBreaker]
    ]
  },
  {
    name: 'Run Stopper',
    abilities: [
      AllAbilities[AbilitiesEnum.wrapUp],
      AllAbilities[AbilitiesEnum.blowUp],
      AllAbilities[AbilitiesEnum.gripBreaker],
      AllAbilities[AbilitiesEnum.outsideDisruptor],
      AllAbilities[AbilitiesEnum.insideDisruptor]
    ]
  }
]

const MLBAbilities: PositionAbilities[] = [
  {
    name: 'Pass Coverage',
    abilities: [
      AllAbilities[AbilitiesEnum.robber],
      AllAbilities[AbilitiesEnum.knockout],
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.bouncer],
      AllAbilities[AbilitiesEnum.wrapUp]
    ]
  },
  {
    name: 'Field General',
    abilities: [
      AllAbilities[AbilitiesEnum.afterShock],
      AllAbilities[AbilitiesEnum.wrapUp],
      AllAbilities[AbilitiesEnum.insideDisruptor],
      AllAbilities[AbilitiesEnum.hammer],
      AllAbilities[AbilitiesEnum.gripBreaker]
    ]
  },
  {
    name: 'Run Stopper',
    abilities: [
      AllAbilities[AbilitiesEnum.hammer],
      AllAbilities[AbilitiesEnum.wrapUp],
      AllAbilities[AbilitiesEnum.blowUp],
      AllAbilities[AbilitiesEnum.gripBreaker],
      AllAbilities[AbilitiesEnum.insideDisruptor]
    ]
  }
]

const CBAbilities: PositionAbilities[] = [
  {
    name: 'Man to Man',
    abilities: [
      AllAbilities[AbilitiesEnum.blanketCoverage],
      AllAbilities[AbilitiesEnum.jammer],
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.ballHawk],
      AllAbilities[AbilitiesEnum.knockout]
    ]
  },
  {
    name: 'Slot',
    abilities: [
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.blanketCoverage],
      AllAbilities[AbilitiesEnum.jammer],
      AllAbilities[AbilitiesEnum.wrapUp],
      AllAbilities[AbilitiesEnum.quickJump]
    ]
  },
  {
    name: 'Zone',
    abilities: [
      AllAbilities[AbilitiesEnum.knockout],
      AllAbilities[AbilitiesEnum.layout],
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.ballHawk],
      AllAbilities[AbilitiesEnum.bouncer]
    ]
  }
]

const SafetiesAbilities: PositionAbilities[] = [
  {
    name: 'Hybrid',
    abilities: [
      AllAbilities[AbilitiesEnum.wrapUp],
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.layout],
      AllAbilities[AbilitiesEnum.ballHawk],
      AllAbilities[AbilitiesEnum.hammer]
    ]
  },
  {
    name: 'Run Support',
    abilities: [
      AllAbilities[AbilitiesEnum.afterShock],
      AllAbilities[AbilitiesEnum.wrapUp],
      AllAbilities[AbilitiesEnum.hammer],
      AllAbilities[AbilitiesEnum.blowUp],
      AllAbilities[AbilitiesEnum.houseCall]
    ]
  },
  {
    name: 'Zone',
    abilities: [
      AllAbilities[AbilitiesEnum.ballHawk],
      AllAbilities[AbilitiesEnum.layout],
      AllAbilities[AbilitiesEnum.houseCall],
      AllAbilities[AbilitiesEnum.robber],
      AllAbilities[AbilitiesEnum.knockout]
    ]
  }
]


const KickerAbilities: PositionAbilities[] = [
  {
    name: 'Accurate',
    abilities: [
      AllAbilities[AbilitiesEnum.deepRange],
      AllAbilities[AbilitiesEnum.coffinCorner],
      AllAbilities[AbilitiesEnum.chipShot],
    ]
  },
  {
    name: 'Power',
    abilities: [
      AllAbilities[AbilitiesEnum.megaLeg],
      AllAbilities[AbilitiesEnum.chipShot],
      AllAbilities[AbilitiesEnum.fieldFlipper],
    ]
  },
]

export const playerPositionOptions: PlayerPositionOptions[] = [
  { key: 'QB', label: 'QB' },
  { key: 'RB', label: 'RB' },
  { key: 'FB', label: 'FB' },
  { key: 'WR', label: 'WR' },
  { key: 'TE', label: 'TE' },
  { key: 'LT', label: 'LT' },
  { key: 'LG', label: 'LG' },
  { key: 'C', label: 'C' },
  { key: 'RG', label: 'RG' },
  { key: 'RT', label: 'RT' },
  { key: 'RE', label: 'RE' },
  { key: 'DT', label: 'DT' },
  { key: 'LE', label: 'LE' },
  { key: 'ROLB', label: 'ROLB' },
  { key: 'MLB', label: 'MLB' },
  { key: 'LOLB', label: 'LOLB' },
  { key: 'CB', label: 'CB' },
  { key: 'FS', label: 'FS' },
  { key: 'SS', label: 'SS' },
  { key: 'K', label: 'K' },
  { key: 'P', label: 'P' },
  { key: 'ATH', label: 'ATH' }
]

export const playerDevTraitOptions = [
  { key: 'Normal', label: 'Normal' },
  { key: 'Impact', label: 'Impact' },
  { key: 'Star', label: 'Star' },
  { key: 'Elite', label: 'Elite' }
]

export const playerMentalAbilitiesOptions = [
  {
    name: "Best Friend",
  },
  {
    name: "Clear Headed",
  },
  {
    name: "Clutch Kicker",
  },
  {
    name: "Defensive Rally",
  },
  {
    name: "Fan Favorite",
  },
  {
    name: "Field General",
  },
  {
    name: "Headstrong",
  },
  {
    name: "Legion",
  },
  {
    name: "Offensive Rally",
  },
  {
    name: "Road Dog",
  },
  {
    name: "Team Player",
  },
  {
    name: "The Natural",
  },
  {
    name: "Winning Time",
  },
]

export const abilitiesByPosition: Record<Position, PositionAbilities[]> = {
  QB: QBAbilities,
  RB: RBAbilities,
  FB: RBAbilities,
  WR: WRAbilities,
  TE: TEAbilities,
  LT: OLAbilities,
  LG: OLAbilities,
  C: OLAbilities,
  RG: OLAbilities,
  RT: OLAbilities,
  RE: DEAbilities,
  DT: DEAbilities,
  LE: DEAbilities,
  ROLB: OLBAbilities,
  MLB: MLBAbilities,
  LOLB: OLBAbilities,
  CB: CBAbilities,
  FS: SafetiesAbilities,
  SS: SafetiesAbilities,
  K: KickerAbilities,
  P: KickerAbilities,
  ATH: [
    ...QBAbilities,
    ...RBAbilities,
    ...WRAbilities,
    ...TEAbilities,
    ...OLAbilities,
    ...DEAbilities,
    ...OLBAbilities,
    ...MLBAbilities,
    ...CBAbilities,
    ...SafetiesAbilities,
    ...KickerAbilities
  ]
}

export const playerClassOptions = (redshirt: boolean) => {
  if (redshirt) {
    return [
      { key: 'FR(RS)', label: 'FR (RS)' },
      { key: 'SO(RS)', label: 'SO (RS)' },
      { key: 'JR(RS)', label: 'JR (RS)' },
      { key: 'SR(RS)', label: 'SR (RS)' },
    ]
  }


  return [
    { key: 'FR', label: 'FR' },
    { key: 'SO', label: 'SO' },
    { key: 'JR', label: 'JR' },
    { key: 'SR', label: 'SR' },
  ]
}

type Position =
  'QB' |
  'RB' |
  'FB' |
  'WR' |
  'TE' |
  'LT' |
  'LG' |
  'C' |
  'RG' |
  'RT' |
  'RE' |
  'DT' |
  'LE' |
  'ROLB' |
  'MLB' |
  'LOLB' |
  'CB' |
  'FS' |
  'SS' |
  'K' |
  'P' |
  'ATH'

type PlayerDevTrait = 'Normal' | 'Impact' | 'Star' | 'Elite'

type TraitTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

type historicalOverall = {
  year: number
  overall: number
}

type PlayerMentalTrait = {
  trait: string
  tier: string
}

type GeneralStats = {
  year: number;
  class: string
  teamId: number;
  gp: number;
  dp: number;
}

type PassingStats = GeneralStats & {
  rating: number
  yards: number
  td: number
  int: number
  long: number
  sacks: number
  comp: number
  att: number
  compPct: number
  ypa: number
  ypg: number
}

type RushingStats = GeneralStats & {
  car: number
  yards: number
  avg: number
  td: number
  avgPerGame: number
  btk: number
  fumb: number
  yac: number
  long: number
  '20+': number
}

type ReceivingStats = GeneralStats & {
  rec: number
  yards: number
  avg: number
  td: number
  avgPerGame: number
  rac: number
  racAvg: number
  long: number
  drops: number
}

type DefenseStats = GeneralStats & {
  solo: number
  assists: number
  tak: number
  tfl: number
  sack: number
  int: number
  intYds: number
  intAvg: number
  intLng: number
  defl: number
  ctha: number
  ffumb: number
  fumbRec: number
  fumbYds: number
  block: number
  sfty: number
  td: number
}

type PlayerInformation = {
  position: string
  firstName: string;
  lastName: string;
  nickname?: string;
  height?: string; // inches
  weight?: number; // lbs
  hometown?: string;
  tendency: string;
  recruitId?: number;
  hasRedshirt?: boolean;
}

type PlayerDevelopment = {
  devTrait?: string;
  mentalTraits?: PlayerMentalTrait[];
  physicalTraits?: PlayerMentalTrait[];
}

interface Player {
  id?: number;
  teamId: number;
  information: PlayerInformation;
  development: PlayerDevelopment;
  awards: number[];
  stats: {
    passing?: PassingStats[];
    rushing?: RushingStats[];
    receiving?: ReceivingStats[];
    defense?: DefenseStats[];
  }
  historicalOverall?: historicalOverall[]
  dynastyId: number;
}


export type {
  Player,
  Position,
  PlayerDevTrait,
  TraitTier,
  PlayerMentalTrait,
  GeneralStats,
  PassingStats,
  RushingStats,
  ReceivingStats,
  DefenseStats,
  PlayerInformation,
  PlayerDevelopment,
  historicalOverall
}