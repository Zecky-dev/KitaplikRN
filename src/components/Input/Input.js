import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./Input.style";

const Input = ({
  placeholder,
  secureEntry = false,
  onChangeText,
  value,
  oval = true,
  label,
  additionalStyles,
}) => {
  const [hidden, setHidden] = useState(secureEntry);

  return (
    <>
      {label && (
        <Text style={[styles.inputLabel, additionalStyles?.inputLabel]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          additionalStyles?.inputContainer,
          oval && {
            borderRadius: 24,
          },
        ]}
      >
        <TextInput
          style={[styles.input, additionalStyles?.input]}
          placeholder={placeholder}
          placeholderTextColor={"white"}
          secureTextEntry={hidden}
          caretHidden={true}
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
