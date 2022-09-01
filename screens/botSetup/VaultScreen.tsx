import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { getAddress, getConfig, getVault, saveConfig, saveVault } from "../../utils/securestore";
import { CustomMessage, Wallet } from "@defichainwizard/core";
import Container from "../../components/Container";
import { truncate } from "../../utils/helper";
import { Dropdown } from "react-native-element-dropdown";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";

// formik
interface FormValues {
  vault: string;
}

// yup
const formValidationSchema = yup.object().shape({
  vault: yup.string()
    .required("Required").nullable()
});

const VaultScreen = ({ navigation }) => {
  const [vault, setVault] = useState<any>();
  const [vaults, setVaults] = useState<any>();
  const [address, setAddress] = useState<string>();
  const [isFocus, setIsFocus] = useState<any>();
  const [config, setConfig] = useState<CustomMessage>();

  const initialValues: FormValues = { vault };

  useEffect(() => {
    getAddress().then((address) => setAddress(address));
    getVault().then((vault) => setVault(vault));
  }, []);

  const getVaults = async () => {
    const wallet = await Wallet.build(address);
    let tmpVaults = []
    await wallet
      .getVaults()
      .then((vaults) => {
        vaults.map((vault) =>
          tmpVaults.push({ label: truncate(vault.vaultId, 22, "..."), value: vault.vaultId }))
        setVaults(tmpVaults)
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    if (address) getVaults();
  }, [address]);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfig();
      if (config) {
        setConfig(config);
        config.vaultId && setVault(config.vaultId);
      }
    };

    loadConfig();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const newConfig: CustomMessage = {
      ...config,
      vaultId: values.vault
    };

    saveConfig(newConfig).then(() => { navigation.navigate("Confirm") })
  };

  return (
    <Container>
      <Title title="Vault" />

      <Text className="text-white text-2xl">Bot is running with vault</Text>
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          handleNextButton(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, values, errors, setFieldValue }) => (
          <View>
            <Dropdown
              data={vaults}
              renderItem={(item) => (
                <Text
                  className={`${values.vault === item.value ? "text-black" : "text-white"
                    } p-4`}
                >
                  {item.label}
                </Text>
              )}
              className="border-b border-b-white h-12 px-3 mt-2"
              containerStyle={{
                backgroundColor: "#000000",
                borderWidth: 0,
                marginTop: 4,
              }}
              search={true}
              placeholderStyle={{
                color: "#838383",
                fontSize: 24,
                fontWeight: "600",
              }}
              selectedTextStyle={{
                color: "white",
                fontSize: 24,
                fontWeight: "600",
              }}
              inputSearchStyle={{ color: "white", borderWidth: 0 }}
              activeColor="white"
              maxHeight={350}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Vault" : "..."}
              searchPlaceholder="Search Vault..."
              value={values.vault}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => setFieldValue("vault", item.value)}
            />
            {errors.vault && (
              <ValidationError error={errors.vault} />
            )}
            <View className="flex flex-row justify-between mt-8">
              <Button
                label="Back"
                type="secondary"
                onPress={() => navigation.goBack()}
              />
              <Button label="Next step" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default VaultScreen;
