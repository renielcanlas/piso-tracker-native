import * as React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { List } from "react-native-paper";

// Define types for type safety
interface Account {
  name: string;
  icon: any;
  balance: number;
}
interface AccountGroup {
  category: string;
  accounts: Account[];
}

const accountsData: AccountGroup[] = [
  {
    category: "Cash",
    accounts: [
      { name: "Wallet", icon: require("../../assets/images/partial-react-logo.png"), balance: 1500 },
      { name: "Petty Cash", icon: require("../../assets/images/partial-react-logo.png"), balance: 500 },
    ],
  },
  {
    category: "Bank",
    accounts: [
      { name: "BPI Savings", icon: require("../../assets/images/icon.png"), balance: 25000 },
      { name: "BDO Checking", icon: require("../../assets/images/icon.png"), balance: 12000 },
    ],
  },
  {
    category: "Digital Wallet",
    accounts: [
      { name: "GCash", icon: require("../../assets/images/favicon.png"), balance: 800 },
      { name: "PayMaya", icon: require("../../assets/images/favicon.png"), balance: 1200 },
    ],
  },
  {
    category: "Credit Card",
    accounts: [
      { name: "BPI Amore Visa", icon: require("../../assets/images/splash-icon.png"), balance: -5000 },
      { name: "BDO Mastercard", icon: require("../../assets/images/splash-icon.png"), balance: -3000 },
    ],
  },
];

export default function AccountsScreen() {
  // Calculate summary
  const summary = React.useMemo<Record<string, number>>(() => {
    const result: Record<string, number> = {};
    for (const group of accountsData) {
      for (const account of group.accounts) {
        result[group.category] = (result[group.category] || 0) + account.balance;
      }
    }
    return result;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          {accountsData.map((group) => (
            <View key={group.category} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{group.category}</Text>
              {group.accounts.map((account) => (
                <List.Item
                  key={account.name}
                  title={account.name}
                  left={() => <Image source={account.icon} style={{ width: 40, height: 40, marginRight: 16 }} />}
                  right={() => <Text style={{ fontWeight: "bold" }}>{account.balance}</Text>}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
