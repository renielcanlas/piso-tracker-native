import { Stack, useRouter, useSegments } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import app from "../src/utils/firebase";

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [initialRoute, setInitialRoute] = React.useState(true);

  React.useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialRoute(false);
    });

    return unsubscribe;
  }, []);
  React.useEffect(() => {
    if (initialRoute) return; // Don't redirect on initial auth check

    const isPublicRoute = segments[0] === "login" || segments[0] === "terms" || segments[0] === "privacy" || segments[0] === "about";
    const isLoginScreen = segments[0] === "login";

    if (!user && !isPublicRoute) {
      // If not logged in and not on a public route, redirect to login
      router.replace("/");
    } else if (user && isLoginScreen) {
      // If logged in and on login screen, redirect to dashboard
      router.replace("/dashboard-tabs");
    }
  }, [user, segments, initialRoute, router]);

  return { user, initialRoute };
}

export default function RootLayout() {
  const { initialRoute } = useProtectedRoute();

  if (initialRoute) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack
        screenOptions={({ route }) => {          const headeredRoutes = {
            terms: "Terms of Use",
            privacy: "Privacy Policy",
            about: "About Us",
            "user-account": "User Account Management",
          };

          const routeName = route.name as keyof typeof headeredRoutes;
          const shouldShowHeader = routeName in headeredRoutes;

          return {
            headerShown: shouldShowHeader,
            headerTitle: shouldShowHeader ? headeredRoutes[routeName] : undefined,
            headerBackTitle: "Back",
          };
        }}
      />
    </PaperProvider>
  );
}
