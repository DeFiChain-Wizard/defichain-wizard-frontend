import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { emptySeed } from "../../constants/setup";
import Container from "../../components/Container";

const SeedScreen = ({ navigation }) => {
  const [words, setWords] = useState<string[]>(emptySeed);

  const handleOnChangeWords = (word: string, index: number) => {
    var tmpWords = words;
    tmpWords[index] = word;
    setWords(tmpWords);
  };

  const handleNextButton = () => {
    navigation.navigate("Password", {
      seedPhraseWords: words,
    });
  };

  return (
    <Container>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Title title="Seed" />
        <Text className="text-white text-sm text-center mb-6">
          Your seed is only stored encrypted on your device.
        </Text>
        <SeedInput words={words} onChangeText={handleOnChangeWords} />
        <View className="flex flex-row justify-between mt-8 mb-16">
          <Button
            label="Back"
            type="secondary"
            onPress={() => navigation.goBack()}
          />
          <Button label="Next step" onPress={handleNextButton} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default SeedScreen;

type SeedInputProps = {
  words: string[];
  onChangeText: (text: string, index: number) => void;
};
const SeedInput = ({ words, onChangeText }: SeedInputProps) => {
  return (
    <View className="flex flex-row w-full flex-wrap">
      {[...Array(24)].map((_number, index) => (
        <View
          className="flex flex-row w-[50%] py-0.5 justify-center items-center"
          key={index}
        >
          <Text className="w-8 pr-2.5 text-right text-[#838383]">
            {index + 1}.
          </Text>
          <TextInput
            className="flex-1  mb-1.5 rounded-md p-3 text-white"
            placeholder={`Enter word #${index + 1}`}
            autoCapitalize="none"
            autoCorrect={false}
            contextMenuHidden={true}
            defaultValue={words[index]}
            onChangeText={(text: string) => {
              onChangeText(text, index);
            }}
          />
        </View>
      ))}
    </View>
  );
};
