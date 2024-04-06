import { HeaderBackBtn, HeaderHelpBtn } from "@/components/HeaderButtons";
import Colors from "@/constants/Colors";
import useAuthStore from "@/store/AuthStore";
import { Redirect, Stack } from "expo-router";

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
