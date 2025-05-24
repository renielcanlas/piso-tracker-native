import { StyleSheet } from "react-native";

const defaultScreenStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  screenLogo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 32,
  },
  screenTitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    marginLeft: 8,
  },
  alignCenter: {
    alignSelf: "center",
  },
});

export default defaultScreenStyles;
