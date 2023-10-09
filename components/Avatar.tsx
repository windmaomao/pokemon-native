import { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

interface AvatarProps {
  name: string;
  uri: string;
  onPress: () => void;
}

export const Avatar = ({ name, uri, onPress }: AvatarProps) => {
  const [selected, setSelected] = useState(false);
  const size = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    setSelected(true);
    Animated.timing(size, {
      toValue: 3,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelected(false);
      Animated.timing(size, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.button, selected && { backgroundColor: "#eee" }]}
      onPressIn={onPressIn}
    >
      <View style={styles.view}>
        <Animated.Image
          style={[styles.image, { transform: [{ scale: size }] }]}
          source={{ uri }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 16, width: "100%" },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  text: { paddingLeft: 32, fontSize: 16 },
  image: {
    width: 60,
    height: 60,
  },
});
