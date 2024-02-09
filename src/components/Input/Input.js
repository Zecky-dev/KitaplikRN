import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./Input.style";

const lightStyles = {
  container: {
    ...styles.container,
    borderColor: "white",
  },
  label: {
    ...styles.label,
    color: "white",
  },
  input: {
    ...styles.input,
    color: "white",
  }
}

const darkStyles = {
  container: {
    ...styles.container,
    borderColor: "black",
  },
  label: {
    ...styles.label,
    color: "black",
  },
  input: {
    ...styles.input,
    color: "black",
  }
}

const Input = ({
  placeholder,
  secureEntry = false,
  onChangeText,
  value,
  multiline = false,
  oval = true,
  label,
  dark = false,
  additionalStyles,
}) => {
  
  const styles = dark ? darkStyles : lightStyles
  
  const [hidden, setHidden] = useState(secureEntry);

  return (
    <>
      {label && (
        <Text style={[styles.label, additionalStyles?.label]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          additionalStyles?.container,
          oval && {
            borderRadius: 24,
          },
        ]}
      >
        <TextInput
          style={[styles.input, additionalStyles?.input]}
          placeholder={placeholder}
          placeholderTextColor={dark ? "rgba(0,0,0,0.5)" : "white"}
          secureTextEntry={hidden}
          caretHidden={true}
          onChangeText={onChangeText}
          multiline={multiline}
        />

        {secureEntry && (
          <Icon
            name={hidden ? "eye-off" : "eye"}
            color={"white"}
            size={24}
            style={{ position: "absolute", right: 16 }}
            onPress={() => setHidden(!hidden)}
          />
        )}
      </View>
    </>
  );
};

export default Input;
