import * as React from "react";
import { Text, View } from "react-native";

const SignupScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>
      <Text style={{ marginTop: 12, color: "#555" }}>
        Signup form goes here.
      </Text>
    </View>
  );
};

export default SignupScreen;
