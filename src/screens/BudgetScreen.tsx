import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function BudgetScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium">Budget</Text>
    </View>
  );
}
