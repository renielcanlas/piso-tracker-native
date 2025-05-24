import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { List } from "react-native-paper";
import AccountsScreen from "./AccountsScreen";
import BudgetScreen from "./BudgetScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import TransactionsScreen from "./TransactionsScreen";

const Tab = createBottomTabNavigator();

export default function DashboardTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
