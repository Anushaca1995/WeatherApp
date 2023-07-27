import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffe6cc",
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
  tempView: {
    fontSize: 20,
    margin: 10,
    color: "#80002a",
    fontWeight: "800",
  },
  weatherView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  refresh: { width: 40, height: 40, borderRadius: 40 },
  icon: { width: 200, height: 200 },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchInput: {
    padding: 10,
    backgroundColor: "#fff2e6",
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
  yourLocIcon: {
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  enterButton: {
    backgroundColor: "#660022",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
