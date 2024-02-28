import { FC } from 'react';
import { Text, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import CustomGoogleLogin from '../CustomGoogleLogin/CustomGoogleLogin';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onOpen: Function;
  onClose: () => void;
  onLoginCallback: () => void
}

const GoogleLoginModal: FC<GoogleLoginModalProps> = (props: GoogleLoginModalProps) => {
  const onCloseHandler = () => {
    props.onLoginCallback();
    props.onClose();
  }

  return <>
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent h="180px">
        <ModalHeader>Login with Google</ModalHeader>
        <ModalBody>
          <Flex w="full" flexDirection="column" justifyContent="center">
            <Text fontSize="14px" mb="4">You are not logged in. Please login with Google to continue.</Text>
            <CustomGoogleLogin onCloseHandler={onCloseHandler}></CustomGoogleLogin>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
}

export default GoogleLoginModal;
