import React, { useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react"

type DeleteConfirmationModalProps = {
  isOpen: boolean
  context?: string
  deleteAction: () => void
  handleClose: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  deleteAction,
  isOpen: openModel,
  context,
  handleClose,
}: DeleteConfirmationModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  useEffect(() => {
    if (openModel) {
      onOpen()
    } else {
      onClose()
    }
  }, [onClose, onOpen, openModel])

  const handleAction = () => {
    deleteAction()
    handleClose()
    onClose()
  }

  return (
    <Modal
      onClose={() => {
        handleClose()
        onClose()
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Are you sure you want to delete?
            </ModalHeader>
            <ModalBody>
              <p>
                Once you delete {context || 'this file'}, it won&apos;t be
                possible to undo this.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={handleClose}>
                Close
              </Button>
              <Button color="danger" onPress={handleAction}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteConfirmationModal
