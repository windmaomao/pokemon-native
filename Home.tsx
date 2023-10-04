import { ScrollView, Text, StyleSheet } from "react-native";

export const Home = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
      style={styles.view}
    >
      <Text style={styles.title}>Hello World</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 64,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
