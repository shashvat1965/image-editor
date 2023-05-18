import { StyleSheet, View, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddButton from "./row_options/add_button";
import ResetButton from "./row_options/reset_button";
import SaveButton from "./row_options/save_button";

export default function OptionsRow({ onPressReset, onPressAdd, onPressSave }) {
  return (
    <View style={style.rowStyle}>
      <ResetButton onPress={onPressReset}></ResetButton>
      <AddButton onPress={onPressAdd}></AddButton>
      <SaveButton onPress={onPressSave}></SaveButton>
    </View>
  );
}

const style = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    gap: 20,
  },
});
