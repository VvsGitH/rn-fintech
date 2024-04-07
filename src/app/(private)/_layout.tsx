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
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
