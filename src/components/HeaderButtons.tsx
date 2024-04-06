import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export function HeaderBackBtn() {
  return (
    <Link href=".." asChild>
      <Pressable>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </Pressable>
    </Link>
  );
}

export function HeaderHelpBtn() {
  return (
    <Link href="/help" asChild>
      <Pressable>
        <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
      </Pressable>
    </Link>
  );
}
