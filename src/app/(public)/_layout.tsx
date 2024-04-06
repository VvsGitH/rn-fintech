import { HeaderBackBtn, HeaderCloseBtn } from "@/components/HeaderButtons";
import Colors from "@/constants/Colors";
import { useAuthStore } from "@/store/AuthStore";
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
        }}
      />
      <Stack.Screen
        name="verify-phone"
        options={{
          title: "Verify Phone Number",
          presentation: "modal",
          animation: "slide_from_bottom",
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { color: "#000" },
          headerLeft: () => <HeaderCloseBtn />,
        }}
      />
    </Stack>
  );
}
