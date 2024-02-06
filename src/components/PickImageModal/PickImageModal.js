import Modal from 'react-native-modal'
import {View,Text, StyleSheet} from 'react-native'
import Button from '../Button/Button'

import colors from '../../utils/colors'

const styles = StyleSheet.create({
    modalHeader: {
        color: colors.black,
        fontSize: 24,
        textAlign: "center",
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
    }
})


const PickImageModal = ({modalVisible,setModalVisible,takePhotoFromCamera,pickImageFromGallery}) => {
    return (
        <View>
            <Modal
            isVisible={modalVisible}
            onBackButtonPress={() => setModalVisible(false)}
            onBackdropPress={() => setModalVisible(false)}
            useNativeDriver={true}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>
                        Resim Seçiniz
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <Button
                            icon={{
                                name: "camera",
                                size: 24,
                                color: colors.white
                            }}
                            additionalStyles={{
                                container: {
                                    backgroundColor: colors.success
                                }
                            }}
                            label={"Kameradan Çek"}
                            onPress={takePhotoFromCamera}
                        />
                        <Button
                            icon={{
                                name: "image",
                                size: 24,
                                color: colors.white
                            }}
                            additionalStyles={{
                                container: {
                                    backgroundColor: colors.success
                                }
                            }}
                            label={"Galeriden Seç"}
                            onPress={pickImageFromGallery}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default PickImageModal