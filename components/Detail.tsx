import { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { PokemonDetail } from "../types";
import { getPokemon, pokemonSrc } from "../services";

interface DetailProps {
  name?: string;
}

export const Detail = ({ name }: DetailProps) => {
  const [on, setOn] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetail>();

  useEffect(() => {
    if (!name) return;

    setOn(true);
    getPokemon(name).then(setPokemon);
  }, [name]);

  return (
    <Modal
      transparent={true}
      visible={on}
      hardwareAccelerated={true}
      animationType="slide"
    >
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Text>{name}</Text>
          {!pokemon && <ActivityIndicator />}
          {pokemon && (
            <View>
              <Image
                style={styles.image}
                source={{ uri: pokemonSrc(`${pokemon.id}`) }}
              />
              <Text>Height: {pokemon.height}</Text>
              <Text>Weight: {pokemon.weight}</Text>
              <Text>Base experience: {pokemon.base_experience}</Text>
            </View>
          )}
          <Pressable onPress={() => setOn(false)}>
            <Text style={styles.button}>Dismiss</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
  },
});
