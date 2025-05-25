import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

function TransactionsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text variant="headlineMedium">Transactions</Text>
      </View>
    </View>
  );
}

export default TransactionsScreen;
