import { Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function InvestPage() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Text>INVEST</Text>
    </View>
  );
}
