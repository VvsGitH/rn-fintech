import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

interface IRoundBtnProps extends Omit<PressableProps, "children"> {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export function RoundBtn({ text, icon, ...btnProps }: IRoundBtnProps) {
  return (
    <Pressable {...btnProps} style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={40} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
});
