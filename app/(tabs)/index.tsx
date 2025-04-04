import { IconSymbol } from "@/components/ui/IconSymbol";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { SectionList, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CLUBS = [
  {
    title: "Woods",
    data: ["Driver", "3 Wood", "5 Wood", "7 Wood", "9 Wood"],
  },
  {
    title: "Hybrids",
    data: [
      "1 Hybrid",
      "2 Hybrid",
      "3 Hybrid",
      "4 Hybrid",
      "5 Hybrid",
      "6 Hybrid",
      "7 Hybrid",
      "8 Hybrid",
      "9 Hybrid",
    ],
  },
  {
    title: "Irons",
    data: [
      "1 Iron",
      "2 Iron",
      "3 Iron",
      "4 Iron",
      "5 Iron",
      "6 Iron",
      "7 Iron",
      "8 Iron",
      "9 Iron",
    ],
  },
  {
    title: "Wedges",
    data: [
      "44 Wedge",
      "45 Wedge",
      "46 Wedge",
      "47 Wedge",
      "48 Pitching Wedge",
      "50 Wedge",
      "52 Wedge",
      "53 Wedge",
      "54 Wedge",
      "55 Wedge",
      "56 Sand Wedge",
      "58 Wedge",
      "60 Lob Wedge",
      "62 Wedge",
      "64 Wedge",
    ],
  },
];

export default function PrepareScreen() {
  const { colorScheme } = useColorScheme();
  const bottom = useBottomTabOverflow();
  const onPress = () => console.log("Pressed");

  return (
    <SafeAreaView className="bg-neutral-100 dark:bg-neutral-950 flex-1">
      <SectionList
        sections={CLUBS}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingBottom: bottom,
        }}
        renderItem={({ item, index, section }) => (
          <TouchableHighlight
            underlayColor={
              Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
            }
            className={`${index === 0 ? "rounded-t-xl" : ""} ${
              index === section.data.length - 1 ? "rounded-b-xl" : ""
            } bg-white dark:bg-neutral-800`}
            onPress={onPress}
          >
            <View
              className={`flex flex-row justify-between items-center ${
                index !== section.data.length - 1
                  ? "border-b border-neutral-200 dark:border-neutral-600"
                  : ""
              } ml-5 py-3 pr-5 bg-ne`}
            >
              <Text className="text-lg dark:text-white">{item}</Text>
              <IconSymbol name="checkmark" color="text-white" size={16} />
            </View>
          </TouchableHighlight>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-sm uppercase ml-5 mt-10 mb-2 text-neutral-400 dark:text-neutral-600">
            {title}
          </Text>
        )}
        className="px-5 mb-5"
      />
    </SafeAreaView>
  );
}
