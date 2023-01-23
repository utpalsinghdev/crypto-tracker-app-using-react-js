import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      w="full"
      minH={"24"}
      px={"16"}
      py={["16", "8"]}
      color={"whiteAlpha.700"}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={"center"}>
          <Text fontSize={"xl"} textAlign="center" fontWeight={"bold"}>
            &copy; Copyright {new Date().getFullYear()} By{" "}
            <Text color={"red"}>
              <Link>Utpal Singh</Link>
            </Text>
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
