import WidgetList from "@/components/DraggableList/WidgetList";
import { Dropdown } from "@/components/Dropdown";
import { RoundBtn } from "@/components/RoundButton";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/BalanceStore";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function DashboardPage() {
  const balanceStore = useBalanceStore();

  const onAddMoney = () => {
    balanceStore.runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: `Transaction: ${new Date().toLocaleDateString()}`,
    });
  };

  const onExchange = () => {
    balanceStore.clearTransactions();
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balanceStore.balance}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon="add" text="Add money" onPress={onAddMoney} />
        <RoundBtn icon="refresh" text="Exchange" onPress={onExchange} />
        <RoundBtn icon="list" text="Details" />
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

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {balanceStore.transactions.length === 0 && <Text style={{ color: Colors.gray }}>No transactions yet</Text>}
        {balanceStore.transactions.map((tr) => (
          <View key={tr.id} style={styles.transaction}>
            <View style={styles.circle}>
              <Ionicons name={tr.amount > 0 ? "add" : "remove"} size={24} color={Colors.dark} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "400" }}>{tr.title}</Text>
              <Text style={{ fontSize: 12, color: Colors.gray }}>{tr.date.toLocaleString()}</Text>
            </View>
            <Text>{tr.amount}€</Text>
          </View>
        ))}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
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
  transactions: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
