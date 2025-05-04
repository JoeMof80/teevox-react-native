import { IconSymbol } from "@/components/ui/IconSymbol";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Text, TouchableHighlight } from "react-native";

export default function PlayLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Courses",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <Link href="./play/add-course" asChild>
              <TouchableHighlight>
                <IconSymbol size={24} name="plus" color="#3b82f6" />
              </TouchableHighlight>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="add-course"
        options={{
          title: "New Course",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="round"
        options={{
          title: "Round",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
