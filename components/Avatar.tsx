import { useRef, useState, memo } from "react";
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

export const Avatar = memo(({ name, uri, onPress }: AvatarProps) => {
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
          hitSlop={5}
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
});

const styles = StyleSheet.create({
  button: { width: 80, height: 80, flex: 1 },
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  text: { paddingLeft: 32, fontSize: 9 },
  image: {
    width: 60,
    height: 60,
  },
});
