'use client'

import { AvailableTeams } from '@/db/types/dynasty'
import getDynastyById from '@/queries/dynasty/getDynastyById'
import { Button, Spinner } from '@nextui-org/react'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

type DynastyDashboardPageProps = {
  params: {
    dynastyId: string
  }
}

type AvailableTeamsWithYears = AvailableTeams & {
  years: number[]
}

const DynastyDashboardPage: React.FC<DynastyDashboardPageProps> = ({
  params,
}) => {
  const router = useRouter()
  const data = useLiveQuery(() => getDynastyById(Number(params.dynastyId)))

  const groupByTeamId = useMemo(() => {
    if (!data) return {}

    return (data.availableTeams as AvailableTeamsWithYears[]).reduce(
      (acc: { [key: number]: typeof team }, team) => {
        acc[team.teamId] = {
          ...team,
          years: [...(acc[team.teamId]?.years || []), team.year].sort(
            (a, b) => a - b
          ),
        }
        return acc
      },
      {}
    )
  }, [data])

  const teamName = (team: AvailableTeamsWithYears): string => {
    return `${team.data?.school} (${team.years[0]} - ${
      team.years[team.years.length - 1]
    })`
  }

  return (
    <div className="flex flex-col gap-6 w-full bg-content1 p-2 rounded max-w-[600px]">
      {!data && <Spinner />}
      {data && (
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-bold">{data.name}</h2>
            <p className="text-sm font-light">{data.description}</p>
          </div>
          <Button
            className="w-1/4"
            color={data.availableTeams.length > 0 ? 'default' : 'primary'}
            onPress={() => router.push('/team-schedule/create?dynastyId=1')}
          >
            Add Team
          </Button>
          <div className="pt-1">
            <h3 className="text-4xl font-bold">Available Teams</h3>
            {data.availableTeams.length === 0 && (
              <div className="flex flex-col gap-2 pt-6">
                <p>No teams available</p>
              </div>
            )}
            <ul className="pt-6 text-lg pl-4">
              {Object.entries(groupByTeamId).map(([teamId, team]) => (
                <li key={teamId}>
                  <Link
                    href={`/dynasty/${params.dynastyId}/dashboard/${team.teamId}`}
                  >
                    {teamName(team)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default DynastyDashboardPage
