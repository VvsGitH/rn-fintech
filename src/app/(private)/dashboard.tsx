import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <Text>DASHBOARD SCREEN!</Text>
    </View>
  );
}
