import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "..";
import Chart from "./Chart";
import Loader from "./Loader";

const CoinDetails = () => {
  const { id } = useParams();
  const [Coin, setCoin] = useState({});
  const [days, setDays] = useState("24h");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [chartArray, setChartArray] = useState([]);
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";
  const btns = ["24h", "7d", "14d", "30d", "60d", "365d", "1825d", "max"];
  const FetchCoin = async () => {
    try {
      const { data } = await axios.get(`${server}/coins/${id}`);

      const { data: chartData } = await axios.get(
        `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setCoin(data);
      setChartArray(chartData.prices);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    FetchCoin();
  }, [id, days, currency]);

  if (error) return <div>Something went wrong while fetching the coin</div>;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={1}>
            <Chart price={Coin.market_data.current_price[currency]} arr={chartArray} days={days} currency={currencySymbol} />
          </Box>
          <HStack marginTop={4} spacing={4} overflowX={"auto"}>
            {btns.map((btn) => (
              <Button
                key={btn}
                onClick={() => setDays(btn)}
                colorScheme={btn === days ? "green" : "gray"}
                cursor="pointer"
                css={{
                  padding: "24px",
                }}
              >
                {btn}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr">₹ INR</Radio>
              <Radio value="usd">$ USD</Radio>
              <Radio value="eur">€ EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={4} p={16} alignItems="flex-start">
            <Text fontSize={"small"} alignSelf={"center"} opacity="0.7">
              Last Updated on{" "}
              {moment(Coin.market_data.last_updated).startOf("hour").fromNow()}
            </Text>

            <Image src={Coin.image.large} w={16} h={16} objectFit="contain" />

            <Stat>
              <StatLabel>{Coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {Coin.market_data.current_price[currency]}
              </StatNumber>

              <StatHelpText>
                <StatArrow
                  type={
                    Coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {Coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color="white">
              #{Coin.market_data.market_cap_rank}
            </Badge>
            <CustomBar
              high={`${currency} ${Coin.market_data.high_24h[currency]}`}
              low={`${currency} ${Coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p="4">
              <Item title={"max supply"} value={Coin.market_data.max_supply} />
              <Item
                title={"Circulating supply"}
                value={Coin.market_data.circulating_supply}
              />
              <Item
                title={"Market cap"}
                value={`${currencySymbol} ${Coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All time Low"}
                value={`${currencySymbol} ${Coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All time High"}
                value={`${currencySymbol} ${Coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w="full" />
      <HStack w={"full"} justifyContent={"space-between"}>
        <Badge children={low} colorScheme={"red"} />
        <Text>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
