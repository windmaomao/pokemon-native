import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gyroscope } from "expo-sensors";

Gyroscope.setUpdateInterval(20);

interface GravityProps {
  children: React.ReactNode;
}
export function Gravity({ children }: GravityProps) {
  const tilt = useSharedValue(0);

  useEffect(() => {
    const monitor = Gyroscope.addListener((data) => {
      tilt.value = tilt.value - data.y * 10;
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
          rotateY: withSpring(`${tilt.value}deg`),
        },
      ],
    };
  });

  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
}
