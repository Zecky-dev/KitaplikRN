import { StyleSheet } from "react-native";
export default StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  inputLabel: {
    color: "white",
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    color: "white",
  },
});
