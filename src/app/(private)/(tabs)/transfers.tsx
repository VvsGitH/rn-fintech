import { Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function TransfersPage() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Text>TRANSFERS</Text>
    </View>
  );
}
