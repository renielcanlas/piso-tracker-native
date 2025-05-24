import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import { Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AnimatedStars from "../components/AnimatedStars";
import { themeColors } from "../components/themeColors";

function LoginScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Image
        source={require("../../assets/images/man-phone.jpg")}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        accessibilityLabel="Background image"
        accessible
        blurRadius={8}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.7)'
        }}
        pointerEvents="none"
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 120, height: 120, marginBottom: 24 }}
          resizeMode="contain"
          accessibilityLabel="App logo"
        />
        <View style={{ alignItems: 'center', width: '80%' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' }}>
            Login with your account
          </Text>
          <Text style={{ fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 24 }}>
            Saan na napunta ang pera mo?
          </Text>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={{ marginBottom: 16, width: '100%' }}
            autoCapitalize="none"
            mode="outlined"
            theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{ marginBottom: 24, width: '100%' }}
            mode="outlined"
            theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
            right={
              <TextInput.Icon
                onPress={() => setShowPassword((prev) => !prev)}
                icon={() => showPassword ? (
                  <EyeOff size={20} color={themeColors.outlineBlue} />
                ) : (
                  <Eye size={20} color={themeColors.outlineBlue} />
                )}
                forceTextInputFocus={false}
              />
            }
          />
          <Button mode="contained" style={{ width: '100%', backgroundColor: themeColors.primaryBlue, borderRadius: 4 }} onPress={() => {}}>
            Login
          </Button>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24, width: '100%' }}>
            <View style={{ flex: 1, height: 2, backgroundColor: themeColors.yellow }} />
            <AnimatedStars />
            <View style={{ flex: 1, height: 2, backgroundColor: themeColors.yellow }} />
          </View>
          <Text style={{ fontSize: 13, color: '#888', marginBottom: 12, textAlign: 'center' }}>
            or login with
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <Button
              mode="contained"
              style={{ flex: 1, marginRight: 8, backgroundColor: themeColors.primaryBlue, borderColor: themeColors.primaryBlue, borderWidth: 1 }}
              labelStyle={{ color: themeColors.white, fontWeight: 'bold' }}
              onPress={() => {}}
            >
              Facebook
            </Button>
            <Button
              mode="contained"
              style={{ flex: 1, marginLeft: 8, backgroundColor: themeColors.googleRed, borderColor: themeColors.googleRed, borderWidth: 1 }}
              labelStyle={{ color: themeColors.white, fontWeight: 'bold' }}
              onPress={() => {}}
            >
              Google
            </Button>
          </View>
        </View>
      </View>
      {/* Footer with links */}
      <View style={{ width: '100%', alignItems: 'center', paddingBottom: 24, position: 'absolute', bottom: 0, left: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: themeColors.link, textDecorationLine: 'underline', marginHorizontal: 8 }} onPress={() => router.push('/terms')}>
            Terms of Service
          </Text>
          <Text style={{ color: themeColors.link, textDecorationLine: 'underline', marginHorizontal: 8 }} onPress={() => router.push('/privacy')}>
            Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
