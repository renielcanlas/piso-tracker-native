import { useRouter } from "expo-router";
import * as React from "react";
import { Image, ScrollView, useColorScheme, View } from "react-native";
import { Divider, List } from "react-native-paper";

function SettingsScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // const auth = getAuth(app);
      // await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#000000' : '#f5f5f5' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <List.Section>
          <List.Subheader>Profile</List.Subheader>
        <List.Item
          title="Email"
          description= "Not signed in"
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
      </List.Section>      <Divider />
      <List.Section>
        <List.Subheader>App Info</List.Subheader>
        <List.Item
          title="About Us"
          left={(props) => <List.Icon {...props} icon="information" />}
          onPress={() => router.push('/about')}
        />
        <List.Item
          title="Privacy Policy"
          left={(props) => <List.Icon {...props} icon="shield-lock" />}
          onPress={() => router.push('/privacy')}
        />
        <List.Item
          title="Terms of Service"
          left={(props) => <List.Icon {...props} icon="file-document" />}
          onPress={() => router.push('/terms')}
        />        <List.Item
          title="Created by Zerulean Technologies"
          description="© 2025 All rights reserved"
          left={() => (
            <View style={{ justifyContent: 'center', marginLeft: 8, marginRight: 4 }}>
              <Image
                source={require("../../assets/images/zerulean_cloud.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </View>
          )}
          disabled
        />  
      </List.Section>
      </ScrollView>
    </View>
  );
}

export default SettingsScreen;
