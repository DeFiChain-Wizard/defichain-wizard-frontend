import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Seed, Wallet } from "@defichainwizard/core";
import {
  getAddress,
  getConfig,
  getItem,
  saveConfig,
} from "../../utils/securestore";
import PasswordModal from "../../components/PasswordModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import { ERROR_MSG } from "../../constants/messages";
import Container from "../../components/Container";
import { useFocusEffect } from "@react-navigation/native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import ScreenItem from "../../components/ScreenItem";
import { useWhaleApiClient } from "../../context/WhaleContext";
import { fetchDefichainIncome } from "../../utils/defichainIncome";
import Forecast from "./Forecast";
import { fetchDFIUSDPrice } from "../../utils/whale";
import { portfolioValue } from "../../utils/calc";

const DashboardScreen = ({ navigation }) => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<Number>();
  const [isSetUp, setIsSetUp] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [defichainIncome, setDefichainIncome] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [unit, setUnit] = useState("dfi");
  const [dfiPrice, setDfiPrice] = useState<number>();

  const client = useWhaleApiClient();

  const getBalance = async (address: string) => {
    const wallet = await Wallet.build(address);
    await wallet.getUTXOBalance().then((balance) => setBalance(balance));
  };

  const mapPauseToBoolean = (value: number) => {
    let state: boolean;
    if (value === 0) state = false;
    if (value === -1) state = true;
    return state;
  };

  const loadConfig = useCallback(() => {
    getAddress().then((address) => setAddress(address));
    getItem("isSetUp").then((isSetUp) => setIsSetUp(Boolean(isSetUp)));
    getConfig().then((config) => {
      setConfig(config);
    });
  }, []);

  useFocusEffect(loadConfig);

  useEffect(() => {
    if (address) getBalance(address);
  }, [address]);

  useEffect(() => {
    if (address)
      fetchDefichainIncome(address).then((data) => setDefichainIncome(data));
  }, [address]);

  useEffect(() => {
    fetchDFIUSDPrice(client).then((price) => setDfiPrice(price));
  }, []);

  const handleFinish = async () => {
    if (address && password && config) {
      const newConfig = {
        ...config,
        pause: config.pause === 0 ? -1 : 0,
      };

      setModalVisible(false);
      setLoading(true);
      Keyboard.dismiss();
      setTimeout(async () => {
        const wallet = await Wallet.build(address);
        const mySeed = await Seed.getSeedFromEncryptedString();
        await wallet
          .sendTransaction(newConfig, mySeed, password)
          .then(() => {
            saveConfig(newConfig).then(() => {
              setConfig(newConfig);
              setLoading(false);
            });
          })
          .catch(() => {
            setLoading(false);
            alert(ERROR_MSG);
          });
      }, 1000);
    }
  };

  return (
    <Container>
      <View className="flex-1">
        <Title title="Dashboard" />

        {/* portfolio */}
        <ScreenItem
          label={
            <View className="flex flex-row space-x-2 items-center">
              <Text className="text-xs font-semibold text-[#838383] uppercase">
                Portfolio
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (unit === "dfi") setUnit("usd");
                  if (unit === "usd") setUnit("dfi");
                }}
              >
                <View className="border border-[#838383] rounded-full px-1.5">
                  <Text className="text-[#838383] text-xs">
                    {unit === "usd" && "USD"}
                    {unit === "dfi" && "DFI"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          icon="chart-line-variant"
        >
          <View className="flex flex-row items-center space-x-2 justify-between">
            <Text className="text-white text-3xl">
              {defichainIncome
                ? portfolioValue(defichainIncome.totalValue, dfiPrice, unit)
                : "Loading..."}
            </Text>
          </View>
        </ScreenItem>

        {/* income */}
        <ScreenItem label="Income" icon="chart-bubble" className="mt-12">
          {defichainIncome ? (
            <Forecast data={defichainIncome} />
          ) : (
            <Text className="text-white text-3xl">Loading...</Text>
          )}
        </ScreenItem>

        {/* bot status */}
        {!!config && (
          <ScreenItem
            label="Bot Status"
            icon="toggle-switch"
            iconColor={mapPauseToBoolean(config.pause) ? "#F06666" : "#4ADE80"}
            className="mt-12"
          >
            <View className="flex flex-row justify-between">
              <Text className="text-white text-3xl">
                {!mapPauseToBoolean(config.pause) && "Running"}
                {mapPauseToBoolean(config.pause) && "Stopped"}
              </Text>
              <Button
                label={mapPauseToBoolean(config.pause) ? "Wake up" : "Sleep"}
                type={mapPauseToBoolean(config.pause) ? "primary" : "secondary"}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </ScreenItem>
        )}

        {/* show create bot button if not configured */}
        {!isSetUp && (
          <View className="flex-1 items-center justify-end mb-40 space-y-4">
            <Text className="text-[#838383]">You have not set up your bot</Text>
            <Button
              label="Setup bot"
              className=""
              onPress={() => navigation.navigate("Collateral")}
            />
          </View>
        )}
        <PasswordModal
          visible={modalVisible}
          onCancel={setModalVisible}
          onConfirm={handleFinish}
          onChangePassword={setPassword}
        />
      </View>
      {loading && <LoadingIndicator />}
    </Container>
  );
};

export default DashboardScreen;
