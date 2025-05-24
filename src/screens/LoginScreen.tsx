import { useRouter } from "expo-router";
import * as React from "react";
import { Image, View } from "react-native";
import { Button, Checkbox, Divider, Text, TextInput, useTheme } from "react-native-paper";
import defaultScreenStyles from "../components/defaultScreenStyles";

function LoginScreen() {
  const { colors } = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  return (
    <View
      style={[defaultScreenStyles.screenContainer, { backgroundColor: colors.background }]}
      accessible
      accessibilityLabel="Login screen"
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={defaultScreenStyles.screenLogo}
        resizeMode="contain"
        accessibilityLabel="App logo"
        accessible
      />
      <Text
        variant="headlineMedium"
        style={defaultScreenStyles.screenTitle}
        accessibilityRole="header"
        accessibilityLabel="Login title"
      >
        Login with your account
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={defaultScreenStyles.input}
        autoCapitalize="none"
        accessibilityLabel="Username input"
        accessible
        mode="outlined"
        theme={{ colors: { primary: colors.primary } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={defaultScreenStyles.input}
        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} accessibilityLabel={showPassword ? "Hide password" : "Show password"} />}
        accessibilityLabel="Password input"
        accessible
        mode="outlined"
        theme={{ colors: { primary: colors.primary } }}
      />
      <View style={defaultScreenStyles.row} accessible accessibilityLabel="Remember me row">
        <Checkbox
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Text style={defaultScreenStyles.label} accessibilityLabel="Remember me label">Remember me</Text>
      </View>
      <Button
        mode="contained"
        style={defaultScreenStyles.button}
        onPress={() => router.replace({ pathname: "/dashboard-tabs" as any })}
        accessibilityLabel="Login button"
        accessibilityRole="button"
        buttonColor={colors.primary}
        textColor={colors.onPrimary}
      >
        Login
      </Button>
      <Divider style={defaultScreenStyles.divider} />
      <Button
        mode="outlined"
        style={defaultScreenStyles.alignCenter}
        onPress={() => {}}
        accessibilityLabel="Forgot password button"
        accessibilityRole="button"
        textColor={colors.primary}
      >
        Forgot password?
      </Button>
    </View>
  );
}

export default LoginScreen;
