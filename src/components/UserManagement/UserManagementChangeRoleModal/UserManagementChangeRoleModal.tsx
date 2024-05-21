import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import { FC, useState } from 'react';

interface UserManagementChangeRoleModalProps {
  isOpen: boolean;
  onOpen: Function;
  onClose: () => void;
  updateRole: Function;
  userToUpdate: string;
  // updateRole: (roleAsInt: number) => void;
}

const UserManagementChangeRoleModal: FC<UserManagementChangeRoleModalProps> = (props: UserManagementChangeRoleModalProps) => {

  const [selectedRole, setSelectedRole] = useState<number>(-1);

  const onCloseHandler = () => {
    console.log(props.updateRole);

    //How to type the mutationFn so this prop is typed 
    props.updateRole({
      email: props.userToUpdate,
      roleAsString: selectedRole
    });
    props.onClose();
  }

  return <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Change role for {props.userToUpdate}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Select placeholder="Select new role" value={selectedRole} onChange={(e: any) => setSelectedRole(e.target.value)}>
          <option value={0}>CLDMGT Team member</option>
          <option value={1}>3rd Line Support</option>
          <option value={2}>Support</option>
        </Select>
      </ModalBody>

      <ModalFooter>
        <Flex w="full" flexDirection="row" justifyContent="space-between">
          <Button colorScheme='red' mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button colorScheme='green' isDisabled={selectedRole === -1} onClick={() => onCloseHandler()}>Change</Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default UserManagementChangeRoleModal;
