import Colors from "@/constants/Colors";
import { useAuthStore } from "@/store/AuthStore";
import { Redirect, Stack } from "expo-router";

export default function PublicLayout() {
  const authenticated = useAuthStore((s) => s.authenticated);
  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerBackVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { color: Colors.text },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
