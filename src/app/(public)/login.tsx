import Divider from "@/components/Divider";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuthStoreShallow as useAuthStore } from "@/store/AuthStore";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from "react-native";

export default function LoginScreen() {
  const signIn = useAuthStore((s) => ({
    byPhone: s.signInByPhone,
    byGoogle: s.signInByGoogle,
    byApple: s.signInByApple,
  }));

  const [countryCode, setCountryCode] = useState("+39");
  const [phoneNum, setPhoneNum] = useState("");

  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const onLogin = async (authType: "phone" | "google" | "apple") => {
    try {
      switch (authType) {
        case "phone":
          await signIn.byPhone(`${countryCode}${phoneNum}`);
          break;
        case "google":
          await signIn.byGoogle();
          break;
        case "apple":
          await signIn.byApple();
          break;
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error!", "There was an error during sign-up");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <StatusBar style="dark" />

      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back!</Text>
        <Text style={defaultStyles.descriptionText}>Enter the phone number associated with your account.</Text>
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

        <Pressable
          style={[defaultStyles.pillButton, phoneNum ? styles.signUpBtnEnabled : styles.signUpBtnDisabled]}
          onPress={() => onLogin("phone")}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </Pressable>

        <Divider text="or" />

        <Pressable style={styles.alternativeSignBtn} onPress={() => onLogin("google")}>
          <Ionicons name="logo-google" size={24} color="#000" />
          <Text style={styles.alternativeSignBtnText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.alternativeSignBtn} onPress={() => onLogin("apple")}>
          <Ionicons name="logo-apple" size={24} color="#000" />
          <Text style={styles.alternativeSignBtnText}>Continue with Apple</Text>
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
    marginTop: 20,
  },
  signUpBtnDisabled: {
    backgroundColor: Colors.textMuted,
    marginTop: 20,
  },
  alternativeSignBtn: {
    ...defaultStyles.pillButton,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  alternativeSignBtnText: {
    ...defaultStyles.buttonText,
    color: "#000",
  },
});
