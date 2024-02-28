import { FC, useEffect, useState } from 'react';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { BiMenu } from "react-icons/bi"

interface NavbarProps {
  signOutFn: () => void;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {

  const [iconInitials, setIconInitials] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userFullname, setUserFullname] = useState<string>("");
  const [userGivenName, setUserGivenName] = useState<string>("");

  useEffect(() => getIconDetails())

  const getIconDetails = () => {
    const tokenDetails = localStorage.getItem('accessTokenDetails')
    if (tokenDetails) {
      const tokenDetailsObj = JSON.parse(tokenDetails);
      const initials = tokenDetailsObj.given_name[0] + tokenDetailsObj.family_name[0];
      setIconInitials(initials);
      setUserEmail(tokenDetailsObj.email);
      setUserFullname(tokenDetailsObj.given_name + " " + tokenDetailsObj.family_name);
      setUserGivenName(tokenDetailsObj.given_name);
    }
  }

  const signOutClickHandler = () => {
    setIconInitials("");
    setUserEmail("");
    setUserFullname("");
    props.signOutFn();
  }

  return <Flex direction="row" w="full" h="full" bg="#00bbb4" boxShadow="rgba(0,0,0,.2) 0 1px 3px" borderBottom="1px solid rgba(0,0,0,.1)">
    <Flex w="25%" h="full">
      <Flex w="full" h="full" justifyContent="space-between">
        <Flex w="full" h="full" alignItems="center">
          <Box ml="6"><BiMenu color="white" size="30"></BiMenu></Box>
          <Flex ml="6" flexDirection="column">
            <Text color="white" fontSize="24" fontWeight="500">smoothwall</Text>
            <Text color="white" fontSize="10" align="end" position="relative" top="-7px">by smoothwall</Text>
          </Flex>
          <Breadcrumb ml="12" color="white">
            <BreadcrumbItem>
              <BreadcrumbLink>Breadcrumbs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Are</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>TBC</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Flex>
    </Flex>
    <Flex w="50%" h="full" justifyContent="center" alignItems="center">
      <Text color="white" fontSize="18" fontWeight="500">Welcome back, {userGivenName}!</Text>
    </Flex>
    <Flex w="25%" h="full" justifyContent="flex-end">
      <Flex h="full" alignItems="center">
        {!!iconInitials ?
          <Menu autoSelect={false}>
            <MenuButton bg="#e0ebef" w="8" h="8" fontSize="14" borderRadius="100" mr="8" boxShadow="0 1px 3px #0003" color="rgb(26, 103, 133)">
              {iconInitials}
            </MenuButton>
            <MenuList>
              <MenuItem w="300px" h="50px">
                <Flex flexDirection="column" w="full">
                  <Text>{userFullname}</Text>
                  <Text fontSize="11px">({userEmail})</Text>
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem _hover={{ backgroundColor: "white" }}>
                <Button w="full" bg="#00bbb4" color="white" _hover={{ backgroundColor: "#006f6b" }} onClick={() => signOutClickHandler()}>Sign out</Button>
              </MenuItem>

            </MenuList>
          </Menu> : <></>}
      </Flex>
    </Flex>
  </Flex>
}

export default Navbar;
