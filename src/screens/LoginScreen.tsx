import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import { Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import SignupModal from "../components/SignupModal";
import { themeColors } from "../components/themeColors";
import app from "../utils/firebase";

function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false); // Local state to control the signup modal
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
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
          backgroundColor: 'rgba(255,255,255,0.4)' // decreased opacity from 0.7 to 0.5
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
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: themeColors.primaryBlue,
                textAlign: 'center',
                marginBottom: 8
              }}>
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: themeColors.textDark,
                textAlign: 'center'
              }}>
              Sign in to continue tracking your finances
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
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            style={{ marginBottom: 24, width: '100%' }}
            right={
              <TextInput.Icon
                icon={showPassword ? EyeOff : Eye}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={{
              width: '100%',
              marginBottom: 16,
              backgroundColor: themeColors.primaryBlue
            }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={{ color: themeColors.textDark }}>
              Don&apos;t have an account?{' '}
            </Text>
            <Button
              mode="text"
              onPress={() => setShowSignup(true)}
              style={{ marginLeft: -8 }}>
              Sign up
            </Button>
          </View>
        </View>
      </View>      <SignupModal
        visible={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </View>
  );
}

export default LoginScreen;
