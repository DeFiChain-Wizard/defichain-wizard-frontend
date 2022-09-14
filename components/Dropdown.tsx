import { Text } from "react-native";
import React, { useState } from "react";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";

type DropdownProps = {
  data: any;
  value: any;
  onChange: any;
  placeholder?: string;
  searchPlaceholder?: string;
  search?: boolean;
  active?: boolean;
  hasError?: boolean;
  [x: string]: any;
};

const Dropdown = ({
  data,
  value,
  onChange,
  placeholder = "Select value",
  searchPlaceholder = "Search value",
  search = false,
  active = true,
  hasError = false,
  ...rest
}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState<any>();

  return (
    <RNDropdown
      data={data}
      renderItem={(item) => (
        <Text
          className={`${
            value === item.value ? "text-black" : "text-white"
          } p-4`}
        >
          {item.label}
        </Text>
      )}
      {...rest}
      className={`border-b ${
        hasError
          ? "border-b-[#F06666]"
          : ( active
              ? "border-b-white"
              : "border-b-white/25")
      } h-12 px-3`}
      containerStyle={{
        backgroundColor: "#000000",
        borderWidth: 0,
        marginTop: 4,
      }}
      search={search}
      placeholderStyle={{
        color: active ? "#838383" : "#4d4d4d",
        fontSize: 24,
        fontWeight: "600",
      }}
      selectedTextStyle={{
        color: active ? "white" : "#4d4d4d",
        fontSize: 24,
        fontWeight: "600",
      }}
      activeColor="white"
      maxHeight={350}
      autoScroll={false}
      labelField="label"
      valueField="value"
      inputSearchStyle={{ color: "white", borderWidth: 0 }}
      placeholder={!isFocus ? placeholder : "..."}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={onChange}
    />
  );
};

export default Dropdown;
