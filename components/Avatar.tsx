import { useRef, useState, memo, useCallback } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { getPokemonImageSrc } from "../services";

interface AvatarProps {
  id: number;
  onSelect: (id: number) => void;
  name: string;
}

export const Avatar = memo(({ name, id, onSelect }: AvatarProps) => {
  const [selected, setSelected] = useState(false);
  const size = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    setSelected(true);
    Animated.sequence([
      Animated.timing(size, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [name]);

  const onPressOut = () => {
    setSelected(false);
    onSelect(id);
  };

  return (
    <TouchableOpacity
      style={[styles.button, selected && { backgroundColor: "#f2f2f2" }]}
    >
      <View style={styles.view}>
        <Text style={styles.text}>{name}</Text>
        <TouchableWithoutFeedback
          delayPressIn={5}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Animated.Image
            style={[styles.image, { transform: [{ scale: size }] }]}
            source={{ uri: getPokemonImageSrc(id) }}
          />
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: { flex: 1, paddingTop: 20 },
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 10 },
  image: {
    width: 60,
    height: 60,
  },
});
