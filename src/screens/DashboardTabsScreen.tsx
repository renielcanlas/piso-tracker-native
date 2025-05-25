import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import { List } from "react-native-paper";
import { themeColors } from "../components/themeColors";
import AccountsScreen from "./AccountsScreen";
import BudgetScreen from "./BudgetScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import TransactionsScreen from "./TransactionsScreen";

const Tab = createBottomTabNavigator();

export default function DashboardTabsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tab.Navigator      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderTopColor: isDark ? '#333333' : '#e0e0e0'
        },
        tabBarActiveTintColor: themeColors.primaryBlue,
        tabBarInactiveTintColor: isDark ? themeColors.textLight : themeColors.textDark,
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: isDark ? themeColors.white : themeColors.textDark,
        contentStyle: {
          backgroundColor: isDark ? '#000000' : '#f5f5f5'
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Accounts":
              iconName = "wallet";
              break;
            case "Transactions":
              iconName = "hand-coin";
              break;
            case "Budget":
              iconName = "chart-pie";
              break;
            case "Settings":
              iconName = "cog";
              break;
            default:
              iconName = "circle";
          }
          return <List.Icon icon={iconName} color={color} style={{ margin: 0 }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Accounts" component={AccountsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
