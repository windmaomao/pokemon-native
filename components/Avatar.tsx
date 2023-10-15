import { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    Animated.sequence([
      Animated.timing(size, {
        toValue: 3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressOut = () => {
    setSelected(false);
  };

  return (
    <TouchableOpacity
      style={[styles.button, selected && { backgroundColor: "#f2f2f2" }]}
    >
      <View style={styles.view}>
        <TouchableWithoutFeedback
          hitSlop={10}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Animated.Image
            style={[styles.image, { transform: [{ scale: size }] }]}
            source={{ uri }}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 16, width: "100%", height: 80 },
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
