import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { TranslationContext } from "../contexts/TranslationContext";

const colors = require("../style/colors");

export function IntInput({ value, setValue, completed, maxDigits }) {
  const context = useContext(TranslationContext);

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.textInputSpacer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => setValue(value.replace(/[^0-9]/g, ""))}
          numeric
          keyboardType="numeric"
          value={value}
          maxLength={maxDigits}
        ></TextInput>
      </View>
      <View style={styles.textInputSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => (value == "" ? completed(false) : completed(true))}
        >
          <Text style={styles.buttonText}>
            {context.button_continue != undefined
              ? context.button_continue
              : null}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function BooleanInput({ setValue, completed }) {
  const context = useContext(TranslationContext);
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => {
            setValue(true);
            completed();
          }}
        >
          <Text style={styles.buttonText}>
            {context.button_yes != undefined ? context.button_yes : null}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.buttonSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => {
            setValue(false);
            completed();
          }}
        >
          <Text style={styles.buttonText}>
            {context.button_no != undefined ? context.button_no : null}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function SkipInput({ setSkipped, completed }) {
  const context = useContext(TranslationContext);
  return (
    <View style={styles.skipContainer}>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          setSkipped(true);
          completed(true);
        }}
      >
        <Text style={styles.buttonText}>
          {context.button_skip != undefined ? context.button_skip : null}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: 200,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    color: colors.black,
    backgroundColor: colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textInputSpacer: {
    marginLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonSpacer: { marginHorizontal: 20 },
  button: {
    elevation: 7,
    backgroundColor: colors.primary,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: 150,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
    ...Platform.select({
      web: {
        fontSize: "1rem",
      },
      default: {
        fontSize: 18,
      },
    }),
  },
  skipContainer: {
    flex: 2,
  },
});
