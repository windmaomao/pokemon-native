import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Heading = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Pokemons</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 36,
    color: "rgba(175, 47, 47, 0.25)",
    fontWeight: "100",
  },
});
