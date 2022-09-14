import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useWhaleApiClient } from "../../context/WhaleContext";
import { fetchLoanTokens } from "../../utils/whale";
import { getConfig, saveConfig } from "../../utils/securestore";
import Container from "../../components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";
import Dropdown from "../../components/Dropdown";
import { CustomMessage } from "../../types/CustomMessage";

// formik
interface FormValues {
  selectedLoanToken: string;
}

// yup
const formValidationSchema = yup.object().shape({
  selectedLoanToken: yup.string().required("Mint token is required"),
});

const LiquidityPoolScreen = ({ navigation }) => {
  const [loanToken, setLoanToken] = useState<any>();
  const [selectedLoanToken, setSelectedLoanToken] = useState<any>();
  const [config, setConfig] = useState<CustomMessage>();

  const client = useWhaleApiClient();

  const initialValues: FormValues = { selectedLoanToken };

  const loadLoanTokens = async () => {
    const tokens = await fetchLoanTokens(client);
    setLoanToken(tokens);
  };

  const loadConfig = async () => {
    const config = await getConfig();
    if (config) {
      setConfig(config);
      setSelectedLoanToken(Object.keys(config.poolpairs)[0]);
    }
  };

  useEffect(() => {
    loadConfig();
    loadLoanTokens();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const newConfig: CustomMessage = {
      ...config,
      poolpairs: {
        [values.selectedLoanToken]: 100,
      },
    };

    saveConfig(newConfig).then(() => {
      navigation.navigate("Compounding");
    });
  };

  return (
    <Container>
      <Title title="Liquidity Pool" />

      <Text className="text-white text-2xl mb-4">The minted token is</Text>
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
              data={loanToken}
              value={values.selectedLoanToken}
              onChange={(item) =>
                setFieldValue("selectedLoanToken", item.value)
              }
              placeholder="Select Token"
              searchPlaceholder="Search Token"
              search={true}
              hasError={errors.selectedLoanToken && true}
            />
            {!!errors.selectedLoanToken && (
              <ValidationError error={errors.selectedLoanToken} />
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

export default LiquidityPoolScreen;
