import * as React from "react";
import { ScrollView, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../components/themeColors";

export default function TermsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#000000' : '#f5f5f5', padding: 16 }}>
      <Text style={{ marginBottom: 12, color: isDark ? themeColors.white : themeColors.textDark }}>
        Welcome to Piso Tracker! By using this expense tracking application, you agree to the following terms:
      </Text>
      <Text style={{ marginBottom: 8 }}>
        1. Piso Tracker is intended for personal finance management and budgeting for users in the Philippines.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        2. You are responsible for the accuracy of the data you enter. Piso Tracker is not liable for any financial loss or data inaccuracies.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        3. You agree not to use Piso Tracker for any unlawful activities under Philippine law.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        4. Piso Tracker may update these terms at any time. Continued use of the app means you accept the updated terms.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        5. All content and features are provided &quot;as is&quot; without warranty. Piso Tracker is not responsible for any damages arising from use of the app.
      </Text>
      <Text style={{ marginBottom: 8 }}>
        6. For questions, contact pisotracker@zerulean.ph.
      </Text>
    </ScrollView>
  );
}
