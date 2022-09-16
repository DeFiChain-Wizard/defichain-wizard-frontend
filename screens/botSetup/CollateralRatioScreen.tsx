import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { getConfig } from "../../utils/securestore";
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
  keepMinRatio: yup
    .number()
    .positive()
    .typeError("Only numbers with decimal points allowed")
    .min(151, "Minimum value is 151")
    .required("Min ratio is required"),
  keepMaxRatio: yup
    .number()
    .positive()
    .typeError("Only numbers with decimal points allowed")
    .moreThan(yup.ref("keepMinRatio"), "Must be more than Minimum")
    .required("Max ratio is required"),
});

const CollateralRatioScreen = ({ navigation }) => {
  const [keepMinRatio, setKeepMinRatio] = useState();
  const [keepMaxRatio, setKeepMaxRatio] = useState();

  const initialValues: FormValues = { keepMinRatio, keepMaxRatio };

  useEffect(() => {
    const load = async () => {
      const config = await getConfig();
      if (!config) return;

      const { keepMinRatio, keepMaxRatio } = config.rules;
      setKeepMinRatio(keepMinRatio.toString());
      setKeepMaxRatio(keepMaxRatio.toString());
    };

    load();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const { keepMinRatio, keepMaxRatio } = values;

    navigation.navigate("LiquidityPool", {
      rules: {
        keepMinRatio: Number(keepMinRatio),
        keepMaxRatio: Number(keepMaxRatio),
      },
    });
  };

  return (
    <Container>
      <Title title="Collateral ratio" />
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
                  onChangeText={handleChange("keepMinRatio")}
                  textAlign="center"
                  contextMenuHidden={true}
                />
                <Text className="text-white text-2xl absolute right-0 top-2">
                  %
                </Text>
                {!!errors.keepMinRatio && (
                  <ValidationError error={errors.keepMinRatio} />
                )}
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
                <Text className="text-white text-2xl absolute right-0 top-2">
                  %
                </Text>
                {!!errors.keepMaxRatio && (
                  <ValidationError error={errors.keepMaxRatio} />
                )}
              </View>
            </View>
            <View className="flex flex-row justify-between mt-8">
              <Button
                label="Cancel"
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

export default CollateralRatioScreen;
