import LinkItem from "@/components/LinkItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { Colors } from "@/constants/Colors";
import { usePlayContext } from "@/context/play";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BALL_NUMBERS = ["1", "2", "3", "4"];
const GENDERS = ["male", "female"];

export default function RoundScreen() {
  const bottom = useBottomTabOverflow();
  const { colorScheme } = useColorScheme();
  const {
    selectedBallType,
    selectedBallNumber,
    selectedGender,
    selectedTee,
    setSelectedGender,
    setSelectedTee,
    setSelectedBallNumber,
  } = usePlayContext();

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
        <ScrollView
          contentContainerStyle={{
            paddingBottom: bottom + 16,
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
          className="bg-neutral-100 dark:bg-neutral-950 flex-1"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-white dark:bg-neutral-800 rounded-xl mb-4">
            <Link href={`./select-ball`} asChild>
              <LinkItem
                label="Ball Type"
                value={selectedBallType}
                roundedClasses="rounded-t-xl"
                borderClasses="border-b border-neutral-200 dark:border-neutral-600"
              />
            </Link>
            <View className="flex flex-row justify-between items-center border-b border-neutral-200 dark:border-neutral-600 ml-5 py-3 pr-5">
              <Text className="text-lg dark:text-white">Ball Number</Text>
              <SegmentedControl
                values={BALL_NUMBERS}
                selectedIndex={BALL_NUMBERS.indexOf(
                  selectedBallNumber?.toString()!,
                )}
                onValueChange={(value) => {
                  if (BALL_NUMBERS.includes(value)) {
                    setSelectedBallNumber(Number(value) as 1 | 2 | 3 | 4);
                  }
                }}
                style={{ width: 150 }}
              />
            </View>
            <View className="flex flex-row justify-between items-center border-b border-neutral-200 dark:border-neutral-600 ml-5 py-3 pr-5">
              <Text className="text-lg dark:text-white">Gender</Text>
              <SegmentedControl
                values={GENDERS}
                selectedIndex={GENDERS.indexOf(selectedGender!)}
                onValueChange={(value) => {
                  if (GENDERS.includes(value)) {
                    setSelectedGender(value as "male" | "female");
                    setSelectedTee(null);
                  }
                }}
                style={{ width: 150 }}
              />
            </View>
            <Link href={`./select-tee`} asChild>
              <LinkItem
                label="Tee"
                value={selectedTee}
                disabled={!selectedGender}
                roundedClasses="rounded-b-xl"
              />
            </Link>
          </View>
          <TouchableHighlight
            underlayColor={
              Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
            }
            className="bg-white dark:bg-neutral-800 rounded-xl mb-4"
            disabled={!selectedTee}
            onPress={() => {
              console.log("Tee Off pressed");
            }}
          >
            <View className="flex flex-row justify-between items-center ml-5 py-3 pr-5">
              <Text
                className={`text-lg ${
                  selectedTee ? "dark:text-blue-500" : "dark:text-neutral-500"
                } mr-2`}
              >
                Tee Off
              </Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
