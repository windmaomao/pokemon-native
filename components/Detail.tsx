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
import { getPokemon, getPokemonImageSrc } from "../services";

interface DetailProps {
  id?: number;
}

export const Detail = ({ id }: DetailProps) => {
  const [on, setOn] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetail>();

  useEffect(() => {
    if (!id) return;

    setOn(true);
    getPokemon(id).then(setPokemon);
  }, [id]);

  return (
    <Modal
      transparent={true}
      visible={on}
      hardwareAccelerated={true}
      animationType="slide"
    >
      <View style={styles.modal}>
        <View style={styles.modalView}>
          {!pokemon && <ActivityIndicator />}
          {pokemon && (
            <View style={styles.view}>
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: getPokemonImageSrc(pokemon.id) }}
                />
                <Pressable onPress={() => setOn(false)}>
                  <Text style={styles.button}>Dismiss</Text>
                </Pressable>
              </View>
              <View>
                <Text style={styles.name}>{pokemon.name}</Text>
                <Text>Height: {pokemon.height}</Text>
                <Text>Weight: {pokemon.weight}</Text>
                <Text>Base experience: {pokemon.base_experience}</Text>
              </View>
            </View>
          )}
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
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
});
