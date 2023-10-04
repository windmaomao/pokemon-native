import { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { Heading } from "./components";
import { Pokemon } from "./types";
import { getPokemons } from "./services";

export const Home = () => {
  const [list, setList] = useState<Pokemon[]>([]);
  useEffect(() => {
    getPokemons().then(setList);
  }, []);

  const [count, setCount] = useState(0);
  const onPress = () => {
    setCount((c) => c + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
        <Heading />
        <Pressable
          style={styles.button}
          onPress={onPress}
          android_ripple={{ color: "red" }}
        >
          <Text>Home {count}</Text>
        </Pressable>
        {list.map(({ id, name }) => (
          <Text key={id}>{name}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 64,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
