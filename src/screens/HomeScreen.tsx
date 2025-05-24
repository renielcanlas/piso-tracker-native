import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium">Home</Text>
    </View>
  );
}

export default HomeScreen;
