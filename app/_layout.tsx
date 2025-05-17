import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        if (route.name === "terms" || route.name === "privacy") {
          return {
            headerShown: true,
            headerTitle:
              route.name === "terms" ? "Terms of Use" : "Privacy Policy",
            headerBackTitle: "Back",
          };
        }
        return { headerShown: false };
      }}
    />
  );
}
