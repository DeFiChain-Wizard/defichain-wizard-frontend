import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import { getConfig, saveConfig } from "../../../utils/securestore";
import TextInput from "../../../components/TextInput";
import Container from "../../../components/Container";
import { useWhaleApiClient } from "../../../context/WhaleContext";
import { fetchLoanTokens } from "../../../utils/whale";
import { Formik } from "formik";
import * as yup from "yup";
import ValidationError from "../../../components/ValidationError";
import RadioButton from "../../../components/RadioButton.tsx";
import { CustomMessage } from "../../../types/CustomMessage";
import Dropdown from "../../../components/Dropdown";
import ModeDescription from "./ModeDescription";
import { compoundingTokenList } from "../../../constants/compoundingToken";

// formik
interface FormValues {
  reinvestThreshold: number;
  selectedLoanToken: string;
  selectedCompoundingToken: string;
  mode: string;
}

// yup
const formValidationSchema = yup.object().shape({
  reinvestThreshold: yup.number().when("mode", {
    is: (mode: string) => mode !== "0",
    then: yup
      .number()
      .min(1, "Reinvestment threshold must be at least 1")
      .required("Reinvest threshold is required"),
  }),
  mode: yup.string().min(0).max(3),
  selectedLoanToken: yup.string().when("mode", {
    is: (mode: string) => mode !== "0" && mode !== "1" && mode !== "3",
    then: yup.string().required("Compounding token is required"),
    otherwise: yup.string(),
  }),
  selectedCompoundingToken: yup.string().when("mode", {
    is: (mode: string) => mode !== "0" && mode !== "1" && mode !== "2",
    then: yup.string().required("Collateral token is required"),
    otherwise: yup.string(),
  }),
});

const CompoundingScreen = ({ navigation }) => {
  const [reinvestThreshold, setReinvestThreshold] = useState<any>();
  const [loanToken, setLoanToken] = useState<string[]>();
  const [compoundingToken, setCompoundingToken] = useState<string[]>();
  const [mode, setMode] = useState<string>();
  const [selectedLoanToken, setSelectedLoanToken] = useState<string>();
  const [selectedCompoundingToken, setSelectedCompoundingToken] =
    useState<string>();
  const [config, setConfig] = useState<CustomMessage>();
  const client = useWhaleApiClient();

  const initialValues: FormValues = {
    reinvestThreshold,
    selectedLoanToken,
    selectedCompoundingToken,
    mode,
  };

  const loadCompoundingToken = () => {
    let compoundingToken = [];
    for (let index = 0; index < compoundingTokenList.length; index++) {
      const token = compoundingTokenList[index];
      compoundingToken.push({ label: token, value: token });
    }
    setCompoundingToken(compoundingToken);
  };

  const loadLoanTokens = async () => {
    const tokens = await fetchLoanTokens(client);
    setLoanToken(tokens);
  };

  const loadConfig = async () => {
    const config: CustomMessage = await getConfig();
    const { mode, threshold, token } = config.compounding;

    if (config) {
      setConfig(config);
      setReinvestThreshold(threshold.toString());

      if (mode === 2) setSelectedLoanToken(token);
      if (mode === 3) setSelectedCompoundingToken(token);
      setMode(mode.toString());
    }
  };

  useEffect(() => {
    loadConfig();
    loadLoanTokens();
    loadCompoundingToken();
  }, []);

  const handleNextButton = async (values: FormValues) => {
    const {
      mode,
      selectedLoanToken,
      selectedCompoundingToken,
      reinvestThreshold,
    } = values;

    let token: string;
    if (mode === "0" || mode === "1") token = "DFI";
    if (mode === "2") token = selectedLoanToken;
    if (mode === "3") token = selectedCompoundingToken;

    const newConfig: CustomMessage = {
      ...config,
      compounding: {
        ...config.compounding,
        threshold: Number(reinvestThreshold),
        token,
        mode: Number(mode),
      },
    };

    saveConfig(newConfig).then(navigation.navigate("Vault"));
  };

  return (
    <Container>
      <Title title="Compounding" />
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
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View>
            {/* threshold */}
            <View className="flex space-y-4">
              <ModeDescription text="Every" checked={values.mode !== "0"} />
              <View className="flex">
                <TextInput
                  placeholder="20"
                  className="w-full text-2xl font-semibold"
                  value={values.reinvestThreshold}
                  onChangeText={handleChange("reinvestThreshold")}
                  keyboardType="numeric"
                  contextMenuHidden={true}
                  hasError={!!errors.reinvestThreshold}
                  active={values.mode !== "0"}
                />
                <ModeDescription
                  text="DFI"
                  checked={values.mode !== "0"}
                  className="text-2xl absolute right-0 top-2"
                />
              </View>
              <View>
                <ModeDescription text="will be" checked={values.mode !== "0"} />
              </View>
            </View>
            <RadioButton.Group
              onValueChange={handleChange("mode")}
              value={values.mode}
            >
              {/* add as collateral to vault */}
              <View className="flex flex-row items-center mt-6">
                <RadioButton.Item value="1" />
                <ModeDescription
                  className="ml-2"
                  text="added as collateral to my vault."
                  checked={values.mode === "1"}
                />
              </View>
              {/* swapped into token */}
              <View className="flex flex-row items-center space-x-2 mt-6">
                <RadioButton.Item value="2" />
                <ModeDescription
                  className="ml-2"
                  text="swapped into"
                  checked={values.mode === "2"}
                />
                <Dropdown
                  className="flex-1"
                  data={loanToken}
                  value={values.selectedLoanToken}
                  onChange={(item: { value: string }) => {
                    setFieldValue("selectedLoanToken", item.value);
                  }}
                  placeholder="Token"
                  searchPlaceholder="Search Token"
                  search={true}
                  hasError={errors.selectedLoanToken && true}
                  active={values.mode === "2"}
                  disable={values.mode !== "2"}
                />
              </View>
              {/* swapped into token and reinvest */}
              <View className="flex mt-6">
                <View className="flex flex-row items-center space-x-2">
                  <RadioButton.Item value="3" />
                  <ModeDescription
                    className="ml-2"
                    text="swapped into"
                    checked={values.mode === "3"}
                  />
                  <Dropdown
                    className="flex-1"
                    data={compoundingToken}
                    value={values.selectedCompoundingToken}
                    onChange={(item: { value: string }) => {
                      setFieldValue("selectedCompoundingToken", item.value);
                    }}
                    placeholder="Token"
                    searchPlaceholder="Search Token"
                    search={true}
                    hasError={errors.selectedCompoundingToken && true}
                    active={values.mode === "3"}
                    disable={values.mode !== "3"}
                  />
                </View>
                <ModeDescription
                  className="ml-8 mt-2"
                  text="and added to vault."
                  checked={values.mode === "3"}
                />
              </View>
              <View className="flex flex-row items-center mt-6">
                <RadioButton.Item value="0" />
                <ModeDescription
                  className="ml-2"
                  text="Do nothing. I'll do it!"
                  checked={values.mode === "0"}
                />
              </View>
            </RadioButton.Group>

            {/* errors */}
            <View className="mt-2">
              {!!errors && !!errors.selectedCompoundingToken && (
                <ValidationError error={errors.selectedCompoundingToken} />
              )}
              {!!errors && !!errors.selectedLoanToken && (
                <ValidationError error={errors.selectedLoanToken} />
              )}
              {!!errors && !!errors.reinvestThreshold && (
                <ValidationError error={errors.reinvestThreshold} />
              )}
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
    </Container>
  );
};

export default CompoundingScreen;
