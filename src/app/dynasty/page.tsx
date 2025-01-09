'use client'

import useGetAllDynasties from '@/queries/dynasty/getAllDynasties'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DynastyDashboardPage: React.FC = () => {
  const data = useGetAllDynasties()
  const router = useRouter()

  return (
    <div>
      <h1>Dynasty Dashboard</h1>
      {!data && <p>Loading...</p>}
      {data?.map((dynasty) => (
        <Link key={dynasty.id} href={`/dynasty/${dynasty.id}/dashboard`}>
          <div className="bg-content1 p-2 rounded max-w-[150px]">
            <h2>{dynasty.name}</h2>
            <p>{dynasty.description}</p>
          </div>
        </Link>
      ))}
      {data?.length === 0 && (
        <div>
          <p>No dynasties found</p>
          <Button onPress={() => router.push('/dynasty/create')}>
            Create Dynasty
          </Button>
        </div>
      )}
    </div>
  )
}

export default DynastyDashboardPage
