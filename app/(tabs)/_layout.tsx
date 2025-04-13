import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[colorScheme ?? "light"].tabBarActiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Prepare",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol
              size={28}
              name="figure.strengthtraining.functional"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol
              size={28}
              name="figure.strengthtraining.traditional"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: "Play",
          unmountOnBlur: false, // Keep play tab mounted
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="figure.golf" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: "Review",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="figure.run" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
