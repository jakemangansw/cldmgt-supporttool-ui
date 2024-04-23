import { FC, useState } from 'react';
import styles from './ValueCard.module.scss';
import { Text, Box, Center, VStack } from '@chakra-ui/react';

interface ValueCardProps {
  value: string;
  selectValueFn: Function,
  selectedValue: string;
  isDisabled: boolean
}

const ValueCard: FC<ValueCardProps> = (props: ValueCardProps) => {

  const [isHovered, setIsHovered] = useState(false);

  const selectedStyle = {
    borderColor: props.selectedValue === props.value ? "#005677" : "#cfcfcf",
    backgroundColor: props.selectedValue === props.value ? "#8db7c7" : "white",
  }

  const hoveredStyle = {
    borderColor: "#003c5a",
    backgroundColor: "white",
  }

  // const smallNumericSelectedStyle = {
  //   backgroundColor: props.selectedValue === props.value ? "#c2ceff" : "white",
  //   color: props.selectedValue === props.value ? "white" : "#bababa",
  // }

  const cardBackgroundSelectedStyle = {
    backgroundColor: props.selectedValue === props.value ? "#005677" : "#f5f5f5",
  }

  const cardTextSelectedStyle = {
    color: props.selectedValue === props.value ? "white" : "#383838",
  }

  return (
    <div className={styles.ValueCard}>
      <Box opacity={props.isDisabled ? '0.6' : 1} pointerEvents={props.isDisabled ? "none" : "all" }>
        <Center
          style={isHovered && props.selectedValue !== props.value ? hoveredStyle : selectedStyle}
          className="cascade-hover"
          border="4px"
          bg="white"
          borderRadius="5px"
          height="24"
          width="16"
          _hover={{ borderColor: "#6685ff", cursor: "pointer" }}
          onClick={() => props.selectValueFn(props.value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* <Text fontSize="25px" fontWeight="500" color="#5e5e5e" borderRadius="6px">{props.value}</Text> */}
          <Center h="75%" w="75%" borderRadius="5px" style={cardBackgroundSelectedStyle}>
            <VStack h="full" w="full" justifyContent="space-between" position="relative" top="-8px">
              {/* <Center style={smallNumericSelectedStyle} fontWeight="500" w="18px" h="18px" borderRadius="20px" position="relative" top="0px" left="-18px">{props.value}</Center> */}
              <Text style={cardTextSelectedStyle} fontSize="28px" fontWeight="500" position="relative" top="18px">{props.value}</Text>
              {/* <Center style={smallNumericSelectedStyle} fontWeight="500" color="#bababa" w="18px" h="18px" borderRadius="20px" position="relative" top="-12px" left="18px" transform="rotate(0.5turn); translateX(10px)">{props.value}</Center> */}
            </VStack>
          </Center>

        </Center>
      </Box>

    </div>
  );


};

export default ValueCard;
