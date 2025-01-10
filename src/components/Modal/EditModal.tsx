import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect } from 'react'

type EditModalProps = {
  isOpen: boolean
  handleClose: () => void
  children: React.ReactNode
  title: string
  formId: string
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen: openModel,
  children,
  title,
  handleClose,
  formId,
}: EditModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  useEffect(() => {
    if (openModel) {
      onOpen()
    } else {
      onClose()
    }
  }, [onClose, onOpen, openModel])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        handleClose()
        onClose()
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                Close
              </Button>
              <Button form={formId} type="submit" color="primary">
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditModal
