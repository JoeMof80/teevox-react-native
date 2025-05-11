import CheckItem from "@/components/CheckItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { usePlayContext } from "@/context/play";
import { getGolfBalls } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function parseGolfBalls(balls: GolfBall[]): ConcatenatedBall[] {
  return balls.map((ball) => ({
    id: ball.$id,
    label: `${ball.manufacturer} ${ball.name}`,
  }));
}

export default function SelectBallScreen() {
  const { colorScheme } = useColorScheme();
  const bottom = useBottomTabOverflow();

  const [golfBalls, setGolfBalls] = useState<ConcatenatedBall[]>([]);

  const { data: golfBallsData, loading, error } = useFetch(getGolfBalls);

  useEffect(() => {
    if (golfBallsData) {
      console.log("Grouping clubs by category:", golfBallsData.length);

      const parsedGolfBalls = parseGolfBalls(golfBallsData);

      setGolfBalls(parsedGolfBalls);
    }
  }, [golfBallsData]);

  const { selectedBallType, setSelectedBallType } = usePlayContext();

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const isSelected = selectedBallType === item.label;
    return (
      <CheckItem
        item={item}
        roundedClasses={`${index === 0 ? "rounded-t-xl" : ""} ${
          index === golfBalls.length - 1 ? "rounded-b-xl" : ""
        }`}
        borderClasses={`${
          index !== golfBalls.length - 1
            ? "border-b border-neutral-200 dark:border-neutral-600"
            : ""
        }`}
        selected={isSelected}
        onPress={() => setSelectedBallType(item.label)}
      />
    );
  };

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
          data={golfBalls}
          renderItem={renderItem}
          keyExtractor={(item: Item) => item.id}
          extraData={selectedBallType}
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
