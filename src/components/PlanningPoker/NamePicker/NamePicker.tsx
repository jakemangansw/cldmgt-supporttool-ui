import { FC, useState } from 'react';
import styles from './NamePicker.module.scss';
import { Button, Center, HStack, Input, VStack } from '@chakra-ui/react';
import * as uuid from "uuid"

interface NamePickerProps {
  setSelf: Function
}

const NamePicker: FC<NamePickerProps> = (props: NamePickerProps) => {

  const [nameValue, setNameValue] = useState<string>("")
  const [roomcodeValue, setRoomcodeValue] = useState<string>("")

  const initSelf = () => {
    const self = ({
      id: uuid.v4(),
      username: nameValue,
      roomcode: roomcodeValue,
      valueSelected: null
    })
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
          <Input value={roomcodeValue} onInput={e => setRoomcodeValue(e.currentTarget.value)}></Input>
        </HStack>
        
        <Button onClick={() => initSelf()}>Go</Button>
      </VStack>
    </Center>
    </div>
  )
  
};

export default NamePicker;
