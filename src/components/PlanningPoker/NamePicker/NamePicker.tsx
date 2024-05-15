import { FC, useEffect, useState } from 'react';
import styles from './NamePicker.module.scss';
import { Button, Center, HStack, Input, VStack } from '@chakra-ui/react';
import * as uuid from "uuid"
// import useActivePokerGameStore from '../../../stores/activePokerGameStore';

interface NamePickerProps {
  setSelf: Function
}

const NamePicker: FC<NamePickerProps> = (props: NamePickerProps) => {

  const [nameValue, setNameValue] = useState<string>("")
  const [roomcodeValue, setRoomcodeValue] = useState<string>("")
  // const [accessTokenFullName, setAccessTokenFullName] = useState<string>("");
  // const {activePokerGame, setActivePokerGame} = useActivePokerGameStore();

  useEffect(() => getUserDetails())

  const getUserDetails = () => {
    const tokenDetails = localStorage.getItem('accessTokenDetails')
    if (tokenDetails) {
      const tokenDetailsObj = JSON.parse(tokenDetails);
      setNameValue(tokenDetailsObj.given_name + " " + tokenDetailsObj.family_name);
      
    }
  }

  const initSelf = () => {
    const self = ({
      id: uuid.v4(),
      username: nameValue,
      roomcode: roomcodeValue,
      valueSelected: null
    })
    // setActivePokerGame();
    props.setSelf(self)
  }

  return (
    <div className={styles.NamePicker}>
    <Center>
      <VStack>
        <p>Enter details</p>
        <HStack>
          <p>Name: </p>
          <Input value={nameValue} onInput={e => setNameValue(e.currentTarget.value)}></Input>
        </HStack>
        <HStack>
          <p>Room: </p>
          <Input value={roomcodeValue} onInput={e => setRoomcodeValue(e.currentTarget.value.toLowerCase())}></Input>
        </HStack>
        
        <Button onClick={() => initSelf()} isDisabled={nameValue === "" || roomcodeValue === ""}>Go</Button>
      </VStack>
    </Center>
    </div>
  )
  
};

export default NamePicker;

