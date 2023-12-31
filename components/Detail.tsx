import { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PokemonDetail } from "../types";
import { getPokemon, getPokemonImageSrc } from "../services";
import { Pan } from "./Pan";
import { Gravity } from "./Gravity";

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
      animationType='slide'
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setOn(false)}>
            <View style={styles.dismissView}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            {!pokemon && <ActivityIndicator />}
            {pokemon && (
              <View style={styles.view}>
                <View style={{ flex: 1 }}>
                  <Gravity>
                    <Pan>
                      <Image
                        style={styles.image}
                        source={{ uri: getPokemonImageSrc(pokemon.id) }}
                      />
                    </Pan>
                  </Gravity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.name}>{pokemon.name}</Text>
                  <Text>Height: {pokemon.height}</Text>
                  <Text>Weight: {pokemon.weight}</Text>
                  <Text>Base experience: {pokemon.base_experience}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dismissView: {
    flex: 1,
  },
  modalView: {
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fefefe",
    borderRadius: 20,
    padding: 25,
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
    alignItems: "center",
    gap: 16,
  },
  content: {
    flex: 1,
  },
  image: {
    width: 140,
    height: 140,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },
});
