import ScoreItem from "@/components/ScoreItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { usePlayContext } from "@/context/play";
import { useColorScheme } from "nativewind";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScorecardScreen() {
  const bottom = useBottomTabOverflow();
  const { colorScheme } = useColorScheme();
  const { liveRound, selectedCourse } = usePlayContext();

  console.log("Selected course:", selectedCourse);

  return (
    <SafeAreaView
      className="bg-neutral-100 dark:bg-neutral-950 flex-1"
      edges={["bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={bottom}
        style={{
          flex: 1,
          backgroundColor: colorScheme === "dark" ? "#171717" : "#f5f5f5",
        }}
      >
        <FlatList
          data={liveRound?.holes.map((hole, index) => ({
            id: (index + 1).toString(),
            label: hole.par.toString(),
          }))}
          renderItem={({ item, index }: { item: Item; index: number }) => (
            <ScoreItem
              item={item}
              roundedClasses={`${index === 0 ? "rounded-t-xl" : ""} ${
                index === liveRound?.holes?.length! - 1 ? "rounded-b-xl" : ""
              }`}
              borderClasses={`${
                index !== liveRound?.holes?.length! - 1
                  ? "border-b border-neutral-400 dark:border-neutral-600"
                  : ""
              }`}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item: Item) => item.id}
          contentContainerStyle={{
            paddingBottom: bottom + 16,
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
