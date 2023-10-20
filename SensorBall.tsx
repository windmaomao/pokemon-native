import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Accelerometer } from "expo-sensors";

Accelerometer.setUpdateInterval(20);

function Ball() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  useEffect(() => {
    const monitor = Accelerometer.addListener((data) => {
      offset.value = {
        x: offset.value.x - data.x * 1,
        y: offset.value.y + data.y * 1,
      };
    });

    return () => {
      monitor.remove();
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? "yellow" : "blue",
    };
  });

  return <Animated.View style={[styles.ball, animatedStyles]} />;
}

export default function SensorBall() {
  return (
    <View style={styles.container}>
      <Ball />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
});
