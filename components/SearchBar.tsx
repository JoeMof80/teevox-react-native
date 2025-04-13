import { Colors } from "@/constants/Colors";
import { SearchBar as RNESearchBar } from "@rneui/themed";
import { useColorScheme } from "nativewind";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const SearchBar = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
}: SearchBarProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <RNESearchBar
      platform="ios"
      containerStyle={{
        backgroundColor: "transparent",
        margin: 10,
        marginTop: 0,
      }}
      inputContainerStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].searchBarInputBgColor,
        padding: 0,
        margin: 0,
      }}
      inputStyle={{
        backfaceVisibility: "hidden",
        color: Colors[colorScheme ?? "light"].searchBarInputColor,
      }}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      placeholder="Search"
      placeholderTextColor="#888"
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log()}
      value={value}
      searchIcon={{ type: "ionicon", name: "search-outline" }}
      clearIcon={{ type: "ionicon", name: "close-outline" }}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      //onClearText={() => console.log()}
    />
  );
};
