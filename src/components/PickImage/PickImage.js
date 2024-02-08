import {useState} from 'react'
import Modal from 'react-native-modal';
import {View, Text, StyleSheet, Image,Pressable} from 'react-native';
import Button from '../Button/Button';

import colors from '../../utils/colors';

import { takePhotoFromCamera, pickImageFromGallery } from '../../utils/functions';

const styles = StyleSheet.create({
  modalHeader: {
    color: colors.black,
    fontSize: 24,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  pickImageButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  pickImageLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
  },
});

const PickImage = ({image,setImage,children}) => {

  const [modalVisible,setModalVisible] = useState(false)  

  return (
    <View>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.pickImageButtonContainer}>
        {children}
      </Pressable>
      <View>
        <Modal
          isVisible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          useNativeDriver={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Resim Seçiniz</Text>
            <View style={styles.buttonsContainer}>
              <Button
                icon={{
                  name: 'camera',
                  size: 24,
                  color: colors.white,
                }}
                additionalStyles={{
                  container: {
                    backgroundColor: colors.success,
                  },
                }}
                label={'Kameradan Çek'}
                onPress={() => takePhotoFromCamera(setImage,setModalVisible)}
              />
              <Button
                icon={{
                  name: 'image',
                  size: 24,
                  color: colors.white,
                }}
                additionalStyles={{
                  container: {
                    backgroundColor: colors.success,
                  },
                }}
                label={'Galeriden Seç'}
                onPress={() => pickImageFromGallery(setImage,setModalVisible)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PickImage;
