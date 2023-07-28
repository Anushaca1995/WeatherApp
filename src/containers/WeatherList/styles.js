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
    padding: 10,
  },
  weatherIcon: { width: 100, height: 100 },
  cellView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cellCap: { fontSize: 20, fontWeight: "bold", margin: 5, color: "black" },
  cellItem: { fontSize: 15, fontWeight: "bold", margin: 5, color: "black" },
  desc: { fontSize: 15, margin: 5, color: "black" },
  itemBorder: { backgroundColor: "#ff9999", height: 1 },
  refresh: { width: 40, height: 40, borderRadius: 40 },
  refreshView: { justifyContent: "center", alignItems: "center" },
});
