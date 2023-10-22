import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { Heading, Avatar, Detail, Search } from "./components";
import { Pokemon } from "./types";
import { getPokemons } from "./services";

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

  const [selected, setSelected] = useState<number>();

  const renderItem = useCallback(
    ({ item: { name, id } }: ListRenderItemInfo<Pokemon>) => (
      <Avatar name={name} id={id} onSelect={setSelected} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Heading />
      <Search />
      <Animated.View style={[styles.list, { opacity }]}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={4}
          onMoveShouldSetResponderCapture={() => true}
        />
      </Animated.View>
      <Detail key={selected} id={selected} />
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
