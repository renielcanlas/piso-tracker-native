import { BadgeDollarSign, Banknote, CreditCard, Landmark, PiggyBank, Smartphone, Wallet } from "lucide-react-native";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
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
      { name: "Wallet", icon: Wallet, balance: 1500 },
      { name: "Petty Cash", icon: PiggyBank, balance: 500 },
    ],
  },
  {
    category: "Bank",
    accounts: [
      { name: "BPI Savings", icon: Landmark, balance: 25000 },
      { name: "BDO Checking", icon: Banknote, balance: 12000 },
    ],
  },
  {
    category: "Digital Wallet",
    accounts: [
      { name: "GCash", icon: Smartphone, balance: 800 },
      { name: "PayMaya", icon: BadgeDollarSign, balance: 1200 },
    ],
  },
  {
    category: "Credit Card",
    accounts: [
      { name: "BPI Amore Visa", icon: CreditCard, balance: -5000 },
      { name: "BDO Mastercard", icon: CreditCard, balance: -3000 },
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
                  left={() => <account.icon size={32} style={{ marginRight: 16 }} color="#555" />}
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
