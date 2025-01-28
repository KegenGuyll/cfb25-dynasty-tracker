'use client'

import useGetAllDynasties from '@/queries/dynasty/getAllDynasties'
import { Spinner } from '@heroui/react'
import Link from 'next/link'

type AvailableDynastiesProps = {}

const AvailableDynasties: React.FC<
  AvailableDynastiesProps
> = ({}: AvailableDynastiesProps) => {
  const data = useGetAllDynasties()

  return (
    <>
      {!data && <Spinner />}
      <div className="grid grid-cols-12 gap-4">
        {data?.map((dynasty) => (
          <Link
            className="col-span-4 h-60 w-full text-foreground-700"
            key={dynasty.id}
            href={`/dynasty/${dynasty.id}/dashboard`}
          >
            <div className="bg-default-100 p-2 rounded h-full w-full flex flex-col justify-center items-center">
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
    </>
  )
}

export default AvailableDynasties
