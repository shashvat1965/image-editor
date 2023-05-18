import { StyleSheet, View, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AddButton({ onPress }) {
  return (
    <View style={style.circleButtonContainer}>
      <Pressable style={style.circleButton} onPress={onPress}>
        <MaterialIcons name={"add"} size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 42,
    padding: 5,
    marginBottom: 80,
  },
  circleButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
