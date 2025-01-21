'use client'

import { db } from '@/db/db.model'
import { Button } from "@heroui/react"
import { exportDB } from 'dexie-export-import'
import { useCallback } from 'react'

type DownloadDynastyPageProps = {}

type DownloadFile = {
  data: string
  fileName: string
  fileType: string
}

const DownloadDynastyPage: React.FC<
  DownloadDynastyPageProps
> = ({}: DownloadDynastyPageProps) => {
  const handleExport = useCallback(async () => {
    const blob = await exportDB(db, {
      filter(table) {
        if (table === 'availableAwards' || table === 'teams') {
          return false
        }
        return true
      },
    })

    console.log(blob)

    const a = document.createElement('a')
    a.download = 'CFB25DynastyTrackerDB.json'
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl font-bold pb-1">Download you Dynasty Data</h1>
        <p className="text-sm font-light">
          Click the button below to download your dynasty data. This will
          download a JSON file that you can use to import your data into another
          browser or device.
        </p>
      </div>
      <Button onPress={handleExport} color="primary">
        Download
      </Button>
    </div>
  )
}

export default DownloadDynastyPage
