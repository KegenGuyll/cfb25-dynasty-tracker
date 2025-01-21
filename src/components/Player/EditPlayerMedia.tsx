import { Player } from '@/db/types/player'
import EditModal from '../Modal/EditModal'
import FileUploadButton from '../FileUploadButton'
import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { db } from '@/db/db.model'
import { Form } from '@heroui/react'

type EditPlayerMediaProps = {
  player: Player
  isOpen: boolean
  handleClose: () => void
}

type PreviewMedia = {
  fileType: string
  file: string
}

const determineMediaType = (fileType: string): 'video' | 'image' => {
  if (fileType.includes('image')) return 'image'
  if (fileType.includes('video')) return 'video'
  return 'image'
}

const EditPlayerMedia: React.FC<EditPlayerMediaProps> = ({
  player,
  isOpen,
  handleClose,
}: EditPlayerMediaProps) => {
  const [previewImage, setPreviewImage] = useState<PreviewMedia[]>([])
  const [files, setFiles] = useState<FileList | null>(null)

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    setFiles(files)

    for (let i = 0; i < Array.from(files || []).length || 0; i++) {
      const file = files?.item(i)
      if (file) {
        const reader = new FileReader()

        reader.onloadend = () => {
          setPreviewImage((prev) => [
            ...prev,
            {
              fileType: file.type,
              file: reader.result as string,
            },
          ])
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const bulkAddMedia = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = (await db.media.bulkAdd(
      Array.from(files || []).map((file) => ({ data: file })),
      undefined,
      { allKeys: true }
    )) as number[] | undefined

    if (response) {
      const existingMedia: number[] = player.mediaAttachments
        ? JSON.parse(JSON.stringify(player.mediaAttachments))
        : []

      await db.players.update(player.id, {
        mediaAttachments: [...existingMedia, ...response],
      })
    }

    handleClose()
  }

  return (
    <EditModal
      title="Media"
      isOpen={isOpen}
      handleClose={handleClose}
      formId="player-media-form"
    >
      <Form onSubmit={bulkAddMedia} id="player-media-form">
        <FileUploadButton
          className="w-full"
          fileAccept="image/*, video/*"
          onUpload={handlePreviewImage}
        >
          Upload Media
        </FileUploadButton>
        {/* {previewImage && (
          <div className="py-4 flex w-full justify-center">
            <Image
              width={200}
              height={200}
              src={previewImage}
              alt="Player Image"
            />
            <video controls width="600" height="400" src={previewImage} />
          </div>
        )} */}
        {previewImage.map((media, index) => (
          <div key={index} className="flex gap-4">
            {determineMediaType(media.fileType) === 'image' ? (
              <Image
                width={200}
                height={200}
                src={media.file}
                alt="Player Image"
              />
            ) : (
              <video controls width="600" height="400" src={media.file} />
            )}
          </div>
        ))}
      </Form>
    </EditModal>
  )
}

export default EditPlayerMedia
