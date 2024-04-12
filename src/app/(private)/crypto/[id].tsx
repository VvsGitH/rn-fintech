import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CryptoDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: "Bitcoin" }} />
      <View>
        <Text>CRYPTO DETAIL: {id}</Text>
      </View>
    </>
  );
}
