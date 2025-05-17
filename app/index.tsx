import { useRouter } from "expo-router";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Checkbox, Divider, Text, TextInput } from "react-native-paper";

export default function Index() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/react-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.input}
        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
      />
      <View style={styles.rememberMeRow}>
        <Checkbox
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Text style={styles.rememberMeLabel}>Remember me</Text>
      </View>
      <Button 
        mode="contained" 
        style={styles.button}
        onPress={() => router.replace({ pathname: "/dashboard-tabs" as any })}
      >
        Login
      </Button>
      <View style={styles.row}>
        <Button
          mode="text"
          onPress={() => {}}
          style={[styles.linkButton, styles.linkButtonLarge]}
          labelStyle={styles.linkLabel}
          contentStyle={styles.linkContent}
        >
          Forgot password?
        </Button>
        <Button
          mode="text"
          onPress={() => {}}
          style={[styles.linkButton, styles.linkButtonLarge]}
          labelStyle={styles.linkLabel}
          contentStyle={styles.linkContent}
        >
          Sign up
        </Button>
      </View>
      <Divider style={styles.divider} />
      <Button
        icon="google"
        mode="elevated"
        style={styles.socialButton}
        onPress={() => {}}
      >
        Sign in with Google
      </Button>
      <Button
        icon="facebook"
        mode="elevated"
        style={styles.socialButton}
        onPress={() => {}}
      >
        Sign in with Facebook
      </Button>
      <View style={styles.footer}>
        <Text style={styles.footerLink} onPress={() => router.push("/terms")}>
          Terms of Use
        </Text>
        <Text style={styles.footerSeparator}>·</Text>
        <Text style={styles.footerLink} onPress={() => router.push("/privacy")}>
          Privacy Policy
        </Text>
        <Text style={styles.footerSeparator}>·</Text>
        <Text style={styles.footerLink} onPress={() => {}}>
          Help
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: 64,
    height: 64,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 22,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
    minHeight: 36,
  },
  divider: {
    marginVertical: 8,
  },
  socialButton: {
    marginBottom: 6,
    minHeight: 36,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  linkButton: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    minWidth: 0,
  },
  linkButtonLarge: {
    minHeight: 40, // larger touch target
    minWidth: 100,
    marginHorizontal: 4,
  },
  linkLabel: {
    fontSize: 15, // slightly larger
    textDecorationLine: "underline",
    paddingVertical: 8, // more vertical padding
  },
  linkContent: {
    minHeight: 40,
    justifyContent: "center",
  },
  rememberMeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16, // increased spacing
  },
  checkbox: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  rememberMeLabel: {
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    flexWrap: "wrap",
  },
  footerLink: {
    color: "#888",
    fontSize: 12,
    marginHorizontal: 2,
    textDecorationLine: "underline",
  },
  footerSeparator: {
    color: "#bbb",
    fontSize: 12,
  },
});
