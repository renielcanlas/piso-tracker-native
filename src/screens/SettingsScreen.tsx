import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import * as React from "react";
import { View } from "react-native";
import { Divider, List } from "react-native-paper";
import app from "../utils/firebase";

function SettingsScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const auth = getAuth(app);
  const userEmail = auth.currentUser?.email;

  const handleLogout = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <List.Section>
        <List.Subheader>Profile</List.Subheader>
        <List.Item
          title="Email"
          description={userEmail || "Not signed in"}
          left={(props) => <List.Icon {...props} icon="email" />}
        />
        <List.Item
          title="User Account Management"
          left={(props) => <List.Icon {...props} icon="account-cog" />}
          onPress={() => router.push('/user-account')}
        />
        <List.Item
          title="Logout"
          left={(props) => <List.Icon {...props} icon="logout" color="#d32f2f" />}
          titleStyle={{ color: '#d32f2f' }}
          onPress={handleLogout}
          disabled={loading}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>App Settings</List.Subheader>
        <List.Item
          title="Manage Categories"
          left={(props) => <List.Icon {...props} icon="format-list-bulleted" />}
          onPress={() => {}}
        />
        <List.Item
          title="Recurring Transactions"
          left={(props) => <List.Icon {...props} icon="repeat" />}
          onPress={() => {}}
        />
        <List.Item
          title="Import/Export"
          left={(props) => <List.Icon {...props} icon="import" />}
          onPress={() => {}}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>App Info</List.Subheader>
        <List.Item
          title="About Us"
          left={(props) => <List.Icon {...props} icon="information" />}
          onPress={() => {}}
        />
        <List.Item
          title="Privacy Policy"
          left={(props) => <List.Icon {...props} icon="shield-lock" />}
          onPress={() => {}}
        />
        <List.Item
          title="Terms of Service"
          left={(props) => <List.Icon {...props} icon="file-document" />}
          onPress={() => {}}
        />
      </List.Section>
    </View>
  );
}

export default SettingsScreen;
