import { Link } from "expo-router";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

export interface GolfCourseListProps {
  courses: GolfCourse[];
  bottomOffset: number;
  loading?: boolean;
  error?: Error | null;
}

export const GolfCourseList = ({
  courses,
  bottomOffset,
  loading,
  error,
}: GolfCourseListProps) => {
  const { colorScheme } = useColorScheme();

  const SkeletonItem = () => {
    console.log("Rendering SkeletonItem");
    return (
      <View className="p-4 border-b border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800">
        <View className="flex flex-row justify-between items-center ml-5 py-3 pr-5">
          <View className="w-3/4 h-5 bg-gray-300 dark:bg-neutral-600 rounded" />
          <View className="w-4 h-4 bg-gray-300 dark:bg-neutral-600 rounded" />
        </View>
      </View>
    );
  };

  console.log("GolfCourseList render", {
    loading,
    error,
    coursesLength: courses.length,
  });

  if (loading) {
    console.log("Showing skeletons");
    return (
      <FlatList
        data={[1, 2, 3]}
        renderItem={() => <SkeletonItem />}
        keyExtractor={(item) => `skeleton-${item}`}
        contentContainerStyle={{ paddingBottom: bottomOffset }}
        className="flex-1 px-5 mb-5 bg-neutral-100 dark:bg-neutral-950"
      />
    );
  }

  if (error) {
    console.log("Showing error", error.message);
    return (
      <View className="flex-1 bg-red-100 justify-center items-center">
        <Text className="text-red-500 text-2xl font-bold">
          ERROR: {error.message || "Failed to load"}
        </Text>
      </View>
    );
  }

  console.log("Showing courses");
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: bottomOffset }}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item, index }) => (
        <Link href={`./play/round?id=${item.id}`} asChild>
          <TouchableHighlight
            underlayColor={
              Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
            }
            className={`${index === 0 ? "rounded-t-xl" : ""} ${
              index === courses!.length - 1 ? "rounded-b-xl" : ""
            } bg-white dark:bg-neutral-800`}
          >
            <View
              className={`flex flex-row justify-between items-center ${
                index !== courses!.length - 1
                  ? "border-b border-neutral-200 dark:border-neutral-600"
                  : ""
              } ml-5 py-3 pr-5`}
            >
              <Text className="text-lg dark:text-white">
                {item.course_name}
              </Text>
              <IconSymbol name="chevron.right" color="gray" size={16} />
            </View>
          </TouchableHighlight>
        </Link>
      )}
      className="px-5 mb-5"
    />
  );
};
