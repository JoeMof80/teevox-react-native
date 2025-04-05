import { IconSymbol } from "@/components/ui/IconSymbol";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { Colors } from "@/constants/Colors";
import GOLFCLUBS from "@/db/seed.json";
import { useDatabase } from "@/hooks/useDatabase";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { SectionList, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface GolfClub {
  id: number;
  label: string;
  name: string;
  category: string;
  selected: boolean;
}

interface GroupedClub {
  title: string;
  data: GolfClub[];
}

function groupClubsByCategory(clubs: GolfClub[]): GroupedClub[] {
  const categoryMap = clubs.reduce((map, club) => {
    const clubList = map.get(club.category) || [];
    if (!clubList.some((item) => item.id === club.id)) {
      clubList.push(club);
    }
    return map.set(club.category, clubList);
  }, new Map<string, GolfClub[]>());

  return Array.from(categoryMap, ([title, data]) => ({
    title,
    data,
  }));
}

export default function PrepareScreen() {
  const { colorScheme } = useColorScheme();
  const bottom = useBottomTabOverflow();

  const [golfClubs, setGolfClubs] = useState<GroupedClub[]>([]);

  const { db, records, updateSelected, dropTable, isInitialized } =
    useDatabase(GOLFCLUBS);

  // Group records whenever they change
  useEffect(() => {
    if (isInitialized && records.length > 0) {
      // handleDropTable();
      const groupedClubs = groupClubsByCategory(records);
      setGolfClubs(groupedClubs);
      {
        console.log("Render Item:", groupedClubs);
      }
    }
  }, [records, isInitialized]);

  const onPress = async (item: GolfClub) => {
    await updateSelected(item.id, !item.selected);
  };

  return (
    <SafeAreaView className="bg-neutral-100 dark:bg-neutral-950 flex-1">
      <SectionList
        sections={golfClubs}
        keyExtractor={(item, index) => item.label + index}
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
            onPress={() => onPress(item)}
          >
            <View
              className={`flex flex-row justify-between items-center ${
                index !== section.data.length - 1
                  ? "border-b border-neutral-200 dark:border-neutral-600"
                  : ""
              } ml-5 py-3 pr-5`}
            >
              <Text className="text-lg dark:text-white">{item.label}</Text>
              <IconSymbol
                name="checkmark"
                color={
                  item.selected
                    ? Colors[colorScheme ?? "light"].checkmarkColor
                    : "transparent"
                }
                size={16}
              />
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
