import { useEffect, useRef } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";

export const ShimmerSkeleton = ({
  height,
  style,
}: {
  height: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const translateX = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [translateX]);

  return (
    <View
      className="rounded overflow-hidden bg-gray-300 dark:bg-neutral-600"
      style={[{ height }, style]}
    >
      <Animated.View
        className="w-20 h-full bg-gray-200 dark:bg-neutral-500 opacity-50"
        style={{ transform: [{ translateX }] }}
      />
    </View>
  );
};
