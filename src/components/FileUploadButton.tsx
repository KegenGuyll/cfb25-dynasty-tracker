import { Button, ButtonProps } from "@heroui/react"
import { ChangeEvent, useRef } from 'react'

type FileUploadButtonProps = ButtonProps & {
  fileAccept?: string
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  children,
  fileAccept,
  onUpload: fileOnChange,
  ...props
}: FileUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        onChange={fileOnChange}
        accept={fileAccept}
        className="hidden"
        ref={fileInputRef}
        type="file"
      />
      <Button onPress={() => fileInputRef.current?.click()} {...props}>
        {children}
      </Button>
    </>
  )
}

export default FileUploadButton
