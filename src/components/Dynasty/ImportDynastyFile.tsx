'use client'

import { importDB } from 'dexie-export-import'
import { ChangeEvent } from 'react'
import FileUploadButton from '../FileUploadButton'

const ImportDynastyFile = () => {
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
    <FileUploadButton
      className="w-full"
      fileAccept="application/JSON"
      onUpload={handleImport}
    >
      Import Existing Dynasty
    </FileUploadButton>
  )
}

export default ImportDynastyFile
