import { FC, useEffect, useState } from 'react';
import styles from './PokerGame.module.scss';
import camelcaseKeys from 'camelcase-keys';
import { emit, getColorByValue } from '../../../helpers';
import { SocketEvent } from '../../../models/SocketEvent';
import { User } from '../../../models/User';
import { Text, Box, Button, Center, Grid, GridItem, CircularProgress, CircularProgressLabel, useDisclosure, VStack } from '@chakra-ui/react';
import ValueCardList from '../ValueCardList/ValueCardList';
import { RoomState } from '../../../models/GameState';
import UserList from '../UserList/UserList';
import { interval, take } from 'rxjs';
import EditUsernameModal from '../EditUsernameModal/EditUsernameModal';
import ConfettiExplosion from 'react-confetti-explosion';


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
  const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [percentUsersSelected, setPercentUsersSelected] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExploding, setIsExploding] = useState(false);

  //"wss://planningpoker-server-dot-smoothwall-sandbox.nw.r.appspot.com/ws?user_id="
  //"ws://localhost:8080/ws?user_id="

  useEffect(() => {
    let ws = new WebSocket(import.meta.env.VITE_POKER_API_URL_WS + "/ws?user_id=" + props.self.id + "&roomcode=" + props.self.roomcode);
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
    setInvalidValue(state.invalidValue);

    let countUsersSelected = 0;
    for (let user of Object.values(state.users)) {
      if (user.valueSelected !== "") {
        countUsersSelected++;
      }
    }
    const percentageUsersSelected = (countUsersSelected / Object.values(state.users).length) * 100;
    setPercentUsersSelected(percentageUsersSelected);

    if (state.gameComplete && (state.decidedValue === 0 && state.invalidValue) || (state.gameComplete && state.decidedValue !== -1)) {
      let chosenValues = Object.values(state.users).map(x => x.valueSelected)
      chosenValues = chosenValues.filter(x => x !== "☕");
      let uniqueSet = new Set(chosenValues);
      startRevealSequence(state.decidedValue, uniqueSet.size === 1);
    } 
  }

  const startRevealSequence = (decidedValue: number, displayConfetti: boolean) => {
    let i = 3;
    interval(1000).pipe(take(4))
      .subscribe(() => {
        setDecidedValue(i);
        i--;
      }, () => { }, () => {
        setDecidedValue(decidedValue);
        setReveal(true);
        setIsExploding(displayConfetti);
      })
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
      <VStack w="full" h="full">
        <Center h="10%" w="full">
          <Text fontWeight="500" >You are currently in room - {props.self.roomcode}</Text>
        </Center>
        <Box h="90%" w="full">
        <Center width="full" height="100%"  borderRadius="5" padding="4">
        <Grid h={["400px", "600px"]} w="full" className={styles.gridContainer}>
          <GridItem className={styles.users}>
            <UserList users={users} shouldReveal={reveal} selfId={props.self.id} onOpenModalFunction={onOpen}></UserList>
          </GridItem>
          <GridItem className={styles.cards}>
            <Center h="full" w="full" ml="4">
              <ValueCardList isDisabled={decidedValue !== -1} selectValueFn={selectValue} selectedValue={selectedValue}></ValueCardList>
            </Center>
          </GridItem>
          <GridItem className={styles.result}>
            <Center w="full" h="full">
              {/* {decidedValue === -1 ?
                  // <Text position="relative" top="40px" fontSize="120px" fontWeight="500" color="#e3e3e3">?</Text> :
                  <CircularProgress className={reveal ? 'fade-out' : ''} mt="24" value={percentUsersSelected} size="64" color="#3fc59d" thickness="16px">
                    <CircularProgressLabel fontSize="120px" fontWeight="500" color="#e3e3e3">?</CircularProgressLabel>
                  </CircularProgress> :
                  <>
                    {invalidValue ? <Text position="relative" top="40px" fontSize="120px" fontWeight="500" color="#303030">?</Text> :
                      <Text position="relative" top="40px" fontSize="120px" fontWeight="500" color="#303030">{decidedValue}</Text>}
                  </>
                } */}
              <CircularProgress mt="24" value={percentUsersSelected} size="64" color={getColorByValue(percentUsersSelected)} trackColor="#f7f7f7" thickness="16px">
                {decidedValue === -1 ? <CircularProgressLabel fontSize="100px" fontWeight="500" color="#b3b3b3">?</CircularProgressLabel> :
                  <CircularProgressLabel>{invalidValue && reveal ? <Text fontSize="100px" fontWeight="500" color="#303030">?</Text> :
                    <>
                      <Text fontSize="100px" fontWeight="500" color={reveal ? "#303030" : '#b3b3b3'}>{decidedValue}</Text>
                    </>}
                  </CircularProgressLabel>}
              </CircularProgress>
              <Box position="relative" top="55px" right="130px">{isExploding && <ConfettiExplosion id="confetti" duration={3000} height={1500} width={1000}  />}</Box>
            </Center>
          </GridItem>
          <GridItem className={styles.startNewGame} >
            <Center h="full" w="full">
              {reveal ?
                <Button w="80%" h="60%" borderRadius="50px" bg="#6685ff" color="white" onClick={() => handleStartNewGameButtonClick()}>Start new game</Button> : ''
              }
            </Center>
          </GridItem>
        </Grid>
      </Center>
        </Box>
      </VStack>

      <EditUsernameModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} editUsername={editUsername}></EditUsernameModal>
    </>
  );
};

export default PokerGame;


