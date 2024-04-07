import { Dropdown } from "@/components/Dropdown";
import { RoundBtn } from "@/components/RoundButton";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function DashboardPage() {
  const onAddMoney = () => {
    //
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>1420</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon="add" text="Add money" onPress={onAddMoney} />
        <RoundBtn icon="refresh" text="Exchange" onPress={onAddMoney} />
        <RoundBtn icon="list" text="Details" onPress={onAddMoney} />
        <Dropdown
          items={[
            {
              text: "Statement",
              iosIcon: "list.bullet.rectangle.fill",
            },
            {
              text: "Converter",
              iosIcon: "coloncurrencysign.arrow.circlepath",
            },
            {
              text: "Background",
              iosIcon: "photo.fill",
            },
            {
              text: "Add new account",
              iosIcon: "plus.rectangle.on.folder.fill",
            },
          ]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 20,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
