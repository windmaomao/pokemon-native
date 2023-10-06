import { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
} from "react-native";
import { Heading } from "./components";
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

  const onPress = () => {};

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
        <Heading />
        <Animated.View style={[styles.list, { opacity }]}>
          {list.map(({ id, name }) => (
            <Pressable
              style={styles.button}
              onPress={onPress}
              android_ripple={{ color: "red" }}
              key={id}
            >
              <View style={styles.item}>
                <Text>{name}</Text>
                <Image style={styles.image} source={{ uri: pokemonSrc(id) }} />
              </View>
            </Pressable>
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
    padding: 35,
  },
  button: {},
  list: {
    marginTop: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  item: {
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
});
