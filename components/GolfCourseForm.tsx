import { useBottomTabOverflow } from "@/components/ui/TabBarBackground.ios";
import { Colors } from "@/constants/Colors";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface GolfCourseFormProps {
  initialCourse?: GolfCourse;
  onSubmit: (course: GolfCourse) => void;
}

const GolfCourseForm: React.FC<GolfCourseFormProps> = ({
  initialCourse,
  onSubmit,
}) => {
  const bottom = useBottomTabOverflow();
  const { colorScheme } = useColorScheme();
  const [course, setLocalCourse] = useState<GolfCourse>(
    initialCourse
      ? initialCourse
      : {
          id: 0,
          club_name: "",
          course_name: "",
          tees: {
            female: [],
            male: [],
          },
        },
  );

  const [currentTee, setCurrentTee] = useState<Tee>({
    tee_name: "",
    number_of_holes: 18,
    holes: [],
  });
  const [holeInputs, setHoleInputs] = useState<string[]>(Array(18).fill(""));
  const [teeGender, setTeeGender] = useState<"male" | "female">("male");
  const [error, setError] = useState("");
  const [editingTeeIndex, setEditingTeeIndex] = useState<number | null>(null); // For editing existing tees

  const startEditingTee = (
    tee: Tee,
    index: number,
    gender: "male" | "female",
  ) => {
    setCurrentTee(tee);
    setTeeGender(gender);
    setEditingTeeIndex(index);
    setHoleInputs(
      Array(tee.number_of_holes)
        .fill("")
        .map((_, i) => (tee.holes[i]?.par || "").toString()),
    );
    setError("");
  };

  const validateHole = (par: number) => {
    return par > 0;
  };

  const validateTee = (tee: Tee, holeInputs: string[]) => {
    const holes = holeInputs
      .slice(0, tee.number_of_holes)
      .map((input) => ({ par: parseInt(input) || 0 }));
    return (
      tee.tee_name.trim() !== "" &&
      holes.length === tee.number_of_holes &&
      holes.every((hole) => validateHole(hole.par))
    );
  };

  const validateCourse = (course: GolfCourse) => {
    return (
      course.club_name.trim() !== "" &&
      course.course_name.trim() !== "" &&
      (course.tees.male.length > 0 || course.tees.female.length > 0)
    );
  };

  const addOrUpdateTee = () => {
    const holes = holeInputs
      .slice(0, currentTee.number_of_holes)
      .map((input) => ({ par: parseInt(input) || 0 }));
    const teeWithHoles = { ...currentTee, holes };

    if (validateTee(currentTee, holeInputs)) {
      if (editingTeeIndex !== null) {
        const updatedTees = [...course.tees[teeGender]];
        updatedTees[editingTeeIndex] = teeWithHoles;
        setLocalCourse({
          ...course,
          tees: {
            ...course.tees,
            [teeGender]: updatedTees,
          },
        });
      } else {
        setLocalCourse({
          ...course,
          tees: {
            ...course.tees,
            [teeGender]: [...course.tees[teeGender], teeWithHoles],
          },
        });
      }
      setCurrentTee({
        tee_name: "",
        number_of_holes: 18,
        holes: [],
      });
      setHoleInputs(Array(18).fill(""));
      setEditingTeeIndex(null);
      setError("");
    } else {
      setError(
        "Please enter a valid tee name and par (greater than 0) for all holes.",
      );
    }
  };

  const deleteTee = (index: number, gender: "male" | "female") => {
    const updatedTees = course.tees[gender].filter((_, i) => i !== index);
    setLocalCourse({
      ...course,
      tees: {
        ...course.tees,
        [gender]: updatedTees,
      },
    });
  };

  const handleSubmit = () => {
    if (validateCourse(course)) {
      onSubmit(course);
      setError("");
    } else {
      setError(
        "Please provide a club name, course name, and at least one tee.",
      );
    }
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
        <ScrollView
          contentContainerStyle={{
            paddingBottom: bottom + 16,
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
          className="bg-neutral-100 dark:bg-neutral-950 flex-1"
          keyboardShouldPersistTaps="handled"
        >
          {error ? (
            <Text className="text-red-500 dark:text-red-400 mb-4">{error}</Text>
          ) : null}

          <Text className="text-sm uppercase dark:text-neutral-500 mt-5 ml-5 mb-2">
            Course
          </Text>
          <View className="bg-white dark:bg-neutral-800 rounded-xl mb-4">
            <View className="flex-row justify-between items-center border-b border-neutral-200 dark:border-neutral-600 px-5 py-3">
              <Text className="text-xl dark:text-white">Club Name</Text>
              <TextInput
                value={course.club_name}
                onChangeText={(text) =>
                  setLocalCourse({ ...course, club_name: text })
                }
                placeholder="Enter club name"
                placeholderTextColor="#9ca3af"
                className="text-xl dark:text-white flex-1 text-right"
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>
            <View className="flex-row justify-between items-center px-5 py-3">
              <Text className="text-xl dark:text-white">Course Name</Text>
              <TextInput
                value={course.course_name}
                onChangeText={(text) =>
                  setLocalCourse({ ...course, course_name: text })
                }
                placeholder="Enter course name"
                placeholderTextColor="#9ca3af"
                className="text-xl dark:text-white flex-1 text-right"
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>
          </View>

          <Text className="text-sm uppercase dark:text-neutral-500 mt-5 ml-5 mb-2">
            Tees
          </Text>
          <View className="bg-white dark:bg-neutral-800 rounded-xl mb-4">
            <View className="flex-row justify-between items-center border-b border-neutral-200 dark:border-neutral-600 px-5 py-3">
              <Text className="text-xl dark:text-white">Name</Text>
              <TextInput
                value={currentTee.tee_name}
                onChangeText={(text) =>
                  setCurrentTee({ ...currentTee, tee_name: text })
                }
                placeholder="Enter tee name"
                placeholderTextColor="#9ca3af"
                className="text-xl dark:text-white flex-1 text-right"
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>
            <View className="flex-row justify-between items-center border-b border-neutral-200 dark:border-neutral-600 px-5 py-2">
              <Text className="text-xl dark:text-white">Gender</Text>
              <SegmentedControl
                values={["Male", "Female"]}
                selectedIndex={teeGender === "male" ? 0 : 1}
                onValueChange={(value) =>
                  setTeeGender(value.toLowerCase() as "male" | "female")
                }
                style={{ width: 150 }}
              />
            </View>
            <View className="flex-row justify-between items-center border-b border-neutral-200 dark:border-neutral-600 px-5 py-2">
              <Text className="text-xl dark:text-white">Number of Holes</Text>
              <SegmentedControl
                values={["9", "18"]}
                selectedIndex={currentTee.number_of_holes === 9 ? 0 : 1}
                onValueChange={(value) => {
                  const numHoles = parseInt(value);
                  setCurrentTee({
                    ...currentTee,
                    number_of_holes: numHoles,
                    holes: [],
                  });
                  setHoleInputs(Array(numHoles).fill(""));
                }}
                style={{ width: 100 }}
              />
            </View>
            {Array.from({ length: currentTee.number_of_holes }, (_, index) => (
              <View
                key={index}
                className={`flex-row justify-between items-center ${
                  index !== currentTee.number_of_holes - 1
                    ? "border-b border-neutral-200 dark:border-neutral-600"
                    : ""
                } px-5 py-3`}
              >
                <Text className="text-xl dark:text-white">{index + 1}</Text>
                <TextInput
                  value={holeInputs[index]}
                  onChangeText={(text) => {
                    const newInputs = [...holeInputs];
                    newInputs[index] = text;
                    setHoleInputs(newInputs);
                  }}
                  placeholder="Enter par"
                  placeholderTextColor="#9ca3af"
                  className="text-xl dark:text-white flex-1 text-right"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            ))}
          </View>

          {(course.tees.male.length > 0 || course.tees.female.length > 0) && (
            <View className="bg-white dark:bg-neutral-800 rounded-xl mb-4">
              <Text className="text-xl dark:text-white px-5 py-3">
                Added Tees
              </Text>
              {["male", "female"].map((gender) =>
                course.tees[gender as "male" | "female"].map((tee, index) => (
                  <View
                    key={`${gender}-${index}`}
                    className="border-t border-neutral-200 dark:border-neutral-600 px-5 py-3 flex-row justify-between items-center"
                  >
                    <Text className="text-lg dark:text-white">
                      {tee.tee_name} ({tee.number_of_holes} holes, {gender})
                    </Text>
                    <View className="flex-row">
                      <TouchableHighlight
                        underlayColor={
                          Colors[colorScheme ?? "light"]
                            .touchableHighlightUnderlayColor
                        }
                        onPress={() =>
                          startEditingTee(
                            tee,
                            index,
                            gender as "male" | "female",
                          )
                        }
                        className="mr-2"
                      >
                        <Text className="text-blue-500 dark:text-blue-400">
                          Edit
                        </Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        underlayColor={
                          Colors[colorScheme ?? "light"]
                            .touchableHighlightUnderlayColor
                        }
                        onPress={() =>
                          deleteTee(index, gender as "male" | "female")
                        }
                      >
                        <Text className="text-red-500 dark:text-red-400">
                          Delete
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                )),
              )}
            </View>
          )}

          <View className="mb-4">
            <TouchableHighlight
              underlayColor={
                Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
              }
              className="bg-white dark:bg-neutral-800 rounded-xl"
              onPress={addOrUpdateTee}
              disabled={!validateTee(currentTee, holeInputs)}
            >
              <View className="border-neutral-200 dark:border-neutral-600 px-5 py-3">
                <Text
                  className={`text-lg ${
                    validateTee(currentTee, holeInputs)
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-400"
                  }`}
                >
                  {editingTeeIndex !== null ? "Update Tee" : "Add Tee"}
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View>
            <TouchableHighlight
              underlayColor={
                Colors[colorScheme ?? "light"].touchableHighlightUnderlayColor
              }
              className="bg-white dark:bg-neutral-800 rounded-xl"
              onPress={handleSubmit}
              disabled={!validateCourse(course)}
            >
              <View className="border-neutral-200 dark:border-neutral-600 px-5 py-3">
                <Text
                  className={`text-lg ${
                    validateCourse(course)
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-400"
                  }`}
                >
                  {initialCourse ? "Update Course" : "Save Course"}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GolfCourseForm;
