import FlashingIcon from "@/components/FlashingIcon";
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
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const BALL_NUMBERS = ["1", "2", "3", "4"];
const GENDERS = ["male", "female"];

export default function RoundScreen() {
  const zoomLevel = 18; // Adjust this (e.g., 10 for wider, 16 for closer)
  const latitudeDelta = 360 / Math.pow(2, zoomLevel); // Approximate zoom level
  const longitudeDelta = latitudeDelta; // 1:1 aspect ratio, adjust if needed

  const bottom = useBottomTabOverflow();
  const { colorScheme } = useColorScheme();
  const {
    liveRound,
    selectedBallType,
    selectedBallNumber,
    selectedCourse,
    selectedGender,
    selectedTee,
    setLiveRound,
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
        <View className="m-5">
          <View
            style={{
              width: "100%",
              height: "50%",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: "hidden",
            }}
          >
            <MapView
              style={{
                width: "100%",
                height: "100%",
              }}
              initialRegion={{
                latitude: selectedCourse?.location?.latitude || 0,
                longitude: selectedCourse?.location?.longitude || 0,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              }}
            />
            <View className="absolute inset-0 flex items-center justify-center">
              <Text
                className="text-white text-2xl font-bold shadow-md"
                style={{
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {selectedCourse?.course_name}
              </Text>
              <Text
                className="text-white text-base font-medium shadow-md mt-1"
                style={{
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {selectedCourse?.club_name}
              </Text>
            </View>
          </View>
          <View className="bg-white dark:bg-neutral-800 rounded-b-xl mb-4">
            <Link href="./select-ball" asChild>
              <LinkItem
                label="Ball Type"
                value={selectedBallType}
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
          <Link href={`./scorecard`} asChild>
            <TouchableHighlight
              underlayColor={
                Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
              }
              className="bg-white dark:bg-neutral-800 rounded-xl mb-4"
              disabled={!selectedTee}
              onPress={() => {
                console.log("Tee Off pressed");
                setLiveRound({
                  courseId: selectedCourse?.id,
                  holes: [
                    {
                      strokes: [],
                      par: selectedCourse?.tees[selectedGender!].find(
                        (t) => t.tee_name === selectedTee,
                      )?.holes[0].par!,
                      start: new Date(),
                    },
                  ],
                  gender: selectedGender!,
                  tee: selectedTee!,
                  start: new Date(),
                });
              }}
            >
              <View className="flex flex-row justify-between items-center ml-5 py-3 pr-5">
                <Text
                  className={`text-lg ${
                    selectedTee
                      ? liveRound
                        ? "dark:text-red-500"
                        : "dark:text-blue-500"
                      : "dark:text-neutral-500"
                  } mr-2`}
                >
                  {liveRound ? "Scorecard" : "Tee Off"}
                </Text>
                {liveRound && (
                  <View className="flex-row items-center">
                    <Text className="text-lg dark:text-red-500 uppercase mr-1">
                      Live
                    </Text>
                    <FlashingIcon />
                  </View>
                )}
              </View>
            </TouchableHighlight>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
