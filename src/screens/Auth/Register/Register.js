import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import styles from './Register.style';
import colors from '../../../utils/colors';

import PickImage from '../../../components/PickImage/PickImage';

const Register = ({navigation}) => {
  const [image, setImage] = useState(null);

  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpg')}
      style={styles.container}
      blurRadius={12}
      resizeMode="cover">
      <SafeAreaView>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color={colors.white} size={48} />
        </Pressable>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Top */}
          <View style={styles.topContainer}>
            <Text style={styles.heading}>Kayıt Ol</Text>
          </View>

          <PickImage image={image} setImage={setImage}>
            <Image
              source={
                !image
                  ? require('../../../assets/images/avatar_icon.png')
                  : {uri: image}
              }
              style={styles.profileImage}
            />
            {!image && (
              <Text style={styles.pickImageLabel}>
                Fotoğraf Seç (Opsiyonel)
              </Text>
            )}
          </PickImage>

          <Input oval={false} label={'Ad Soyad'} onChangeText={() => null} />
          <Input
            oval={false}
            label={'E-posta Adresi'}
            onChangeText={() => null}
          />
          <Input
            oval={false}
            label={'Şifre'}
            onChangeText={() => null}
            secureEntry={true}
          />
          <Input
            oval={false}
            label={'Şifre Tekrar'}
            onChangeText={() => null}
            secureEntry={true}
          />

          <Button
            label={'Kayıt Ol'}
            onPress={() => console.log('Kayıt Ol')}
            additionalStyles={{
              container: {backgroundColor: colors.success},
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;
