import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [assets, error] = useAssets([require("@/assets/videos/intro.mp4")]);
  const videoUri = assets?.[0]?.uri;

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="light" />

      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          resizeMode={ResizeMode.COVER}
          style={styles.videoContainer}
          shouldPlay
          isLooping
          isMuted
        />
      )}

      <View style={styles.header}>
        <Text style={styles.headerText}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link href="/login" style={[defaultStyles.pillButton, styles.loginButton]} asChild>
          <Pressable>
            <Text style={styles.loginButtonText}>Log in</Text>
          </Pressable>
        </Link>
        <Link href="/signup" style={[defaultStyles.pillButton, styles.signUpButton]} asChild>
          <Pressable>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    marginTop: 80,
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  loginButton: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
  signUpButton: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  signUpButtonText: {
    color: Colors.dark,
    fontSize: 22,
    fontWeight: "500",
  },
});
