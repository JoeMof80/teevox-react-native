import CheckItem from "@/components/CheckItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { getGolfClubs, updateGolfClub } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { SectionList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GroupedClub {
  title: string;
  data: GolfClub[];
}

function groupClubsByCategory(clubs: GolfClub[]): GroupedClub[] {
  const categoryMap = clubs.reduce((map, club) => {
    const clubList = map.get(club.category) || [];
    clubList.push(club);
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

  const { data: golfClubsData, loading, error } = useFetch(getGolfClubs);

  useEffect(() => {
    if (golfClubsData) {
      console.log("Grouping clubs by category:", golfClubsData.length);

      const groupedClubs = groupClubsByCategory(golfClubsData!);
      setGolfClubs(groupedClubs);
    }
  }, [golfClubsData]);

  const onPress = async (item: GolfClub) => {
    const updatedGolfClub = await updateGolfClub(item);
    setGolfClubs((prev) =>
      prev.map((section) => ({
        ...section,
        data: section.data.map((club) =>
          club.$id === updatedGolfClub!.$id
            ? { ...club, selected: !club.selected }
            : club,
        ),
      })),
    );
  };

  return (
    <SafeAreaView className="bg-neutral-100 dark:bg-neutral-950 flex-1">
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error?.message}</Text>
      ) : (
        <SectionList
          sections={golfClubs}
          keyExtractor={(item, index) => item.label + index}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{
            paddingBottom: bottom,
          }}
          renderItem={({ item, index, section }) => (
            <CheckItem
              item={item}
              roundedClasses={`${index === 0 ? "rounded-t-xl" : ""} ${
                index === section.data.length - 1 ? "rounded-b-xl" : ""
              }`}
              borderClasses={`${
                index !== section.data.length - 1
                  ? "border-b border-neutral-400 dark:border-neutral-600"
                  : ""
              }`}
              selected={item.selected}
              onPress={() => onPress(item)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="text-sm uppercase ml-5 mt-10 mb-2 text-neutral-400 dark:text-neutral-600">
              {title}
            </Text>
          )}
          className="px-5 mb-5"
        />
      )}
    </SafeAreaView>
  );
}
