import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import ImageViewer from "./components/ImageViewer";
import { useState, useRef } from "react";
import Button from "./components/button";
import * as ImagePicker from "expo-image-picker";
import OptionsRow from "./components/options_row/options_row";
import EmojiPicker from "./components/emoji_picker_modal";
import EmojiList from "./components/emoji_list";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiSticker from "./components/emoji_sticker";
import domtoimage from "dom-to-image";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const placeholderImage =
  "https://docs.expo.dev/static/images/tutorial/background-image.png";

export default function App() {
  const imageRef = useRef();
  const [showAppOptions, setAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, requestPermissions] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermissions();
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onReset = () => {
    setAppOptions(false);
  };

  const onSave = () => {};
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setAppOptions(true);
    } else {
      alert("You did not pick any image");
    }
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View styles={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              placeholderImageSource={{ uri: placeholderImage }}
              selectedImage={selectedImage}
            />
            {pickedEmoji !== null ? (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            ) : null}
          </View>
        </View>
        {showAppOptions ? (
          <OptionsRow
            onPressReset={onReset}
            onPressAdd={onAddSticker}
            onPressSave={onSaveImageAsync}
          ></OptionsRow>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImage}
            />
            <Button
              label="Use this photo"
              onPress={() => setAppOptions(true)}
            />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#25292e",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "red",
  },
  footerContainer: {
    justifyContent: "center",
    paddingBottom: 58,
  },
});
