import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Accelerometer } from "expo-sensors";

Accelerometer.setUpdateInterval(20);

interface GravityProps {
  children: React.ReactNode;
}
export function Gravity({ children }: GravityProps) {
  const offset = useSharedValue({ x: 0, y: 0 });

  useEffect(() => {
    const monitor = Accelerometer.addListener((data) => {
      offset.value = {
        x: offset.value.x - data.x * 10,
        y: offset.value.y,
      };
    });

    return () => {
      monitor.remove();
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 100 },
        {
          rotateY: withSpring(`${offset.value.x}deg`),
        },
      ],
    };
  });

  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
}
