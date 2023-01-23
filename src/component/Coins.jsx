import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "..";
import Loader from "./Loader";

const Coins = () => {
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=${currency}&page=${pages}`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [pages, currency]);

  const changePage = (page) => {
    setPages(page);
    setLoading(true);
  };

  const btns = new Array(250).fill(1);
  if (error) return <div>Something went wrong while fetching the coins</div>;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr">₹ INR</Radio>
              <Radio value="usd">$ USD</Radio>
              <Radio value="eur">€ EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {Coins.map((exchange) => {
              return (
                <div key={exchange.id}>
                  <Coin
                    key={exchange.id}
                    id={exchange.id}
                    name={exchange.name}
                    img={exchange.image}
                    currencySymbol={currencySymbol}
                    rank={exchange.current_price}
                    short={exchange.symbol}
                  />
                </div>
              );
            })}
          </HStack>

          <HStack w={"full"} overflowX="auto" p="8">
            {btns.map((btn, idx) => {
              return (
                <Button key={idx} onClick={() => changePage(idx + 1)}>{idx + 1}</Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;

export const Coin = ({ id, name, img, rank, short, currencySymbol = "₹" }) => {
  return (
    <Link to={`coin-details/${id}`}>
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
          {name}
        </Heading>
        <Text noOfLines={1}>{short}</Text>
        <Text noOfLines={1}>{rank ? `${currencySymbol} ${rank}` : `NA`}</Text>
      </VStack>
    </Link>
  );
};
