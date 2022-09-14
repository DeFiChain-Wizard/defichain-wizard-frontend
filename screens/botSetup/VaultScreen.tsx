import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import {
  getAddress,
  getConfig,
  getVault,
  saveConfig,
  saveVault,
} from "../../utils/securestore";
import { CustomMessage, Wallet } from "@defichainwizard/core";
import Container from "../../components/Container";
import { truncate } from "../../utils/helper";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";
import Dropdown from "../../components/Dropdown";

// formik
interface FormValues {
  vault: string;
}

// yup
const formValidationSchema = yup.object().shape({
  vault: yup.string().required("Vault is required").nullable(),
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
    let tmpVaults = [];
    await wallet
      .getVaults()
      .then((vaults) => {
        vaults.map((vault) =>
          tmpVaults.push({
            label: truncate(vault.vaultId, 16, "..."),
            value: vault.vaultId,
          })
        );
        setVaults(tmpVaults);
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
      vaultId: values.vault,
    };

    saveConfig(newConfig).then(() => {
      navigation.navigate("Confirm");
    });
  };

  return (
    <Container>
      <Title title="Vault" />

      <Text className="text-white text-2xl mb-4">
        Bot is running with vault
      </Text>
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
              value={values.vault}
              onChange={(item) => setFieldValue("vault", item.value)}
              placeholder="Select Vault"
              searchPlaceholder="Search Vault"
              search={true}
            />
            {!!errors.vault && <ValidationError error={errors.vault} />}
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
