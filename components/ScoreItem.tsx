import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import FlashingIcon from "./FlashingIcon";

export default function ScoreItem({
  item,
  roundedClasses,
  borderClasses,
  onPress,
}: {
  item: any;
  roundedClasses?: string;
  borderClasses?: string;
  onPress: () => void;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableHighlight
      underlayColor={
        Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
      }
      className={`${roundedClasses} bg-white dark:bg-neutral-800`}
      onPress={onPress}
    >
      <View
        className={`${borderClasses} flex flex-row justify-between items-center ml-5 py-3 pr-5`}
      >
        <View className="flex flex-col items-start">
          <Text className="text-lg dark:text-white">{item.id}</Text>
          <Text className="text-sm dark:text-white">{`Par ${item.label}`}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-lg dark:text-red-500 uppercase mr-1">Live</Text>
          <FlashingIcon />
        </View>
      </View>
    </TouchableHighlight>
  );
}
