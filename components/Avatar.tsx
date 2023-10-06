import { useState, useEffect, useRef } from "react";
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
      toValue: 4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(size, {
      toValue: 1,
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
      hitSlop={30}
    >
      <View style={styles.item}>
        <Text style={styles.text}>{name}</Text>
        <Animated.Image
          style={[styles.image, { transform: [{ scale: size }] }]}
          source={{ uri }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
  },
  item: {},
  text: {
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
});
