import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { CustomHeader } from "@/components/CustomHeader";

export default function PrivateTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.text,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint="extraLight"
            style={styles.tabBarBlur}
            experimentalBlurMethod="dimezisBlurView"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ size, color }) => <FontAwesome name="registered" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ size, color }) => <FontAwesome name="line-chart" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => <FontAwesome name="exchange" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => <FontAwesome name="bitcoin" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ size, color }) => <FontAwesome name="th" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  tabBarBlur: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});
