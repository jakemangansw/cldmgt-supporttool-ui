import { FC, useState } from 'react';
import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

interface EditUsernameModalProps {
  isOpen: boolean;
  onOpen: Function;
  onClose: () => void;
  editUsername: (username: string) => void;
}

const EditUsernameModal: FC<EditUsernameModalProps> = (props: EditUsernameModalProps) => {
  const [newUsernameValue, setNewUsernameValue] = useState<string>("");

  const onCloseHandler = (newUsername: string) => {
    props.editUsername(newUsername);
    props.onClose();
  }
  
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={newUsernameValue} onInput={e => setNewUsernameValue(e.currentTarget.value)} placeholder='Enter new username'></Input>
          </ModalBody>

          <ModalFooter>
            <Flex w="full" flexDirection="row" justifyContent="space-between">
              <Button colorScheme='red' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button colorScheme='green' onClick={() => onCloseHandler(newUsernameValue)}>Change</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default EditUsernameModal;
