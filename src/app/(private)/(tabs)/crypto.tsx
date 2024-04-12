import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { getCryptoInfoById, getCryptos } from "@/api/crypto";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

export default function CryptoPage() {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: () => getCryptos(),
  });

  const ids = currencies.data?.map((curr) => curr.id).join(",");

  const currenciesInfo = useQuery({
    queryKey: ["currencies", ids],
    queryFn: () => getCryptoInfoById(ids!),
    enabled: !!ids,
  });

  return (
    <ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((curr) => (
          <Link key={curr.id} href={{ pathname: "/crypto/[id]", params: { id: curr.id } }} asChild>
            <Pressable style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
              <Image source={{ uri: currenciesInfo.data?.[curr.id]?.logo }} style={{ width: 40, height: 40 }} />
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ fontWeight: "600", color: Colors.dark }}>{curr.name}</Text>
                <Text style={{ color: Colors.gray }}>{curr.symbol}</Text>
              </View>
              <View style={{ gap: 6, alignItems: "flex-end" }}>
                <Text>{curr.quote.EUR.price.toFixed(2)} €</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Ionicons
                    name={curr.quote.EUR.percent_change_1h > 0 ? "caret-up" : "caret-down"}
                    color={curr.quote.EUR.percent_change_1h > 0 ? "green" : "red"}
                    size={16}
                  />
                  <Text style={{ color: curr.quote.EUR.percent_change_1h > 0 ? "green" : "red" }}>
                    {curr.quote.EUR.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
