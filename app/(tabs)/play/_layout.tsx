import { PlayProvider } from "@/context/play";
import { Stack } from "expo-router";

const screens = [
  { name: "index", title: "Courses" },
  { name: "add-course", title: "New Course" },
  { name: "round", title: "Round" },
  { name: "select-ball", title: "Ball" },
  { name: "select-tee", title: "Tee" },
];

export default function PlayLayout() {
  return (
    <PlayProvider>
      <Stack>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={{
              title: `${screen.title}`,
              headerStyle: {
                backgroundColor: "#000",
              },
              headerTintColor: "#fff",
            }}
          />
        ))}
      </Stack>
    </PlayProvider>
  );
}
