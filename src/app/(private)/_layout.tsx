import { HeaderBackBtn } from "@/components/HeaderButtons";
import Colors from "@/constants/Colors";
import { useAuthStore } from "@/store/AuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function PublicLayout() {
  const authenticated = useAuthStore((s) => s.authenticated);
  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="/crypto/[id]"
        options={{
          title: "",
          headerLeft: () => <HeaderBackBtn />,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="notifications-outline" color={Colors.dark} size={30} />
              <Ionicons name="star-outline" color={Colors.dark} size={30} />
            </View>
          ),
        }}
      />
    </Stack>
  );
}
