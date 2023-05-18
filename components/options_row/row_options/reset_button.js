import { StyleSheet, View, Pressable, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ResetButton({ onPress }) {
  return (
    <View style={style.circleButtonContainer}>
      <Pressable style={style.circleButton} onPress={onPress}>
        <MaterialIcons name={"refresh"} size={38} color="white" />
        <Text style={style.textStyle}> Reset </Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  circleButton: {
    marginTop: 7,
    height: 70,
    width: 84,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    color: "white",
  },
});
