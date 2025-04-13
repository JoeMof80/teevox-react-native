import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RoundScreen() {
  const { id } = useLocalSearchParams(); // Get the 'id' from the URL

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-2">Club Details</Text>
      <Text>Club ID: {id}</Text>
      <Text>This is the details page for club {id}.</Text>
    </View>
  );
}
