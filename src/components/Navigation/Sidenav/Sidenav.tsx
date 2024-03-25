import { FC, useState } from 'react';
import styles from './Sidenav.module.scss';
import { Box, Center, Flex, List, ListItem } from '@chakra-ui/react';
import { SidebarItem } from '../../../models/SidebarItem';
import { FaQuestion, FaRocket, FaUser, FaUserEdit } from "react-icons/fa"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';

interface SidenavProps { }

const Sidenav: FC<SidenavProps> = () => {
  const sidebarItems: SidebarItem[] = [
    {
      icon: "CgCardHearts",
      label: "Planning poker",
      path: "poker"
    },
    {
      icon: "FaUserEdit",
      label: "User Management",
      path: "admin/user-management"
    },
    // {
    //   icon: "FaUser",
    //   label: "Account Information",
    //   path: "account"
    // }
  ]

  const [isWide, setIsWide] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();

  const expandHandler = () => {
    setIsWide(!isWide)
  }

  const handleItemClick = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  const dynamicIcon = (iconName: string) => {
    switch (iconName) {
      case "CgCardHearts":
        return <FaRocket size="20"></FaRocket>
        case "FaUser":
        return <FaUser size="20"></FaUser>
        case "FaUserEdit":
          return <FaUserEdit size="20"></FaUserEdit>
      default:
        return <FaQuestion size="20"></FaQuestion>
    }
  }

  return <>
    <Box w={isWide ? "75px" : "250px"} bg="#005677" h="full" transition="width 0.5s">
      <Flex h="full" justifyContent="space-between" flexDirection="column">
        <Flex w="full" minHeight="56px" alignItems="center">
          <Box w={isWide ? "75px" : "250px"} h="full" transition="width 0.5s" overflow="hidden" whiteSpace="nowrap" bg="#01506e" borderBottom="2px solid #003c5a">
            <Box display="inline-block" w="75px" color="white" h="full">
              <Flex w="full" h="full" position="relative" alignItems="center" justifyContent="center">
                <Box transform={isWide ? "translate(0px)" : "translate(-100px)"} transition="transform 0.5s" display="inline-block" id="icon" fontWeight="500" fontSize="14px">CM</Box>
              </Flex>
            </Box>
            <Box display="inline-block" h="full" w="175px" color="white" fontSize="14px" fontWeight="500">
              <Flex transform={isWide ? "translate(50px)" : "translate(-50px)"} transition="transform 0.5s" w="full" h="full" alignItems="center">CM Diagnostics</Flex>
            </Box>
          </Box>
        </Flex>
        <List flexGrow="1">
          {sidebarItems.map((item, index) =>
            <ListItem h="56px" cursor="pointer" onClick={() => handleItemClick(index, item.path)} className={index === activeIndex ? styles.active : styles.notActive}>
              <Box w={isWide ? "75px" : "250px"} h="full" transition="width 0.5s" overflow="hidden" whiteSpace="nowrap">
                <Box display="inline-block" w="75px" color="white" h="full">
                  <Flex w="full" h="full" position="relative" left="-5px" alignItems="center" justifyContent="center">
                    <Box display="inline-block" id="icon">{dynamicIcon(item.icon)}</Box>
                  </Flex>
                </Box>
                <Box display="inline-block" h="full" w="175px" color="white" fontSize="14px" position="relative" top="-5px" fontWeight="500">
                  <Flex w="full" h="full" alignItems="center">{item.label}</Flex>
                </Box>
              </Box>
            </ListItem>)}
        </List>
        <Flex minHeight="56px" w="full" bg="#01506e" borderTop="2px solid #003c5a" alignItems="center">
          <Center onClick={() => expandHandler()} w="75px" h="56px" pl="6" bg="transparent" color="white" cursor="pointer" justifyContent="flex-start">
            {isWide ? <BiChevronRight size="30"></BiChevronRight> : <BiChevronLeft size="30"></BiChevronLeft>}
          </Center>
        </Flex>

      </Flex>

    </Box>
    {/* <Drawer isOpen={true} onClose={() => { }}>
    </Drawer> */}
  </>
}

export default Sidenav;
