import Colors from "@/constants/Colors";
import useAuthStore from "@/store/AuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PublicLayout() {
  const authenticated = useAuthStore((s) => s.authenticated);
  if (authenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "Back to home",
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackBtn />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "Back to home",
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackBtn />,
          headerRight: () => <HeaderHelpBtn />,
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

function HeaderBackBtn() {
  return (
    <Link href=".." asChild>
      <Pressable>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </Pressable>
    </Link>
  );
}

function HeaderHelpBtn() {
  return (
    <Link href="/help" asChild>
      <Pressable>
        <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
      </Pressable>
    </Link>
  );
}
