import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol.ios";

export default function LinkItem({
  label,
  value,
  roundedClasses,
  borderClasses,
  onPress,
}: {
  label: string;
  value?: string | null;
  roundedClasses?: string;
  borderClasses?: string;
  onPress?: () => void;
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
        <Text className="text-lg dark:text-white">{label}</Text>
        <View className="flex-row items-center">
          {value && (
            <Text className="text-lg dark:text-white mr-2">{value}</Text>
          )}
          <IconSymbol name="chevron.right" color="gray" size={16} />
        </View>
      </View>
    </TouchableHighlight>
  );
}
