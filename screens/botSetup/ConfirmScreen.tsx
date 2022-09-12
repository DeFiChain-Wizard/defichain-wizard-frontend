import { View, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { getAddress, getConfig, setItem } from "../../utils/securestore";
import { Wallet, Seed } from "@defichainwizard/core";
import PasswordModal from "../../components/PasswordModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import { ERROR_MSG } from "../../constants/messages";
import ConfigSummary from "../../components/ConfigSummary";
import Container from "../../components/Container";

const ConfirmScreen = ({ navigation }) => {
  const [address, setAddress] = useState<any>();
  const [config, setConfig] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAddress().then((address) => setAddress(address));
    getConfig().then((config) => setConfig(config));
  }, []);

  const handleFinish = async () => {
    Keyboard.dismiss();
    if (address && password) {
      setModalVisible(false);
      setLoading(true);
      Keyboard.dismiss();
      setTimeout(async () => {
        const wallet = await Wallet.build(address);
        const mySeed = await Seed.getSeedFromEncryptedString();
        await wallet
          .sendTransaction(config, mySeed, password)
          .then(() => {
            setItem("isSetUp", "true").then(navigation.navigate("Internal"));
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
      <Title title="Confirm configuration" />
      {config && <ConfigSummary config={config} />}
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
