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
    padding: 10,
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
    margin: 10,
  },
  weatherIcon: { width: 130, height: 130, top: 0 },
  cellView: { padding: 10, flexDirection: "row" },
  cellCap: { fontSize: 20, fontWeight: "bold", margin: 5 },
  cellItem: { fontSize: 15, fontWeight: "bold", margin: 5 },
  desc: { fontSize: 15, margin: 5 },
  itemBorder: { backgroundColor: "#ff9999", height: 1 },
});
