import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { getConfig, saveConfig } from "../../utils/securestore";
import TextInput from "../../components/TextInput";
import { CustomMessage } from "@defichainwizard/core";
import Container from "../../components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";

// formik
interface FormValues {
  reinvestThreshold: number;
}

// yup
const formValidationSchema = yup.object().shape({
  reinvestThreshold: yup.number()
    .min(0, "Minimum value is 0")
    .typeError('Only numbers with decimal points allowed')
    .required("Required")
});

const ReinvestThresholdScreen = ({ navigation }) => {
  const [reinvestThreshold, setReinvestThreshold] = useState();
  const [config, setConfig] = useState<CustomMessage>();

  const initialValues: FormValues = { reinvestThreshold };

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfig();
      if (config) {
        setConfig(config);
        config.compounding.threshold && setReinvestThreshold(config.compounding.threshold.toString());
      }
    };

    loadConfig();
  }, []);

  const handleFinishButton = async (values: FormValues) => {
    const newConfig: CustomMessage = {
      ...config,
      compounding: {
        ...config.compounding,
        threshold: Number(values.reinvestThreshold),
      },
    };

    saveConfig(newConfig).then(() => { navigation.navigate("Vault") })
  };

  return (
    <Container>
      <Title title="Reinvest Threshold" />

      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          handleFinishButton(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors }) => (
          <View>
            <View className="flex space-y-4">
              <Text className="text-white text-2xl">Every</Text>
              <View className="flex">
                <TextInput
                  placeholder="20"
                  className="flex-1 text-2xl font-semibold"
                  value={reinvestThreshold}
                  onChangeText={setReinvestThreshold}
                  keyboardType="numeric"
                  contextMenuHidden={true}
                />
                {errors.reinvestThreshold && (
                  <ValidationError error={errors.reinvestThreshold} />
                )}
                <Text className="text-white text-2xl absolute right-0">DFI</Text>
              </View>
              <View>
                <Text className="text-white text-2xl">will be reinvested.</Text>
                <Text className="text-[#838383] text-sm">
                  <Text className="font-semibold">Note</Text>: Select 0 to deactivate
                  this feature.
                </Text>
              </View>
            </View>
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

      {/* <View className="mx-6">
        <Text className="text-[#6D7891]">Reinvest Threshold</Text>
        <TextInput
          placeholder="Amount of DFI to reinvest"
          className="flex-1 mt-2"
          value={reinvestThreshold}
          onChangeText={setReinvestThreshold}
        />
        <View className="flex flex-row justify-between mt-8">
          <Button
            label="Back"
            type="secondary"
            onPress={() => navigation.goBack()}
          />
          <Button label="Next step" onPress={handleFinish} />
        </View>
      </View> */}
    </Container>
  );
};

export default ReinvestThresholdScreen;
