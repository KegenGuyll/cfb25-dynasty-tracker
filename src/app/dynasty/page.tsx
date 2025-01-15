'use client'

import useGetAllDynasties from '@/queries/dynasty/getAllDynasties'
import { Button, Spinner } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DynastyDashboardPage: React.FC = () => {
  const data = useGetAllDynasties()
  const router = useRouter()

  return (
    <div className="flex flex-col space-y-12">
      <div className="w-full space-y-2">
        <h1 className="text-4xl font-semibold">
          College Football 25 Dynasty Tracker
        </h1>
        <p className="font-light">
          Welcome to the CFB25.
          <br />
          This is where you can view all of your dynasties.
        </p>
        <Button
          className="w-full"
          color="primary"
          onPress={() => router.push('/dynasty/create')}
        >
          New Dynasty
        </Button>
      </div>
      {!data && <Spinner />}
      <div className="grid grid-cols-12 gap-4">
        {data?.map((dynasty) => (
          <Link
            className="col-span-4 h-60 w-full text-white"
            key={dynasty.id}
            href={`/dynasty/${dynasty.id}/dashboard`}
          >
            <div className="bg-content1 p-2 rounded h-full w-full flex flex-col justify-center items-center">
              <h2 className="text-lg font-bold">{dynasty.name}</h2>
              <p className="text-sm font-light">{dynasty.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {data?.length === 0 && (
        <div>
          <p>No dynasties found</p>
        </div>
      )}
    </div>
  )
}

export default DynastyDashboardPage
