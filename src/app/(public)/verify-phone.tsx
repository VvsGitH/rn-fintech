import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuthStore } from "@/store/AuthStore";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export default function VerifyPhoneScreen() {
  const verifyCode = useAuthStore((s) => s.verifyCode);

  const { phone, isSignIn } = useLocalSearchParams<{ phone: string; isSignIn: string }>();
  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const submitCode = () => {
    void verifyCode(code, isSignIn === "true");
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>We have sent a verification code to your phone number: {phone}.</Text>
      <Text style={defaultStyles.descriptionText}>Please, insert the code you received down here:</Text>

      <CodeField
        {...props}
        ref={ref}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
        )}
      />

      <Pressable
        style={[styles.submitBtn, { backgroundColor: code.length === 6 ? Colors.text : Colors.textMuted }]}
        disabled={code.length < 6}
        onPress={submitCode}
      >
        <Text style={defaultStyles.buttonText}>Confirm</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
  submitBtn: {
    ...defaultStyles.pillButton,
    marginTop: "auto",
    marginBottom: 20,
  },
});
