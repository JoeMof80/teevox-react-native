import { SearchBar } from "@/components/SearchBar";
import { CourseItem } from "@/components/CourseItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { fetchFn, fetchRecentCourses } from "@/services/mockGolfCourses";
import useFetch from "@/services/useFetch";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useFocusEffect } from "expo-router";
import { useEffect, useState, useRef, useCallback } from "react";
import { FlatList, KeyboardAvoidingView, View, Platform } from "react-native";
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

  // Load "Nearby" (Portal) only once per screen mount
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

  // Search handling with deduplication
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

  // Segment change for "Recent"
  const handleSegmentChange = async (index: number) => {
    setSelectedIndex(index);
    if (index === 1 && !recentCourses && !searchQuery.trim()) {
      console.log("Fetching Recent courses");
      setIsRecentLoading(true);
      const courses = await fetchRecentCourses();
      setRecentCourses(courses);
      setIsRecentLoading(false);
    }
  };

  // Determine which courses to display
  const displayedCourses =
    searchQuery.trim() || isSearchFocused
      ? searchCourses
      : selectedIndex === 0
      ? nearbyCourses
      : recentCourses;

  return (
    <SafeAreaView className="bg-neutral-100 dark:bg-neutral-950 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-bottom}
      >
        {/* Fixed Header */}
        <View className="bg-white dark:bg-black">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {!isSearchFocused && (
            <SegmentedControl
              values={["Nearby", "Recent"]}
              selectedIndex={selectedIndex}
              onChange={(event) =>
                handleSegmentChange(event.nativeEvent.selectedSegmentIndex)
              }
              className="mx-5 mb-2"
              style={{ marginTop: 0, margin: 16 }}
            />
          )}
        </View>
        {/* FlatList */}
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
          contentContainerStyle={{ paddingBottom: bottom }}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CoursesScreen;
