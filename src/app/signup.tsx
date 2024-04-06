import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";

export default function SignUpScreen() {
  const [countryCode, setCountryCode] = useState("+39");
  const [phoneNum, setPhoneNum] = useState("");

  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const onSignup = async () => {
    // TODO
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <StatusBar style="dark" />

      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>{"Let's get started!"}</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter yout phone number. We will send you a confirmation code there.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNum}
            onChangeText={setPhoneNum}
          />
        </View>

        <Link href="/login" replace asChild>
          <Pressable>
            <Text style={defaultStyles.textLink}>Already have ab account? Log in</Text>
          </Pressable>
        </Link>

        <Pressable
          style={[defaultStyles.pillButton, phoneNum ? styles.signUpBtnEnabled : styles.signUpBtnDisabled]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    flex: 1,
  },
  phoneInput: {
    flex: 5,
  },
  signUpBtnEnabled: {
    backgroundColor: Colors.text,
    marginTop: "auto",
  },
  signUpBtnDisabled: {
    backgroundColor: Colors.textMuted,
    marginTop: "auto",
  },
});
