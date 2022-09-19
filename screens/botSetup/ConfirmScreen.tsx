import { View, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { getAddress, saveConfig } from "../../utils/securestore";
import { Wallet, Seed } from "@defichainwizard/core";
import PasswordModal from "../../components/PasswordModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import ConfigSummary from "../../components/ConfigSummary";
import Container from "../../components/Container";
import { useAuthContext } from "../../context/AuthContext";

const ConfirmScreen = ({ navigation, route }) => {
  const { setIsAuthenticated } = useAuthContext();
  const [address, setAddress] = useState<any>();
  const [config, setConfig] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const address = await getAddress();
        setAddress(address);
        const newConfig = {
          ...route.params,
          pause: 0,
          version: "1.0",
        };
        setConfig(newConfig);
      } catch (error) {
        alert(error);
      }
    };

    load();
  }, []);

  const handleFinish = async () => {
    setModalVisible(false);
    setLoading(true);
    Keyboard.dismiss();

    try {
      const wallet = await Wallet.build(address);
      const seed = await Seed.getSeedFromEncryptedString();
      await wallet.sendTransaction(config, seed, password);
      await saveConfig(config);
      setIsAuthenticated(true);
      navigation.navigate("Internal");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <Container>
      <Title title="Confirm configuration" />
      {!!config && <ConfigSummary config={config} />}
      <View className="flex flex-row justify-between mt-8">
        <Button
          label="Back"
          type="secondary"
          onPress={() => navigation.goBack()}
        />
        <Button
          label="Send config"
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <PasswordModal
        visible={modalVisible}
        onCancel={setModalVisible}
        onConfirm={handleFinish}
        onChangePassword={setPassword}
      />
      {loading && <LoadingIndicator />}
    </Container>
  );
};

export default ConfirmScreen;
