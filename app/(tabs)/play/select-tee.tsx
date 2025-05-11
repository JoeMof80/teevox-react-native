import CheckItem from "@/components/CheckItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { usePlayContext } from "@/context/play";
import { useColorScheme } from "nativewind";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectTeeScreen() {
  const { colorScheme } = useColorScheme();
  const bottom = useBottomTabOverflow();

  const { selectedCourse, selectedGender, selectedTee, setSelectedTee } =
    usePlayContext();

  // Render each list item
  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const isSelected = selectedTee === item.label;
    if (!selectedGender) return null;

    return (
      <CheckItem
        item={item}
        roundedClasses={`${index === 0 ? "rounded-t-xl" : ""} ${
          index ===
          (selectedCourse?.tees[selectedGender] &&
            selectedCourse?.tees[selectedGender].length - 1)
            ? "rounded-b-xl"
            : ""
        }`}
        borderClasses={`${
          index !==
          (selectedCourse?.tees[selectedGender] &&
            selectedCourse?.tees[selectedGender].length - 1)
            ? "border-b border-neutral-200 dark:border-neutral-600"
            : ""
        }`}
        selected={isSelected}
        onPress={() => setSelectedTee(item.label)}
      />
    );
  };

  if (!selectedGender) return null;

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
          data={selectedCourse?.tees[selectedGender]?.map((tee) => ({
            id: tee.tee_name,
            label: tee.tee_name,
          }))}
          renderItem={renderItem}
          keyExtractor={(item: Item) => item.id}
          extraData={selectedTee}
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
