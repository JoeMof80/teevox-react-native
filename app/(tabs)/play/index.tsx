import { CourseItem } from "@/components/CourseItem";
import { SearchBar } from "@/components/SearchBar";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { getGolfCourses } from "@/services/appwrite";
import { fetchFn } from "@/services/mockGolfCourses";
import useFetch from "@/services/useFetch";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CoursesScreen() {
  const bottom = useBottomTabOverflow();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [nearbyCourses, setNearbyCourses] = useState<GolfCourse[] | null>(null);
  const [recentCourses, setRecentCourses] = useState<GolfCourse[] | null>(null);
  const [isNearbyLoading, setIsNearbyLoading] = useState(false);
  const [isRecentLoading, setIsRecentLoading] = useState(false);
  const hasLoadedNearby = useRef(false);
  const lastSearchQuery = useRef<string>("");

  const {
    data: searchCourses,
    loading: searchLoading,
    error: searchError,
    refetch: loadSearchCourses,
    reset,
  } = useFetch(fetchFn(searchQuery), false);

  useFocusEffect(
    useCallback(() => {
      if (!hasLoadedNearby.current) {
        console.log("Initial load for Nearby: Portal");
        setIsNearbyLoading(true);
        fetchFn("Portal")()
          .then((courses) => {
            setNearbyCourses(courses);
            hasLoadedNearby.current = true;
          })
          .catch((err) => console.log("Nearby fetch error:", err.message))
          .finally(() => setIsNearbyLoading(false));
      }
    }, []),
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery && trimmedQuery !== lastSearchQuery.current) {
        console.log("Searching for:", trimmedQuery);
        lastSearchQuery.current = trimmedQuery;
        await loadSearchCourses();
      } else if (!trimmedQuery) {
        console.log("Search cleared");
        lastSearchQuery.current = "";
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadSearchCourses, reset]);

  const handleSegmentChange = async (index: number) => {
    setSelectedIndex(index);
    if (index === 1 && !recentCourses && !searchQuery.trim()) {
      console.log("Fetching Recent courses");
      setIsRecentLoading(true);
      const courses = await getGolfCourses();
      setRecentCourses(courses);
      setIsRecentLoading(false);
    }
    if (index === 2) {
      console.log("Fetching Added courses");
      setIsRecentLoading(true);
      const courses = await getGolfCourses();
      setRecentCourses(courses);
      setIsRecentLoading(false);
    }
  };

  const displayedCourses =
    searchQuery.trim() || isSearchFocused
      ? searchCourses
      : selectedIndex === 0
      ? nearbyCourses
      : recentCourses;

  return (
    <SafeAreaView
      className="bg-neutral-100 dark:bg-neutral-950 flex-1"
      edges={["bottom"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={bottom}
      >
        <View>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {!isSearchFocused && (
            <SegmentedControl
              values={["Nearby", "Recent", "Added"]}
              selectedIndex={selectedIndex}
              onChange={(event) =>
                handleSegmentChange(event.nativeEvent.selectedSegmentIndex)
              }
              style={{ marginTop: 0, margin: 16 }}
            />
          )}
        </View>
        {selectedIndex === 2 && (
          <Link href="./play/add-course" asChild>
            <Text className="my-4 text-center text-blue-500 text-lg">
              Add a course manually
            </Text>
          </Link>
        )}
        <FlatList
          data={
            searchLoading || isNearbyLoading || isRecentLoading
              ? Array(10).fill({})
              : displayedCourses || []
          }
          renderItem={({ item, index }) => (
            <CourseItem
              item={item}
              index={index}
              displayedCourses={displayedCourses}
              isLoading={searchLoading || isNearbyLoading || isRecentLoading}
              error={searchError}
              searchQuery={searchQuery}
            />
          )}
          keyExtractor={(item, index) =>
            searchLoading || isNearbyLoading || isRecentLoading || !item.id
              ? `item-${index}`
              : item.id.toString()
          }
          contentContainerStyle={{
            marginHorizontal: 16,
            paddingBottom: bottom + 20,
          }}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CoursesScreen;
