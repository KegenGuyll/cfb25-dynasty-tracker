'use client'

import getDynastyById from '@/queries/dynasty/getDynastyById'
import { Button } from '@nextui-org/react'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type DynastyDashboardPageProps = {
  params: {
    dynastyId: string
  }
}

const DynastyDashboardPage: React.FC<DynastyDashboardPageProps> = ({
  params,
}) => {
  const router = useRouter()
  const data = useLiveQuery(() => getDynastyById(Number(params.dynastyId)))

  return (
    <div>
      {!data && <p>Loading...</p>}
      {data && (
        <div className="bg-content1 p-2 rounded flex flex-col gap-6">
          <div>
            <h2 className="text-xl">{data.name}</h2>
            <p>{data.description}</p>
          </div>
          <Button
            onPress={() => router.push('/team-schedule/create?dynastyId=1')}
            className="max-w-44"
          >
            Add Team
          </Button>
          <div className="pt-1">
            <h3 className="text-lg">Available Teams</h3>
            {data.availableTeams.length === 0 && (
              <div className="flex flex-col gap-2 w-48">
                <p>No teams available</p>
              </div>
            )}
            <ul>
              {data.availableTeams.map((team) => (
                <li key={team.teamId}>
                  <Link
                    href={`/dynasty/${params.dynastyId}/dashboard/${team.teamId}`}
                  >
                    {team.data?.school} {team.data?.nickname}
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
