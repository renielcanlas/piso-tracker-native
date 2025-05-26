import { Stack } from "expo-router";
import * as React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { themeColors } from "../src/components/themeColors";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <PaperProvider>
      <Stack
        screenOptions={({ route }) => {
          const headeredRoutes = {
            terms: "Terms of Use",
            privacy: "Privacy Policy",
            about: "About Us",
            "user-account": "User Account Management",
          };

          const routeName = route.name as keyof typeof headeredRoutes;
          const shouldShowHeader = routeName in headeredRoutes;          return {
            headerShown: shouldShowHeader,
            headerTitle: shouldShowHeader ? headeredRoutes[routeName] : undefined,
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff'
            },
            headerTintColor: isDark ? themeColors.white : themeColors.textDark,
            headerShadowVisible: false
          };
        }}
      />
    </PaperProvider>
  );
}
