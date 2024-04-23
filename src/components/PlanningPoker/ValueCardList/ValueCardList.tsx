import { FC } from 'react';
import ValueCard from '../ValueCard/ValueCard';
import { Box, Center, Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';

interface ValueCardListProps {
  selectValueFn: Function;
  isDisabled: boolean;
  selectedValue: string;
}

const ValueCardList: FC<ValueCardListProps> = (props: ValueCardListProps) => (
  // <HStack h="full" py="8">
  //   <Flex h="100%" flexWrap="wrap" w={["100%", "100%", "70%"]} justifyContent="center" rowGap="10px">
  //     <ValueCard value={'0'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'1'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'2'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'3'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'5'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'8'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'13'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'21'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'34'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'55'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'89'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //     <ValueCard value={'?'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //   </Flex>
  //   <Box>
  //    <ValueCard value={'☕'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  //   </Box>
  // </HStack>

  <VStack w="full" h="full">
    <Grid w="60%" h="full" templateColumns={"1fr 1fr 1fr 1fr"} templateRows={"1fr 1fr 1fr"} autoColumns={"1fr 1fr 1fr"}>
    <GridItem>
      <ValueCard value={'0'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'1'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'2'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'3'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'5'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'8'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'13'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'21'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'34'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'55'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'89'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
    <GridItem>
      <ValueCard value={'?'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
    </GridItem>
  </Grid>
  <Center w="full">
      <ValueCard value={'☕'} isDisabled={props.isDisabled} selectValueFn={props.selectValueFn} selectedValue={props.selectedValue}></ValueCard>
  </Center>
  </VStack>
);

export default ValueCardList;
