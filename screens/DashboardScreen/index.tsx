import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Seed, Wallet } from "@defichainwizard/core";
import { getAddress, getConfig, saveConfig } from "../../utils/securestore";
import PasswordModal from "../../components/PasswordModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import Container from "../../components/Container";
import { useFocusEffect } from "@react-navigation/native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import ScreenItem from "../../components/ScreenItem";
import { useWhaleApiClient } from "../../context/WhaleContext";
import { getDataFromDefichainIncome } from "../../utils/defichainIncome";
import Forecast from "./Forecast";
import { fetchDFIUSDPrice } from "../../utils/whale";
import { useAuthContext } from "../../context/AuthContext";
import { mapPauseToBoolean, portfolioValue } from "./utils";

const DashboardScreen = ({ navigation }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const [address, setAddress] = useState<string>("");
  const [config, setConfig] = useState<any>(null);
  const [defichainIncome, setDefichainIncome] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [unit, setUnit] = useState("dfi");
  const [dfiPrice, setDfiPrice] = useState<number>();

  const client = useWhaleApiClient();

  const loadConfig = useCallback(() => {
    const load = async () => {
      try {
        const address = await getAddress();
        setAddress(address);
        const config = await getConfig();
        setConfig(config);
      } catch (error) {
        alert(error);
      }
    };

    load();
  }, []);

  useFocusEffect(loadConfig);

  useEffect(() => {
    const handleDefiChainIncome = async () => {
      try {
        const data = await getDataFromDefichainIncome(address);
        setDefichainIncome(data);
      } catch (error) {
        alert(error);
      }
    };

    address && handleDefiChainIncome();
  }, [address]);

  useEffect(() => {
    const load = async () => {
      try {
        const price = await fetchDFIUSDPrice(client);
        setDfiPrice(price);
      } catch (error) {
        alert(error);
      }
    };

    load();
  }, []);

  const handleSleep = async () => {
    const newConfig = {
      ...config,
      pause: config.pause === 0 ? -1 : 0,
    };

    setModalVisible(false);
    setLoading(true);
    Keyboard.dismiss();

    try {
      const wallet = await Wallet.build(address);
      const seed = await Seed.getSeedFromEncryptedString();
      await wallet.sendTransaction(newConfig, seed, password);
      await saveConfig(newConfig);
      setConfig(newConfig);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const findLastConfig = async () => {
    const wallet = await Wallet.build(address);
    const seed = await Seed.getSeedFromEncryptedString();
    const encryptedSeed = await seed.asArray(password);
    const config = await wallet.findLastWizardConfiguration(encryptedSeed);
    return config;
  };

  const handleSync = async () => {
    if (address) {
      try {
        const config = await findLastConfig();
        setIsAuthenticated(true);
        setModalVisible(false);
        await saveConfig(config);
        setConfig(config);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
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
        {!config && (
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
          onConfirm={handleSleep}
          onChangePassword={setPassword}
        />
        <PasswordModal
          visible={!isAuthenticated && !!config}
          onCancel={setModalVisible}
          onConfirm={handleSync}
          onChangePassword={setPassword}
          showCancelButton={false}
          description="To resync the configuration please enter your password"
        />
      </View>
      {loading && <LoadingIndicator />}
    </Container>
  );
};

export default DashboardScreen;
