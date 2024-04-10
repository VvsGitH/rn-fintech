import { Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function LifestylePage() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Text>LIFESTYLE</Text>
    </View>
  );
}
