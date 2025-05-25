import * as React from "react";
import { ScrollView, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../components/themeColors";

export default function PrivacyScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#000000' : '#f5f5f5', padding: 16 }}>
      <Text style={{ marginBottom: 12, color: isDark ? themeColors.white : themeColors.textDark }}>
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
        4. You may request deletion of your data by contacting pisotracker@zerulean.ph.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        5. Piso Tracker may update this policy. Continued use of the app means you accept the updated policy.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        6. For privacy concerns, contact pisotracker@zerulean.ph.
      </Text>
    </ScrollView>
  );
}
