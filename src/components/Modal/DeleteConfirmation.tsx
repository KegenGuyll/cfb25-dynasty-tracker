import React, { useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'

type DeleteConfirmationModalProps = {
  isOpen: boolean
  context?: string
  deleteAction: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  deleteAction,
  isOpen: openModel,
  context,
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
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
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
              <Button color="default" onPress={onClose}>
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
