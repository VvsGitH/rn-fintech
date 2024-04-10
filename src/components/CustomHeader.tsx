import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CustomHeader() {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View style={styles.container}>
        <Link href={"/(private)/(modals)/account"} asChild>
          <Pressable style={styles.roundBtn}>
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>SG</Text>
          </Pressable>
        </Link>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.dark} />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
    borderRadius: 30,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
