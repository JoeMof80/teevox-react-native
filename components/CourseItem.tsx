import { ShimmerSkeleton } from "@/components/ShimmerSkeleton";
import { usePlayContext } from "@/context/play";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import LinkItem from "./LinkItem";

interface CourseItemProps {
  item: GolfCourse;
  index: number;
  displayedCourses: GolfCourse[] | null;
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
}

export const CourseItem = ({
  item,
  index,
  displayedCourses,
  isLoading,
  error,
  searchQuery,
}: CourseItemProps) => {
  const { colorScheme } = useColorScheme();
  const { setSelectedCourse } = usePlayContext();

  if (error && searchQuery.trim()) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-2xl font-bold">
          Error: ${error.message}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        className={`bg-white dark:bg-neutral-800 ${
          index === 0 ? "rounded-t-xl" : ""
        } ${index === 9 ? "rounded-b-xl" : ""}`}
      >
        <View
          className={`flex flex-row justify-between items-center ml-5 pr-5 ${
            index !== 9
              ? "border-b border-neutral-200 dark:border-neutral-600"
              : ""
          }`}
          style={{ paddingVertical: 16 }}
        >
          <ShimmerSkeleton height={14} style={{ width: "50%" }} />
          <ShimmerSkeleton height={14} style={{ width: 10 }} />
        </View>
      </View>
    );
  }

  return (
    <Link href={`./play/round?id=${item.id}`} asChild>
      <LinkItem
        label={item.course_name}
        roundedClasses={`${index === 0 ? "rounded-t-xl" : ""} ${
          index === (displayedCourses?.length ?? 0) - 1 ? "rounded-b-xl" : ""
        }`}
        borderClasses={`${
          index !== (displayedCourses?.length ?? 0) - 1
            ? "border-b border-neutral-200 dark:border-neutral-600"
            : ""
        }`}
        onPress={() => setSelectedCourse(item)}
      />
    </Link>
  );
};
