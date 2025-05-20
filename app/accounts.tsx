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
      { name: "Wallet", icon: require("../assets/images/partial-react-logo.png"), balance: 1500 },
      { name: "Petty Cash", icon: require("../assets/images/partial-react-logo.png"), balance: 500 },
    ],
  },
  {
    category: "Bank",
    accounts: [
      { name: "BPI Savings", icon: require("../assets/images/icon.png"), balance: 25000 },
      { name: "BDO Checking", icon: require("../assets/images/icon.png"), balance: 12000 },
    ],
  },
  {
    category: "Digital Wallet",
    accounts: [
      { name: "GCash", icon: require("../assets/images/favicon.png"), balance: 800 },
      { name: "PayMaya", icon: require("../assets/images/favicon.png"), balance: 1200 },
    ],
  },
  {
    category: "Credit Card",
    accounts: [
      { name: "BPI Amore Visa", icon: require("../assets/images/splash-icon.png"), balance: -5000 },
      { name: "BDO Mastercard", icon: require("../assets/images/splash-icon.png"), balance: -3000 },
    ],
  },
];

export default function AccountsScreen() {
  // Calculate summary
  const summary = React.useMemo<Record<string, number>>(() => {
    const result: Record<string, number> = {};
    let total = 0;
    accountsData.forEach((group) => {
      const groupTotal = group.accounts.reduce((sum, acc) => sum + acc.balance, 0);
      result[group.category] = groupTotal;
      total += groupTotal;
    });
    result["Total"] = total;
    return result;
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc", padding: 4 }}>
      {/* Summary Section */}
      <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 2 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 6 }}>Accounts Overview</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
          <Text style={{ color: '#666', fontSize: 14 }}>Total</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#222' }}>₱{summary.Total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>
        {accountsData.map((group) => {
          const groupBalance = summary[group.category] ?? 0;
          return (
            <View key={group.category} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 }}>
              <Text style={{ color: '#888', fontSize: 13 }}>{group.category}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 13, color: groupBalance < 0 ? '#d32f2f' : '#222' }}>
                ₱{groupBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            </View>
          );
        })}
      </View>
      {accountsData.map((group) => (
        <List.Section
          key={group.category}
          style={{ marginBottom: 6, backgroundColor: '#fff', borderRadius: 8, elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2, minHeight: 36, paddingVertical: 0 }}
        >
          <List.Subheader style={{ fontWeight: 'bold', fontSize: 15, color: '#588157', marginBottom: 0 }}>{group.category}</List.Subheader>
          {group.accounts.map((account, idx) => (
            <List.Item
              key={account.name}
              title={account.name}
              description={`₱${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              descriptionStyle={{ color: account.balance < 0 ? '#d32f2f' : '#222', fontWeight: 'bold', fontSize: 13, marginTop: 0 }}
              titleStyle={{ fontSize: 14, fontWeight: '500', color: '#222' }}
              style={{
                backgroundColor: idx % 2 === 0 ? '#f4f7f9' : '#fff',
                borderRadius: 6,
                marginHorizontal: 4,
                marginVertical: 1,
                paddingVertical: 2,
                minHeight: 36,
              }}
              left={() => (
                <Image
                  source={account.icon}
                  style={{ width: 24, height: 24, borderRadius: 6, marginRight: 8, borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fff' }}
                />
              )}
              onPress={() => {}}
            />
          ))}
        </List.Section>
      ))}
    </ScrollView>
  );
}
