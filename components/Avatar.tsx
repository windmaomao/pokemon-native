import { useRef } from "react";
import { Text, StyleSheet, Pressable, View, Animated } from "react-native";

interface AvatarProps {
  name: string;
  uri: string;
  onPress: () => void;
}

export const Avatar = ({ name, uri, onPress }: AvatarProps) => {
  const size = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(size, {
      toValue: 6,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(size, {
      toValue: 2,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Pressable
      style={styles.button}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <View style={styles.item}>
        <Animated.Image
          style={[styles.image, { transform: [{ scale: size }] }]}
          source={{ uri }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { padding: 16 },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  text: {},
  image: {
    width: 60,
    height: 60,
  },
});
