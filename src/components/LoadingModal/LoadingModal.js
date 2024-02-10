import React from 'react'
import {View,Text, ActivityIndicator} from 'react-native'
import LottieView from 'lottie-react-native'
import Modal from 'react-native-modal'

const LoadingModal = ({progress,visible,label}) => {
    return (
        <View>
      <Modal isVisible={visible}>
        <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} color={"white"}/>
          <Text style={{fontSize: 24, color: 'white',marginTop: 8, textAlign: "center"}}>{label}... {"\n"}%{progress}</Text>
        </View>
      </Modal>
    </View>
    )
}

export default LoadingModal