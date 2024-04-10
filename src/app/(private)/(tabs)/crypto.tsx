import { Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function CryptoPage() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{ paddingTop: headerHeight }}>
      <Text>CRYPTO</Text>
    </View>
  );
}
