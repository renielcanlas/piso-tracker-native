import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../components/themeColors";

export default function AboutScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <View style={{ marginBottom: 24 }}>
        <Text 
          variant="headlineMedium" 
          style={{ 
            color: themeColors.primaryBlue,
            marginBottom: 16,
            textAlign: 'center'
          }}>
          About Piso Tracker
        </Text>
        
        <Text style={{ marginBottom: 12, fontSize: 16, lineHeight: 24 }}>
          Piso Tracker is your personal finance companion designed specifically for Filipinos. Our mission is to help you take control of your finances and achieve your financial goals.
        </Text>

        <Text style={{ marginBottom: 12, fontSize: 16, lineHeight: 24 }}>
          Features:
        </Text>
        
        <Text style={{ marginBottom: 8, marginLeft: 16 }}>• Expense tracking in Philippine Peso</Text>
        <Text style={{ marginBottom: 8, marginLeft: 16 }}>• Budget management</Text>
        <Text style={{ marginBottom: 8, marginLeft: 16 }}>• Multiple account tracking</Text>
        <Text style={{ marginBottom: 8, marginLeft: 16 }}>• Secure data storage</Text>
        <Text style={{ marginBottom: 16, marginLeft: 16 }}>• Custom Filipino categories</Text>        <Text style={{ marginBottom: 24, fontSize: 16, lineHeight: 24 }}>
          Our team is dedicated to providing you with the best tools to manage your money effectively while keeping your data secure and private.
        </Text>

        <View style={{ alignItems: 'center', marginBottom: 24 }}>          <Image
            source={require("../../assets/images/zerulean_cloud.png")}
            style={{ width: 200, height: 50, marginBottom: 12 }}
            resizeMode="contain"
            accessibilityLabel="Zerulean Technologies logo"
          />
          <Text style={{ fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 8 }}>
            Built with ❤️ by Zerulean Technologies
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24, textAlign: 'center', color: themeColors.textLight }}>
            Contact us at: pisotracker@zerulean.ph
          </Text>
        </View>

        <Text style={{ fontSize: 14, lineHeight: 20, textAlign: 'center', color: themeColors.textLight }}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}
