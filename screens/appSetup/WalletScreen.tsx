import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";
import TextInput from "../../components/TextInput";
import { getAddress, saveAddress } from "../../utils/securestore";
import Container from "../../components/Container";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../components/ValidationError";

// formik
interface FormValues {
  address: string;
}

// yup
const formValidationSchema = yup.object().shape({
  address: yup.string().required("Wallet address is required"),
});

const WalletScreen = ({ navigation }) => {
  const [address, setAddress] = useState<string>("");
  const initialValues: FormValues = { address };

  useEffect(() => {
    const load = async () => {
      try {
        const address = await getAddress();
        setAddress(address);
      } catch (error) {
        alert(error);
      }
    };

    load();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    try {
      await saveAddress(values.address);
      navigation.navigate("Seed");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Title title="Wallet" />
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
            <TextInput
              value={values.address}
              onChangeText={handleChange("address")}
              placeholder="Your wallet address"
              autoCapitalize="none"
              className="text-center"
              hasError={errors.address && true}
            />
            {!!errors && !!errors.address && (
              <ValidationError error={errors.address} />
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

export default WalletScreen;
