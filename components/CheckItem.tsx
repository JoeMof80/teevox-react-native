import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol.ios";

export default function CheckItem({
  item,
  roundedClasses,
  borderClasses,
  selected,
  onPress,
}: {
  item: any;
  roundedClasses?: string;
  borderClasses?: string;
  selected: boolean;
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
        <Text className="text-lg dark:text-white">{item.label}</Text>
        <IconSymbol
          name="checkmark"
          color={
            selected
              ? Colors[colorScheme ?? "light"].checkmarkColor
              : "transparent"
          }
          size={16}
        />
      </View>
    </TouchableHighlight>
  );
}
