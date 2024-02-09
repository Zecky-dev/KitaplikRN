import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
});
