import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import bgSrc from '../assets/btc.png'
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w="full" h={"85vh"} >

      <Image
      w={"full"}
      h={"full"}
      objectFit="contain"
      src={bgSrc}
      ></Image>

      <Text
      fontSize={"6xl"}
      fontWeight={"thin"}
      color={"whiteAlpha.700"}
      textAlign={"center"}
      marginTop={"-20"}
      >Crypto Tracker</Text>

    </Box>
  )
}

export default Home
