import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
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

  const onSelect = () => () => {};

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Pokemon>) => (
      <Avatar name={item.name} uri={pokemonSrc(item.id)} onPress={onSelect} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Heading />
      <Animated.View style={[styles.list, { opacity }]}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={4}
        />
      </Animated.View>
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
    flex: 1,
  },
});
