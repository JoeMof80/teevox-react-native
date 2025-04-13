import { Stack } from "expo-router";

export default function PlayLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="round" options={{ title: "Round" }} />
    </Stack>
  );
}
