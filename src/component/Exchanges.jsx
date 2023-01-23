import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "..";
import {
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/exchanges?pages=1&perPage=250`
        );
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchExchanges();
  }, []);
  if (error) return <div>Something went wrong</div>;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
            {exchanges.map((exchange) => {
              return (
                <div key={exchange.id}>
                  <ExchangeCard
                    key={exchange.id}
                    name={exchange.name}
                    img={exchange.image}
                    url={exchange.url}
                    rank={exchange.trust_score_rank}
                  />
                </div>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;

export const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target="_blank">
      <VStack
        w={52}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={4}
        css={{
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "2xl",
          },
        }}
      >
        <Image src={img} w={10} objectFit={"contain"} alt="exchanges" />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};
