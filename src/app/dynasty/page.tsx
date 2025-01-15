'use client'

import FileUploadButton from '@/components/FileUploadButton'
import useGetAllDynasties from '@/queries/dynasty/getAllDynasties'
import { Button, Spinner } from '@nextui-org/react'
import { importDB } from 'dexie-export-import'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'

const DynastyDashboardPage: React.FC = () => {
  const data = useGetAllDynasties()
  const router = useRouter()

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const file = e.target.files[0]

        const blob = new Blob([file], { type: 'application/JSON' })

        await importDB(blob)
      }
    } catch (err: any) {
      window.alert(`Error importing file: ${err.message}`)
    }
  }

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
        <FileUploadButton
          className="w-full"
          fileAccept="application/JSON"
          onUpload={handleImport}
        >
          Import Existing Dynasty
        </FileUploadButton>
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
