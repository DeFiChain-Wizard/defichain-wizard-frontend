import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import SeedTextInput from "./SeedTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../../components/ValidationError";

// formik
interface FormValues {
  words: string[];
}

// yup
const formValidationSchema = yup.object().shape({
  words: yup.array().of(yup.string().required()),
});

const SeedScreen = ({ navigation }) => {
  const emptySeed = Array(24).fill("");
  const initialValues: FormValues = { words: emptySeed };
  const [keyboardBehavior, setKeyboardBehavior] = useState<"height" | "padding" | "position">("height")

  useEffect(() => {
    setKeyboardBehavior((Platform.OS === "ios") ? "padding" : "height")
  }, [])

  const handleNextButton = (values: FormValues) => {
    navigation.navigate("Password", {
      seedPhraseWords: values.words,
    });
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Title title="Seed" />
          <Text className="text-white text-sm text-center mb-6">
            Your seed is only stored encrypted on your device.
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
                <View className="flex flex-row w-full flex-wrap">
                  {[...Array(24)].map((_number, index) => (
                    <SeedTextInput
                      key={index}
                      onChangeText={(item) => {
                        setFieldValue(`words[${index}]`, item);
                      }}
                      defaultValue={values.words[index]}
                      wordIndex={index}
                      hasError={
                        errors && errors.words && errors.words[index]
                          ? true
                          : false
                      }
                    />
                  ))}
                </View>
                {!!errors.words && (
                  <ValidationError error="All fields must be filled" />
                )}
                <View className="flex flex-row justify-between mt-8 mb-16">
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SeedScreen;
