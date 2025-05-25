import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import AnimatedStars from "../components/AnimatedStars";
import AvatarModal from "../components/AvatarModal";
import { themeColors } from "../components/themeColors";
import app, { loadUserAvatarSettings, saveUserAvatarSettings } from "../utils/firebase";

export default function UserAccountScreen() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [showAvatarModal, setShowAvatarModal] = React.useState(false);
  const [currentIcon, setCurrentIcon] = React.useState('account');
  const [currentColor, setCurrentColor] = React.useState(themeColors.outlineDark);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [passwordErrors, setPasswordErrors] = React.useState({
    newPassword: false,
    confirmPassword: false
  });
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordLoading, setPasswordLoading] = React.useState(false);
  // Load saved avatar settings on component mount
  React.useEffect(() => {
    async function loadAvatarSettings() {
      if (user) {
        console.log('Loading avatar settings for user:', user.uid);
        setLoading(true);
        const settings = await loadUserAvatarSettings(user.uid);
        console.log('Loaded settings:', settings);
        if (settings) {
          console.log('Updating UI with settings:', settings);
          setCurrentIcon(settings.icon);
          setCurrentColor(settings.color);
        }
        setLoading(false);
      } else {
        console.log('No user found, skipping avatar settings load');
      }
    }
    
    loadAvatarSettings();
  }, [user]);  const handleAvatarSave = async (icon: string, color: string) => {
    if (!user) {
      console.log('No user found, cannot save avatar settings');
      return;
    }
    
    setSaveLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log('Attempting to save settings for user:', user.uid);
      const success = await saveUserAvatarSettings(user.uid, icon, color);
      
      if (success) {
        // Only update UI if save was successful
        setCurrentIcon(icon);
        setCurrentColor(color);
        setSuccess("Avatar updated successfully!");
        setShowSnackbar(true);
        setShowAvatarModal(false);
      } else {
        // Keep modal open if save failed
        setError("Failed to save avatar settings. Please try again.");
      }
    } catch (err: any) {
      console.error("Error saving avatar:", err);
      if (err.code === 'permission-denied') {
        setError("You don't have permission to update avatar settings.");
      } else if (err.code === 'unavailable') {
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        setError("Failed to save avatar settings. Please try again.");
      }
    } finally {
      setSaveLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const handlePasswordChange = (text: string) => {
    setNewPassword(text);
    setPasswordErrors(prev => ({
      ...prev,
      newPassword: text.length > 0 && !validatePassword(text),
      confirmPassword: confirmPassword.length > 0 && text !== confirmPassword
    }));
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordErrors(prev => ({
      ...prev,
      confirmPassword: text.length > 0 && text !== newPassword
    }));
  };

  const handleUpdatePassword = async () => {
    if (!user || !currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      setPasswordErrors(prev => ({ ...prev, confirmPassword: true }));
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("Password must be at least 6 characters long, contain at least one uppercase letter and one number");
      setPasswordErrors(prev => ({ ...prev, newPassword: true }));
      return;
    }

    setError("");
    setSuccess("");
    setPasswordLoading(true);
    setPasswordErrors({ newPassword: false, confirmPassword: false });

    try {
      // Create credentials with current email and password
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );

      // Reauthenticate user
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccess("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setError("Current password is incorrect");
      } else {
        setError(err.message || "Failed to update password. Please try again.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (      <View style={[styles.container, styles.loadingContainer]}>
        <View>
          <ActivityIndicator size="large" color={themeColors.primaryBlue} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TextInput
          label="Email"
          value={user?.email || ""}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          disabled={true}
          theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
        />
        <Button
          mode="outlined"
          onPress={() => setShowAvatarModal(true)}
          style={[styles.socialButton, { borderColor: currentColor }]}
          labelStyle={{ color: currentColor }}
          icon={currentIcon}
          loading={saveLoading}
          disabled={saveLoading}
        >
          Change Avatar
        </Button>
        
        <AvatarModal
          visible={showAvatarModal}
          onDismiss={() => setShowAvatarModal(false)}
          onSave={handleAvatarSave}
          initialIcon={currentIcon}
          initialColor={currentColor}
        />

        <View style={styles.socialButtonsContainer}>
          <Button
            mode="outlined"
            onPress={() => { }}
            style={[styles.socialButton, { borderColor: themeColors.facebookBlue }]}
            labelStyle={{ color: themeColors.facebookBlue }}
            icon="facebook"
          >
            Link with Facebook
          </Button>
          <Button
            mode="outlined"
            onPress={() => { }}
            style={[styles.socialButton, { borderColor: themeColors.googleRed }]}
            labelStyle={{ color: themeColors.googleRed }}
            icon="google"
          >
            Link with Google
          </Button>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24, width: '100%' }}>
          <View style={{ flex: 1, height: 2, backgroundColor: themeColors.yellow }} />
          <AnimatedStars />
          <View style={{ flex: 1, height: 2, backgroundColor: themeColors.yellow }} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        <TextInput
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: themeColors.outlineBlue, outline: themeColors.outlineBlue } }}
          right={
            <TextInput.Icon
              icon={() => showCurrentPassword ? (
                <EyeOff size={20} color={themeColors.outlineBlue} />
              ) : (
                <Eye size={20} color={themeColors.outlineBlue} />
              )}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              forceTextInputFocus={false}
            />
          }
        />
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showNewPassword}
          style={styles.input}
          mode="outlined"
          error={passwordErrors.newPassword}
          theme={{
            colors: {
              primary: passwordErrors.newPassword ? themeColors.googleRed : themeColors.outlineBlue,
              outline: passwordErrors.newPassword ? themeColors.googleRed : themeColors.outlineBlue
            }
          }}
          right={
            <TextInput.Icon
              icon={() => showNewPassword ? (
                <EyeOff size={20} color={passwordErrors.newPassword ? themeColors.googleRed : themeColors.outlineBlue} />
              ) : (
                <Eye size={20} color={passwordErrors.newPassword ? themeColors.googleRed : themeColors.outlineBlue} />
              )}
              onPress={() => setShowNewPassword(!showNewPassword)}
              forceTextInputFocus={false}
            />
          }
        />
        {newPassword.length > 0 && !validatePassword(newPassword) && (
          <Text style={styles.helperText}>
            Password must have:
            {newPassword.length < 6 && '\n• At least 6 characters'}
            {!/[A-Z]/.test(newPassword) && '\n• One uppercase letter'}
            {!/[0-9]/.test(newPassword) && '\n• One number'}
          </Text>
        )}
        <TextInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          mode="outlined"
          error={passwordErrors.confirmPassword}
          theme={{
            colors: {
              primary: passwordErrors.confirmPassword ? themeColors.googleRed : themeColors.outlineBlue,
              outline: passwordErrors.confirmPassword ? themeColors.googleRed : themeColors.outlineBlue
            }
          }}
          right={
            <TextInput.Icon
              icon={() => showConfirmPassword ? (
                <EyeOff size={20} color={passwordErrors.confirmPassword ? themeColors.googleRed : themeColors.outlineBlue} />
              ) : (
                <Eye size={20} color={passwordErrors.confirmPassword ? themeColors.googleRed : themeColors.outlineBlue} />
              )}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              forceTextInputFocus={false}
            />
          }
        />
        {confirmPassword.length > 0 && passwordErrors.confirmPassword && (
          <Text style={styles.helperText}>Passwords don&apos;t match</Text>
        )}
        <Button
          mode="contained"
          onPress={handleUpdatePassword}
          loading={passwordLoading}
          disabled={passwordLoading || !newPassword || !confirmPassword}
          style={styles.button}
        >
          Update Password
        </Button>      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setShowSnackbar(false),
        }}
        style={{ backgroundColor: themeColors.primaryBlue }}
      >
        {success}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: themeColors.textDark,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: themeColors.primaryBlue,
    marginTop: 8,
    borderRadius: 4,
  },
  errorText: {
    color: themeColors.googleRed,
    marginBottom: 16,
    textAlign: "center",
  },
  successText: {
    color: "#4caf50",
    marginBottom: 16,
    textAlign: "center",
  },
  socialButtonsContainer: {
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },
  socialButton: {
    width: "100%",
    borderWidth: 1.5,
    height: 44,
    borderRadius: 4,
    justifyContent: "center",
  },
  helperText: {
    color: themeColors.googleRed,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
});
