import { launchCamera,launchImageLibrary } from "react-native-image-picker";

async function takePhotoFromCamera(setImage,setModalVisible) {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'front',
        quality: 1,
      });
      setImage(result.assets[0].uri);
    } catch (err) {
      console.log("Error: ", err.message)
    }
    finally {
      setModalVisible(false)
    }
  }

  async function pickImageFromGallery(setImage,setModalVisible) {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 1,
      });
      setImage(result.assets[0].uri);
    } catch (err) {
      console.log("Error: ",err.message)
    }
    finally {
      setModalVisible(false)
    }
  }

  export {takePhotoFromCamera,pickImageFromGallery}