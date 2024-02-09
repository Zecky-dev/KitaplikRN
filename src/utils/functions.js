import { launchCamera,launchImageLibrary } from "react-native-image-picker";

async function takePhotoFromCamera(setImage,setModalVisible,handleImageChange) {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'front',
        quality: 1,
      });
      const imageURI = result.assets[0].uri
      setImage(imageURI);
      handleImageChange(imageURI)
    } catch (err) {
      console.log("Error: ", err.message)
    }
    finally {
      setModalVisible(false)
    }
  }

async function pickImageFromGallery(setImage,setModalVisible,handleImageChange) {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 1,
      });
      const imageURI = result.assets[0].uri
      setImage(imageURI);
      handleImageChange(imageURI)
    } catch (err) {
      console.log("Error: ",err.message)
    }
    finally {
      setModalVisible(false)
    }
}

export {takePhotoFromCamera,pickImageFromGallery}