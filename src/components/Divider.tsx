import Colors from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

interface IDividerProps {
  text?: string;
}

export default function Divider(props: IDividerProps) {
  return (
    <View style={[styles.container, { gap: props.text ? 16 : undefined }]}>
      <View style={styles.line} />
      {props.text && <Text style={styles.text}>{props.text}</Text>}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
  text: {
    color: Colors.gray,
    fontSize: 18,
    lineHeight: 18,
  },
});
