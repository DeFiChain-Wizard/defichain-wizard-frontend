import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useWhaleApiClient } from "../../context/WhaleContext";
import { fetchLoanTokens } from "../../utils/whale";
import { Dropdown } from "react-native-element-dropdown";
import { getConfig, saveConfig } from "../../utils/securestore";
import { CustomMessage } from "@defichainwizard/core";
import Container from "../../components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";

// formik
interface FormValues {
  poolPair: string;
}

// yup
const formValidationSchema = yup.object().shape({
  poolPair: yup.string()
    .required("Required")
});

const LiquidityPoolScreen = ({ navigation }) => {
  const [loanToken, setLoanTokens] = useState<any>();
  const [poolPair, setPoolPair] = useState<any>();
  const [config, setConfig] = useState<CustomMessage>();

  const [isFocus, setIsFocus] = useState<any>();
  const client = useWhaleApiClient();

  const initialValues: FormValues = { poolPair };

  useEffect(() => {
    fetchLoanTokens(client).then((tokens) => {
      setLoanTokens(tokens);
    });
  }, []);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfig();
      if (config) {
        setConfig(config);
        setPoolPair(Object.keys(config.poolpairs)[0]);
      }
    };

    loadConfig();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const newConfig: CustomMessage = {
      ...config,
      poolpairs: {
        [values.poolPair]: 100,
      },
    };

    saveConfig(newConfig).then(() => { navigation.navigate("ReinvestThreshold") });
  };

  return (
    <Container>
      <Title title="Liquidity Pool" />

      <Text className="text-white text-2xl">The minted token is</Text>
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
              renderItem={(item) => (
                <Text
                  className={`${values.poolPair === item.value ? "text-black" : "text-white"
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
              placeholder={!isFocus ? "Select Token" : "..."}
              searchPlaceholder="Search Token..."
              value={values.poolPair}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => setFieldValue("poolPair", item.value)}
            />
            {errors.poolPair && (
              <ValidationError error={errors.poolPair} />
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
