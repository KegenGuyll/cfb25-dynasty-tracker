import {
  PassingStats,
  Player,
  ReceivingStats,
  RushingStats,
} from '@/db/types/player'
import { useMemo } from 'react'

type CareerStatsListProps = {
  player: Player
}

type TrackableStats<T> = {
  title: string
  key: keyof T
  total?: number
  mathType: 'sum' | 'avg'
}

const passingTrackableStats: TrackableStats<PassingStats>[] = [
  {
    title: 'Passing Attempts',
    key: 'att',
    mathType: 'sum',
  },
  {
    title: 'Passing Completions',
    key: 'comp',
    mathType: 'sum',
  },
  {
    title: 'Passing Comp Pct',
    key: 'compPct',
    mathType: 'avg',
  },
  {
    title: 'Passing Yards',
    key: 'yards',
    mathType: 'sum',
  },
  {
    title: 'Passing TDs',
    key: 'td',
    mathType: 'sum',
  },
  {
    title: 'Interceptions',
    key: 'int',
    mathType: 'sum',
  },
  {
    title: 'Passer Rating',
    key: 'rating',
    mathType: 'avg',
  },
]

const rushingTrackableStats: TrackableStats<RushingStats>[] = [
  {
    title: 'Rushing Attempts',
    key: 'car',
    mathType: 'sum',
  },
  {
    title: 'Rushing Yards',
    key: 'yards',
    mathType: 'sum',
  },
  {
    title: 'Rushing Avg',
    key: 'avg',
    mathType: 'avg',
  },
  {
    title: 'Rushing TDs',
    key: 'td',
    mathType: 'sum',
  },
  {
    title: 'Broken Tackles',
    key: 'btk',
    mathType: 'sum',
  },
  {
    title: 'Yards After Contact',
    key: 'yac',
    mathType: 'sum',
  },
]

const receivingTrackableStats: TrackableStats<ReceivingStats>[] = [
  {
    title: 'Receptions',
    key: 'rec',
    mathType: 'sum',
  },
  {
    title: 'Receiving Yards',
    key: 'yards',
    mathType: 'sum',
  },
  {
    title: 'Receiving Avg',
    key: 'avg',
    mathType: 'avg',
  },
  {
    title: 'Receiving TDs',
    key: 'td',
    mathType: 'sum',
  },
]

const formatTotal = (total: number) => {
  if (total % 1 !== 0) {
    return total.toFixed(1)
  }

  return total.toLocaleString()
}

const totalStats = <T extends unknown>(
  trackableStats: TrackableStats<T>[],
  stats?: T[]
) => {
  if (!stats) return trackableStats

  const totalStats: TrackableStats<T>[] = [...structuredClone(trackableStats)]

  trackableStats.forEach((trackedStat) => {
    const total = stats.reduce(
      (acc, stat) => acc + (stat[trackedStat.key] as number),
      0
    )
    const value = trackedStat.mathType === 'avg' ? total / stats.length : total
    const findStat = totalStats.find((stat) => stat.key === trackedStat.key)
    if (findStat) findStat.total = value
  })

  return totalStats
}

const CareerStatItem = <T extends unknown>({
  stat,
}: {
  stat: TrackableStats<T>
}) => {
  if (!stat.total) return null

  return (
    <li className="grid grid-cols-4" key={stat.title}>
      <span className="font-bold col-span-3">{stat.title}:</span>{' '}
      <span>{formatTotal(stat.total)}</span>
    </li>
  )
}

const CareerStatsList: React.FC<CareerStatsListProps> = ({
  player,
}: CareerStatsListProps) => {
  console.log(player.information.firstName)

  const careerPassing = useMemo(
    () => totalStats(passingTrackableStats, player.stats.passing),
    [player]
  )
  const careerRushing = useMemo(
    () => totalStats(rushingTrackableStats, player.stats.rushing),
    [player]
  )
  const careerReceiving = useMemo(
    () => totalStats(receivingTrackableStats, player.stats.receiving),
    [player]
  )

  console.log(careerPassing)
  console.log(careerRushing)
  console.log(careerReceiving)

  return (
    <ul>
      {careerPassing.map((stat) => (
        <CareerStatItem key={`${player.id}-${stat.key}`} stat={stat} />
      ))}
      {careerRushing.map((stat) => (
        <CareerStatItem key={`${player.id}-${stat.key}`} stat={stat} />
      ))}
      {careerReceiving.map((stat) => (
        <CareerStatItem key={`${player.id}-${stat.key}`} stat={stat} />
      ))}
    </ul>
  )
}

export default CareerStatsList
