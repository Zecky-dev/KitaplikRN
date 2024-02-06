import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  pickImageLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  heading: {
    color: "white",
    fontSize: 36,
    fontWeight: "300",
  },
  headingDescription: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "200",
    marginVertical: 8,
  },
  pressableLabel: {
    color: "white"
  },
  scrollViewContainer: {
    flexGrow: 1, justifyContent: "center"
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
    paddingBottom: 8,
    marginBottom: 8,
  },
  pickImageButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  }
});
