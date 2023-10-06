import { useEffect, useState, useRef } from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
import { Heading, Avatar } from "./components";
import { Pokemon } from "./types";
import { pokemonSrc, getPokemons } from "./services";

export const Home = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const showList = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const [list, setList] = useState<Pokemon[]>([]);
  useEffect(() => {
    getPokemons().then(setList).then(showList);
  }, []);

  const onSelect = (id: number) => () => {};

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
        <Heading />
        <Animated.View style={[styles.list, { opacity }]}>
          {list.map(({ id, name }, i) => (
            <Avatar
              key={id}
              name={name}
              uri={pokemonSrc(id)}
              onPress={onSelect(i)}
            />
          ))}
        </Animated.View>
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
  },
  list: {
    margin: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 25,
  },
});
