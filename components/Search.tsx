import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchProps {
  onSearch: (value: string) => void;
}
export const Search = ({ onSearch }: SearchProps) => {
  const [text, onChangeText] = React.useState("");
  const onEndEditing = () => {
    onSearch(text);
  };

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        placeholder='Search Pokemon'
        autoCapitalize='none'
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
