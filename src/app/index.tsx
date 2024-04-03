import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
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
        <Text style={styles.headerText}>Welcome to the app!</Text>
      </View>

      <View style={styles.buttons}>
        <Link href="/login" asChild>
          <Pressable>
            <Text style={styles.buttonText}>Log in</Text>
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
    backgroundColor: "#000",
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
  },
  buttonText: {
    color: "#fff",
  },
});
