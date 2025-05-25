import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import { Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AnimatedStars from "../components/AnimatedStars";
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
  }, []); // Empty dependency array means this effect runs once on mount

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
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: themeColors.primaryBlue,
              marginBottom: 8,
              textAlign: 'center',
              textShadowColor: themeColors.white,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 4,
              elevation: 2, // for Android shadow
            }}
          >
            Login with your account
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: themeColors.outlineBlue,
              textAlign: 'center',
              marginBottom: 24,
              textShadowColor: themeColors.white,
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 6,
              elevation: 1,
            }}
          >
            Saan na napunta ang pera mo?
          </Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 16, width: '100%' }}
            autoCapitalize="none"
            keyboardType="email-address"
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
          {error ? (
            <Text style={{ color: themeColors.googleRed, marginBottom: 16, textAlign: 'center' }}>
              {error}
            </Text>
          ) : null}
          <Button 
            mode="contained" 
            style={{ width: '100%', backgroundColor: themeColors.primaryBlue, borderRadius: 4 }} 
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24, width: '100%' }}>
            <View style={{ flex: 1, height: 2, backgroundColor: themeColors.yellow }} />
            <AnimatedStars />
            <View style={{ flex: 1, height: 2, backgroundColor: themeColors.yellow }} />
          </View>
          <Text style={{ fontSize: 13, color: themeColors.yellow, marginBottom: 12, textAlign: 'center' }}>
            or login with
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <Button
              mode="contained"
              style={{ flex: 1, marginRight: 8, backgroundColor: themeColors.primaryBlue, borderColor: themeColors.primaryBlue, borderWidth: 1 }}
              labelStyle={{ color: themeColors.white, fontWeight: 'bold' }}
              onPress={() => {}}
              icon="facebook"
            >
              Facebook
            </Button>
            <Button
              mode="contained"
              style={{ flex: 1, marginLeft: 8, backgroundColor: themeColors.googleRed, borderColor: themeColors.googleRed, borderWidth: 1 }}
              labelStyle={{ color: themeColors.white, fontWeight: 'bold' }}
              onPress={() => {}}
              icon="google"
            >
              Google
            </Button>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
            <Text style={{ color: themeColors.yellow, fontSize: 13 }}>
              Don&apos;t have an account?
            </Text>
            <Text
              style={{ color: themeColors.link, fontWeight: 'bold', marginLeft: 6, fontSize: 13, textDecorationLine: 'underline' }}
              onPress={() => setShowSignup(true)}
            >
              Sign up
            </Text>
          </View>
          {showSignup && (
            <SignupModal visible={showSignup} onClose={() => setShowSignup(false)} />
          )}
        </View>
      </View>
      {/* Footer with links */}
      <View style={{ width: '100%', alignItems: 'center', paddingBottom: 24, position: 'absolute', bottom: 0, left: 0, paddingTop: 12 }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: 'rgba(255,255,255,0.7)',
            zIndex: 0,
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', zIndex: 1 }}>
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
