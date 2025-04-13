import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { View } from "react-native";

interface SegmentedControlViewProps {
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  children?: React.ReactNode;
}

export const SegmentedControlView = ({
  selectedIndex,
  onIndexChange,
  children,
}: SegmentedControlViewProps) => {
  return (
    <View className="flex-1">
      <SegmentedControl
        values={["Nearby", "Recent"]}
        selectedIndex={selectedIndex}
        onChange={(event) =>
          onIndexChange(event.nativeEvent.selectedSegmentIndex)
        }
        className="mx-5 mb-2"
        style={{
          marginTop: 0,
          margin: 16,
        }}
      />
      {children}
    </View>
  );
};
