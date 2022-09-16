import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { getAddress, getConfig, getVaultId } from "../../utils/securestore";
import { Wallet } from "@defichainwizard/core";
import Container from "../../components/Container";
import { truncate } from "../../utils/helper";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";
import Dropdown from "../../components/Dropdown";

// formik
interface FormValues {
  vaultId: string;
}

// yup
const formValidationSchema = yup.object().shape({
  vaultId: yup.string().required("Vault is required").nullable(),
});

const VaultScreen = ({ navigation, route }) => {
  const [vaultId, setVaultId] = useState<any>();
  const [vaults, setVaults] = useState<any>();
  const [address, setAddress] = useState<string>();

  const initialValues: FormValues = { vaultId };

  useEffect(() => {
    const load = async () => {
      try {
        const address = await getAddress();
        setAddress(address);
        const config = await getConfig();
        config && setVaultId(config.vaultId);
      } catch (error) {
        alert(error);
      }
    };

    load();
  }, []);

  const getVaults = async () => {
    try {
      const wallet = await Wallet.build(address);
      let tmpVaults = [];
      const vaults = await wallet.getVaults();
      vaults.map((vault) =>
        tmpVaults.push({
          label: truncate(vault.vaultId, 16, "..."),
          value: vault.vaultId,
        })
      );
      setVaults(tmpVaults);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    address && getVaults();
  }, [address]);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfig();
      if (!config) return;

      const { vaultId } = config;
      vaultId && setVaultId(vaultId);
    };

    loadConfig();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const { vaultId } = values;
    navigation.navigate("Confirm", { ...route.params, vaultId });
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
              value={values.vaultId}
              onChange={(item) => setFieldValue("vaultId", item.value)}
              placeholder="Select Vault"
              searchPlaceholder="Search Vault"
              search={true}
            />
            {!!errors.vaultId && <ValidationError error={errors.vaultId} />}
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
