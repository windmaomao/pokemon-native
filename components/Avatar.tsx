import { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, Pressable, Image, Animated } from "react-native";

interface AvatarProps {
  name: string;
  uri: string;
  on: boolean;
  onPress: () => void;
}

export const Avatar = ({ name, uri, on, onPress }: AvatarProps) => {
  const size = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(size, {
      toValue: on ? 2 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [on]);

  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      android_ripple={{ color: "red" }}
    >
      <Animated.View style={[styles.item, { transform: [{ scale: size }] }]}>
        <Text>{name}</Text>
        <Image style={styles.image} source={{ uri }} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {},
  item: {
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
});
