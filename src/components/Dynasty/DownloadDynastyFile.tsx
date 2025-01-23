'use client'

import { db } from '@/db/db.model'
import { Button } from '@heroui/react'
import { exportDB } from 'dexie-export-import'
import { useCallback } from 'react'

const DownloadDynastyFile = () => {
  const handleExport = useCallback(async () => {
    const blob = await exportDB(db, {
      filter(table) {
        if (table === 'availableAwards' || table === 'teams') {
          return false
        }
        return true
      },
    })

    const a = document.createElement('a')
    a.download = `CFB25DynastyTrackerDB-${new Date().toISOString()}.json`
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
    <Button onPress={handleExport} color="primary">
      Download
    </Button>
  )
}

export default DownloadDynastyFile
