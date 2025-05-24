import * as React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function PrivacyScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Privacy Policy</Text>
      <Text style={{ marginBottom: 12 }}>
        Piso Tracker values your privacy. This policy explains how we collect, use, and protect your information:
      </Text>
      <Text style={{ marginBottom: 8 }}>
        1. We collect only the data you provide for expense tracking and budgeting purposes.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        2. Your data is stored securely and is not shared with third parties, except as required by Philippine law.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        3. Piso Tracker does not sell or rent your personal information.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        4. You may request deletion of your data by contacting support@pisotracker.ph.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        5. Piso Tracker may update this policy. Continued use of the app means you accept the updated policy.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        6. For privacy concerns, contact support@pisotracker.ph.
      </Text>
    </ScrollView>
  );
}
