import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { IconSymbol } from "./ui/IconSymbol.ios";

interface FlashingIconProps {
  size?: number;
  color?: string;
  duration?: number;
}

const FlashingIcon = ({
  size = 16,
  color = "red",
  duration = 2000,
}: FlashingIconProps) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: duration / 2 }),
      -1,
      true,
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <IconSymbol name="circle.fill" size={size} color={color} />
    </Animated.View>
  );
};

export default FlashingIcon;
