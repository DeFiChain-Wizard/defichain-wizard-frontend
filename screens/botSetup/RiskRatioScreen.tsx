import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { getConfig, saveConfig } from "../../utils/securestore";
import { defaultConfig } from "../../constants/config";
import { CustomMessage } from "@defichainwizard/core";
import Container from "../../components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";

// formik
interface FormValues {
  keepMinRatio: number;
  keepMaxRatio: number;
}

// yup
const formValidationSchema = yup.object().shape({
  keepMinRatio: yup.number()
    .positive()
    .typeError('Only numbers with decimal points allowed')
    .min(151, "Minimum value is 151")
    .required("Required"),
  keepMaxRatio: yup.number()
    .positive()
    .typeError('Only numbers with decimal points allowed')
    .moreThan(
      yup.ref("keepMinRatio"),
      "Must be more than Minimum"
    )
    .required("Required")
});

const RiskRatioScreen = ({ navigation }) => {
  const [keepMinRatio, setKeepMinRatio] = useState();
  const [keepMaxRatio, setKeepMaxRatio] = useState();
  const [config, setConfig] = useState<CustomMessage>();

  const initialValues: FormValues = { keepMinRatio, keepMaxRatio };

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfig();
      if (config) {
        setConfig(config);
        setKeepMinRatio(config.rules.keepMinRatio.toString());
        setKeepMaxRatio(config.rules.keepMaxRatio.toString());
      }
    };

    loadConfig();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const initConfig: CustomMessage = config ? config : defaultConfig;
    const newConfig: CustomMessage = {
      ...initConfig,
      rules: {
        keepMaxRatio: Number(values.keepMaxRatio),
        keepMinRatio: Number(values.keepMinRatio),
      },
    };

    await saveConfig(newConfig);
    navigation.navigate("LiquidityPool");
  };

  return (
    <Container>
      <Title title="Risk Ratio" />
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
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <View className="flex space-y-4">
              <Text className="text-white text-2xl">Your ratio is between</Text>
              <View className="flex">
                <TextInput
                  placeholder="min ratio"
                  className="flex-1 w-full text-2xl font-semibold"
                  hasError={errors.keepMinRatio && true}
                  value={values.keepMinRatio}
                  // onChangeText={setKeepMinRatio}
                  onChangeText={handleChange("keepMinRatio")}
                  textAlign="center"
                  contextMenuHidden={true}
                />
                {errors.keepMinRatio && (
                  <ValidationError error={errors.keepMinRatio} />
                )}
                <Text className="text-white text-2xl absolute right-0">%</Text>
              </View>
              <Text className="text-white text-2xl">and</Text>
              <View className="flex">
                <TextInput
                  placeholder="max ratio"
                  className="flex-1 w-full text-2xl font-semibold"
                  hasError={errors.keepMinRatio && true}
                  value={values.keepMaxRatio}
                  onChangeText={handleChange("keepMaxRatio")}
                  textAlign="center"
                  contextMenuHidden={true}
                />
                {errors.keepMaxRatio && (
                  <ValidationError error={errors.keepMaxRatio} />
                )}
                <Text className="text-white text-2xl absolute right-0">%</Text>
              </View>
            </View>
            <View className="flex flex-row justify-between mt-8">
              <Button
                label="Back"
                type="secondary"
                onPress={() => navigation.goBack()}
              />
              {/* <Button label="Next step" onPress={() => handleNext()} /> */}
              <Button label="Next step" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default RiskRatioScreen;
