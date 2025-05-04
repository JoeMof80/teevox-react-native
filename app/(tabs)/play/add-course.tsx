import React, { useState } from "react";
import { useNavigation } from "expo-router";
import GolfCourseForm from "@/components/GolfCourseForm";
import { Text, TouchableHighlight } from "react-native";

export default function GolfCourseFormScreen() {
  const navigation = useNavigation();
  const [course, setCourse] = useState<GolfCourse>({
    id: 0,
    club_name: "",
    course_name: "",
    tees: {
      female: [],
      male: [],
    },
  });

  const canSubmit = course.club_name.trim() && course.course_name.trim();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          onPress={() => {
            if (canSubmit) {
              console.log("Header Submit pressed", course);
              handleSubmit();
            }
          }}
          disabled={!canSubmit}
        >
          <Text
            style={{
              color: canSubmit ? "#3b82f6" : "#9ca3af",
              fontSize: 16,
            }}
          >
            Save
          </Text>
        </TouchableHighlight>
      ),
      headerStyle: { backgroundColor: "#262626" },
      headerTintColor: "#fff",
    });
  }, [navigation, course.club_name, course.course_name]);

  const handleSubmit = () => {
    if (canSubmit) {
      console.log("Submitted Golf Course from Header:", course);
      setCourse({
        id: 0,
        club_name: "",
        course_name: "",
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
          latitude: 0,
          longitude: 0,
        },
        tees: {
          female: [],
          male: [],
        },
      });
      navigation.goBack();
    }
  };

  return <GolfCourseForm initialCourse={course} onSubmit={setCourse} />;
}
