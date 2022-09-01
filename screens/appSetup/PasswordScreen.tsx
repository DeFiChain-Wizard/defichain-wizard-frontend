import { View, Text, Keyboard } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";
import TextInput from "../../components/TextInput";
import { Seed } from "@defichainwizard/core";
import { setItem } from "../../utils/securestore";
import LoadingIndicator from "../../components/LoadingIndicator";
import Container from "../../components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";

// formik
interface FormValues {
  password: string;
  confirmPassword: string;
}

// yup
const formValidationSchema = yup.object().shape({
  password: yup.string().min(6, "Select at least 6 characters").required("Required"),
  confirmPassword: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match")
});

const PasswordScreen = ({ navigation, route }) => {
  const { seedPhraseWords } = route.params;
  const [loading, setLoading] = useState(false);
  const initialValues: FormValues = { password: '', confirmPassword: '' };

  const handleNextButton = async (values: FormValues) => {
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(async () => {
      await Seed.build(seedPhraseWords, values.password)
        .then(() => {
          setItem("isInitialized", "true").then(() => setLoading(false));
        })
        .then(() => {
          navigation.navigate("Internal");
        });
    }, 1000);
  };

  return (
    <Container>
      <Title title="Password" />
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          handleNextButton(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View className="flex w-full mt-5">
            <View className="flex space-y-4">
              <Text className="text-white text-sm text-center">
                The password is needed to encrypt your seed and send transactions to
                your bot.
                {"\n"}
                {"\n"}
                The password itself will not be stored.
              </Text>
              <TextInput
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Your password"
                autoCapitalize="none"
                secureTextEntry={true}
                className="text-center"
                hasError={errors.password && true}
              />
              <Text>{errors && errors.password && <ValidationError error={errors.password} />} </Text>
              <TextInput
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                placeholder="Confirm password"
                autoCapitalize="none"
                secureTextEntry={true}
                className="text-center"
                hasError={errors.confirmPassword && true}
              />
              <Text>{errors && errors.confirmPassword && <ValidationError error={errors.confirmPassword} />}</Text>
            </View>
            <View className="flex flex-row justify-between mt-8">
              <Button
                label="Back"
                type="secondary"
                disabled={loading}
                onPress={() => navigation.goBack()}
              />
              <Button
                label="Finish setup"
                disabled={loading}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
      {loading && <LoadingIndicator text="Loading App..." />}
    </Container>
  );
};

export default PasswordScreen;
