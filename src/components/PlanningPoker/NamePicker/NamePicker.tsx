import { Box, Button, Center, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";

import { useQuery } from 'react-query';
import * as uuid from "uuid";
import { BasicRoomInfo } from '../../../models/BasicRoomInfo';
import { getPokerRooms } from '../../../services/poker.service';
import styles from './NamePicker.module.scss';
// import useActivePokerGameStore from '../../../stores/activePokerGameStore';

interface NamePickerProps {
  setSelf: Function
}

const NamePicker: FC<NamePickerProps> = (props: NamePickerProps) => {

  const [nameValue, setNameValue] = useState<string>("")
  const [roomcodeValue, setRoomcodeValue] = useState<string>("")

  const { data } = useQuery('getRooms', async (): Promise<BasicRoomInfo[]> => {
    return await getPokerRooms();
  })

  // const [accessTokenFullName, setAccessTokenFullName] = useState<string>("");
  // const {activePokerGame, setActivePokerGame} = useActivePokerGameStore();

  useEffect(() => getUserDetails(), [])

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

  const onCardClick = (roomCode: string) => {
    const self = ({
      id: uuid.v4(),
      username: nameValue,
      roomcode: roomCode,
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

          {data?.length ? <HStack mt="4">
            {data.map(roomInfo => <Box cursor="pointer" bgColor="white" borderRadius={5} minWidth="24" padding={2} border="1px solid #e3e3e3" _hover={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;" }} onClick={() => onCardClick(roomInfo.roomName)}>
              <HStack justifyContent="space-between" w="full">
                <Text fontSize="20" >{roomInfo.roomName}</Text>
                <Box borderRadius={50} w="2" h="2" mr="1" ml="2" bgColor="#53b078" className={styles.pulse}></Box>
              </HStack>
              <HStack>
                <FaUser></FaUser>
                <Text>{roomInfo.playerCount}</Text>
              </HStack>
            </Box>)}
          </HStack> : <></>}
        </VStack>
      </Center>
    </div>
  )

};

export default NamePicker;

