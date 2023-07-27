import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffe6cc",
    textAlign: "center",
    justifyContent: "center",
  },
  caption: {
    fontSize: 20,
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#80002a",
  },
  textView: {
    fontSize: 15,
    margin: 10,
    color: "#80002a",
    fontWeight: "700",
  },
  weatherView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  weatherIcon: { width: 100, height: 100 },
});
