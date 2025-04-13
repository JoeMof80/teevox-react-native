import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { ShimmerSkeleton } from "@/components/ShimmerSkeleton";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  Text,
  TouchableHighlight,
  View,
  LayoutChangeEvent,
} from "react-native";

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

  const onTextLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    console.log(`Text height: ${height}px, index: ${index}`);
  };

  const onSkeletonLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    console.log(
      `Skeleton row height: ${height}px, padding: 16px, shimmer: 14px, index: ${index}`,
    );
  };

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
        className={`bg-white dark:bg-neutral-800 mx-5 ${
          index === 0 ? "rounded-t-xl" : ""
        } ${index === 9 ? "rounded-b-xl" : ""}`}
        onLayout={onSkeletonLayout}
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
      <TouchableHighlight
        underlayColor={
          Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
        }
        className={`${index === 0 ? "rounded-t-xl" : ""} ${
          index === (displayedCourses?.length ?? 0) - 1 ? "rounded-b-xl" : ""
        } bg-white dark:bg-neutral-800 mx-5`}
      >
        <View
          className={`flex flex-row justify-between items-center ${
            index !== (displayedCourses?.length ?? 0) - 1
              ? "border-b border-neutral-200 dark:border-neutral-600"
              : ""
          } ml-5 py-3 pr-5`}
        >
          <Text className="text-lg dark:text-white" onLayout={onTextLayout}>
            {item.course_name}
          </Text>
          <IconSymbol name="chevron.right" color="gray" size={16} />
        </View>
      </TouchableHighlight>
    </Link>
  );
};
