import { FC, useState } from 'react';
import PokerGame from '../../../PlanningPoker/PokerGame/PokerGame';
import NamePicker from '../../../PlanningPoker/NamePicker/NamePicker';
import { User } from '../../../../models/User';
import { Center } from '@chakra-ui/react';

interface PokerGameRouteProps { }

const PokerGameRoute: FC<PokerGameRouteProps> = () => {
  const [self, setSelf] = useState<User>();

  return <>
    <Center w="full" h="full">
      {!self && <NamePicker setSelf={setSelf}></NamePicker>}
      {self && <PokerGame self={self} setSelf={setSelf}></PokerGame>}
    </Center>
  </>
};

export default PokerGameRoute;
