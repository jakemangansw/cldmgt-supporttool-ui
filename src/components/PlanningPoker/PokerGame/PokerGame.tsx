import { FC, useEffect, useState } from 'react';
import styles from './PokerGame.module.scss';
import camelcaseKeys from 'camelcase-keys';
import { emit } from '../../../helpers';
import { SocketEvent } from '../../../models/SocketEvent';
import { User } from '../../../models/User';
import { Text, Box, Button, Center, useDisclosure, VStack, Flex, HStack } from '@chakra-ui/react';
import ValueCardList from '../ValueCardList/ValueCardList';
import { RoomState } from '../../../models/GameState';
import UserList from '../UserList/UserList';
import { interval, take } from 'rxjs';
import EditUsernameModal from '../EditUsernameModal/EditUsernameModal';
import ConfettiExplosion from 'react-confetti-explosion';
import { SlPresent } from "react-icons/sl";
import { FaGear } from "react-icons/fa6";
import { BiSolidDoorOpen } from "react-icons/bi";



interface PokerGameProps {
  self: User,
  setSelf: Function
}

const PokerGame: FC<PokerGameProps> = (props: PokerGameProps) => {

  const [users, setUsers] = useState<User[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [decidedValue, setDecidedValue] = useState<number>(-1);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [reveal, setReveal] = useState<boolean>(false);
  // const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [percentUsersSelected, setPercentUsersSelected] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExploding, setIsExploding] = useState(false);
  const [isNudgeBox, setNudgeBox] = useState(false);
  const [isShakeBox, setShakeBox] = useState(false);

  //"wss://planningpoker-server-dot-smoothwall-sandbox.nw.r.appspot.com/ws?user_id="
  //"ws://localhost:8080/ws?user_id="

  useEffect(() => {
    let ws = new WebSocket(import.meta.env.VITE_POKER_API_URL_WS + "/api/poker/ws?user_id=" + props.self.id + "&roomcode=" + props.self.roomcode);
    setWs(ws)

    ws.onopen = () => {
      emit(ws, "user-state", props.self)
    }

    ws.onmessage = (evt) => {
      let eventObj: SocketEvent = JSON.parse(evt.data)
      eventObj = camelcaseKeys(eventObj as any)

      switch (eventObj.eventType) {
        case "update-room-state":
          handleUpdateRoomState(camelcaseKeys(eventObj.data, { deep: true }))
          return;
        case "start-new-game":
          handleStartNewGame()
          return;
      }
    }
  }, [])

  const handleUpdateRoomState = (state: RoomState) => {
    console.log("Set room state: ", state);
    setUsers(Object.values(state.users))
    // setInvalidValue(state.invalidValue);

    let countUsersSelected = 0;
    for (let user of Object.values(state.users)) {
      if (user.valueSelected !== "") {
        countUsersSelected++;
      }
    }
    const percentageUsersSelected = (countUsersSelected / Object.values(state.users).length) * 100;
    setPercentUsersSelected(percentageUsersSelected);
    nudgeBox();

    if (state.gameComplete && (state.decidedValue === 0 && state.invalidValue) || (state.gameComplete && state.decidedValue !== -1)) {
      let chosenValues = Object.values(state.users).map(x => x.valueSelected)
      chosenValues = chosenValues.filter(x => x !== "☕");
      let uniqueSet = new Set(chosenValues);
      startRevealSequence(state.decidedValue, uniqueSet.size === 1);
    }
  }

  const startRevealSequence = (decidedValue: number, displayConfetti: boolean) => {
    // let i = 3;
    setShakeBox(true);
    interval(1000).pipe(take(3))
      .subscribe(() => {
        // setDecidedValue(i);
        // i--;

      }, () => { }, () => {
        setDecidedValue(decidedValue);
        setReveal(true);
        setIsExploding(displayConfetti);
        setShakeBox(false);
      })
  }

  const nudgeBox = () => {
    setNudgeBox(true);
    setTimeout(() => setNudgeBox(false), 500);
  }


  const handleStartNewGame = () => {
    setDecidedValue(-1);
    setSelectedValue("");
    setReveal(false);
    setIsExploding(false)
  }

  const selectValue = (value: string) => {
    setSelectedValue(value);
    let updatedSelf = { ...props.self }
    updatedSelf.valueSelected = value
    props.setSelf(updatedSelf)
    emit(ws!, "user-state", updatedSelf)
  }

  const handleStartNewGameButtonClick = () => {
    emit(ws!, "start-new-game", null)
  }

  const editUsername = (newUsername: string) => {
    const newSelf: User = {
      id: props.self.id,
      roomcode: props.self.roomcode,
      username: newUsername,
      valueSelected: props.self.valueSelected
    }
    props.setSelf(newSelf)
    emit(ws!, "user-state", newSelf);
  }

  return (
    <>
      <Flex flexDirection={'column'} w="full" h="full" >
        <Box w="full" h="2%">
          <Box id="selectedProgressbar" w="full" h="4" transition="width 0.5s" width={percentUsersSelected + "%"} bgColor="#01506e"></Box>
        </Box>
        <Flex w="full" flexDirection={"row"} h="20%" padding="4">
          <HStack w="full" h="full">
            <Box w="85%" h="full">
              <UserList users={users} shouldReveal={reveal} selfId={props.self.id} onOpenModalFunction={onOpen}></UserList>
            </Box>
            <HStack w="15%" h="full" alignItems="start" justifyContent="center">
              <VStack w="full" h="full" alignItems="end">
                <Flex w="full" justifyContent={"flex-end"}>
                  <Button bgColor="#d3d6db" w="25%" mr="2"><FaGear size="25"></FaGear></Button>
                  <Button bgColor="#d3d6db" w="25%"><BiSolidDoorOpen size="25"></BiSolidDoorOpen></Button>
                </Flex>
                <Button bgColor="#d3d6db"><Text color="#4d4d4d" mr="2" fontSize="12px">Room</Text><Text color="#4d4d4d" fontSize="20px" fontWeight="500">{props.self.roomcode}</Text></Button>

              </VStack>


            </HStack>

          </HStack>

        </Flex>
        <Box w="full" h="55%">
          <Center w="full" h="full" flexDir={"column"}>
            {decidedValue === -1 ? <SlPresent size="150" color="#b3b3b3" className={`${isNudgeBox ? styles.nudgeBox : ''} ${isShakeBox ? styles.shakeBox : ''}`}></SlPresent> : <Text position="relative" top="1px" fontSize="100px" fontWeight="500" color={reveal ? "#303030" : '#b3b3b3'}>{decidedValue}</Text>}

            {reveal ?
              <Button mt="4" w="40" h="12" bg="#00bbb4" border="3px solid rgb(0, 78, 55)" color="white" onClick={() => handleStartNewGameButtonClick()}>Start new game</Button> : ''
            }
            <Box position="relative" top="-110px" right="-4px">{isExploding && <ConfettiExplosion id="confetti" duration={3000} height={1500} width={1000} />}</Box>
          </Center>
          
        </Box>
        <Box w="full" h="20%">
          <ValueCardList isDisabled={decidedValue !== -1} selectValueFn={selectValue} selectedValue={selectedValue}></ValueCardList>
        </Box>

      </Flex>
      <EditUsernameModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} editUsername={editUsername}></EditUsernameModal>
    </>
  );
};

export default PokerGame;


