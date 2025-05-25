import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import { Image, ScrollView, Text, useColorScheme, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AnimatedStars from "../components/AnimatedStars";
import SignupModal from "../components/SignupModal";
import { themeColors } from "../components/themeColors";
import app from "../utils/firebase";
import { pinoyMoneyPhrases } from "../utils/pinoySayings";

function LoginScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // Select a random phrase when component mounts
  const [randomPhrase] = React.useState(() =>
    pinoyMoneyPhrases[Math.floor(Math.random() * pinoyMoneyPhrases.length)]
  );

  React.useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        router.replace("/dashboard-tabs");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]); // Add router to dependencies

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard-tabs");
    } catch (err: any) {
      if (
        err?.message?.includes('auth has not been registered yet') ||
        err?.message?.includes('A network Auth instance was not found')
      ) {
        setError(
          'Authentication is temporarily unavailable. Please restart the app.'
        );
      } else {
        setError(err.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputTheme = {
    colors: {
      primary: themeColors.facebookBlue,
      outline: themeColors.facebookBlue,
      placeholder: colorScheme === 'dark' ? themeColors.textLight : themeColors.textDark,
      text: colorScheme === 'dark' ? themeColors.white : themeColors.textDark
    }
  };

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
      />      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'
        }}
        pointerEvents="none"
      />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24 }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 120, height: 120, marginBottom: 24 }}
            resizeMode="contain"
            accessibilityLabel="App logo"
          />
          <View style={{ alignItems: 'center', width: '80%' }}>
            <View style={{ marginBottom: 24 }}>              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: colorScheme === 'dark' ? themeColors.white : themeColors.primaryBlue,
                  textAlign: 'center',
                  marginBottom: 8
                }}>
                Login with your account
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: themeColors.googleRed,
                  textAlign: 'center'
                }}>
                {randomPhrase}
              </Text>
            </View>

            {error ? (
              <View style={{ marginBottom: 16, width: '100%' }}>
                <Text style={{ color: themeColors.googleRed, textAlign: 'center' }}>{error}</Text>
              </View>
            ) : null}

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={{ marginBottom: 16, width: '100%' }}
              autoCapitalize="none"
              keyboardType="email-address"
              theme={inputTheme}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              mode="outlined"
              style={{ marginBottom: 24, width: '100%' }}
              theme={inputTheme}
              right={
                <TextInput.Icon
                  icon={showPassword ? EyeOff : Eye}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={{
                width: '100%',
                marginBottom: 16,
                backgroundColor: themeColors.primaryBlue,
                borderRadius: 4
              }}
              textColor={themeColors.white}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text style={{ color: colorScheme === 'dark' ? themeColors.textLight : themeColors.textDark }}>
                Don&apos;t have an account?{' '}
              </Text>
              <Button
                mode="text"
                onPress={() => setShowSignup(true)}
                style={{ marginLeft: -8 }}
                textColor={themeColors.facebookBlue}>
                Sign up
              </Button>
            </View>

            <AnimatedStars />

            <View style={{ width: '100%', flexDirection: 'row', gap: 12, marginTop: 16 }}>
              <Button
                mode="contained"
                onPress={() => {/* TODO: Implement Facebook login */}}
                style={{
                  flex: 1,
                  borderRadius: 4,
                  backgroundColor: themeColors.facebookBlue
                }}
                textColor={themeColors.white}
                icon="facebook">
                Facebook
              </Button>

              <Button
                mode="contained"
                onPress={() => {/* TODO: Implement Google login */}}
                style={{
                  flex: 1,
                  borderRadius: 4,
                  backgroundColor: themeColors.googleRed
                }}
                textColor={themeColors.white}
                icon="google">
                Google
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}      <View style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 16,
        backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',      }}>        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Button
            mode="text"
            onPress={() => router.push("/terms")}
            textColor={colorScheme === 'dark' ? themeColors.white : themeColors.textDark}
            compact>
            Terms of Use
          </Button>
          <Text style={{ color: colorScheme === 'dark' ? themeColors.white : themeColors.textDark, alignSelf: 'center', marginHorizontal: 4 }}>•</Text>
          <Button
            mode="text"
            onPress={() => router.push("/privacy")}
            textColor={colorScheme === 'dark' ? themeColors.white : themeColors.textDark}
            compact>
            Privacy Policy
          </Button>
          <Text style={{ color: colorScheme === 'dark' ? themeColors.white : themeColors.textDark, alignSelf: 'center', marginHorizontal: 4 }}>•</Text>
          <Button
            mode="text"
            onPress={() => router.push("/about")}
            textColor={colorScheme === 'dark' ? themeColors.white : themeColors.textDark}
            compact>
            About Us
          </Button>
        </View>
      </View>

      <SignupModal
        visible={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </View>
  );
}

export default LoginScreen;
