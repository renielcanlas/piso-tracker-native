import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button as PaperButton, TextInput as PaperTextInput } from "react-native-paper";
import app from "../utils/firebase";
import { themeColors } from "./themeColors";

interface SignupModalProps {
  visible: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ visible, onClose }) => {
  const [fatalError, setFatalError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = React.useState(false);

  let auth;
  try {
    auth = getAuth(app);
  } catch (e: any) {
    setFatalError(
      'A critical error occurred with authentication. Please fully close and reopen the app.'
    );
    return null;
  }

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 1 uppercase, 1 number, and 6+ chars
    return /[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 6;
  };

  const handleSignup = async () => {
    if (!email || !password || !verifyPassword) {
      setError("All fields are required.");
      return;
    }
    if (password.trim().length === 0) {
      setError("Password is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters, include 1 uppercase letter and 1 number.");
      return;
    }
    if (password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      // If the error is the auth component error, show a user-friendly message
      if (
        err?.message?.includes('auth has not been registered yet') ||
        err?.message?.includes('A network Auth instance was not found')
      ) {
        setFatalError(
          'Authentication is temporarily unavailable. Please fully close and reopen the app.'
        );
      } else {
        setError(err.message || "Signup failed. Please try again.");
      }
    }
  };

  if (fatalError) {
    return (
      <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.error}>{fatalError}</Text>
            <PaperButton mode="contained" onPress={onClose} style={{ backgroundColor: themeColors.primaryBlue, borderRadius: 4 }} labelStyle={{ color: themeColors.white }}>
              Close
            </PaperButton>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Remove TouchableWithoutFeedback for best web compatibility */}
        <View style={styles.modal}>
          <Text style={styles.title}>Start using the app</Text>
          <PaperTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 16, width: '100%' }}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
          />
          <PaperTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 16, width: '100%' }}
            secureTextEntry={!showPassword}
            mode="outlined"
            theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
            right={
              <PaperTextInput.Icon
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
          <PaperTextInput
            label="Verify Password"
            value={verifyPassword}
            onChangeText={setVerifyPassword}
            style={{ marginBottom: 24, width: '100%' }}
            secureTextEntry={!showVerifyPassword}
            mode="outlined"
            theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
            right={
              <PaperTextInput.Icon
                onPress={() => setShowVerifyPassword((prev) => !prev)}
                icon={() => showVerifyPassword ? (
                  <EyeOff size={20} color={themeColors.outlineBlue} />
                ) : (
                  <Eye size={20} color={themeColors.outlineBlue} />
                )}
                forceTextInputFocus={false}
              />
            }
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <PaperButton mode="contained" onPress={onClose} style={{ backgroundColor: themeColors.googleRed, flex: 1, marginRight: 8, borderRadius: 4 }} labelStyle={{ color: themeColors.white }}>
              Cancel
            </PaperButton>
            <PaperButton mode="contained" onPress={handleSignup} style={{ backgroundColor: themeColors.primaryBlue, flex: 1, marginLeft: 8, borderRadius: 4 }} labelStyle={{ color: themeColors.white }}>
              Sign Up
            </PaperButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: themeColors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: themeColors.primaryBlue,
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    marginBottom: 14,
    fontSize: 16,
    color: themeColors.primaryBlue,
    backgroundColor: themeColors.white,
  },
  error: {
    color: themeColors.googleRed,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SignupModal;
