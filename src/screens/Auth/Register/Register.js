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
import {Formik} from 'formik';

import styles from './Register.style';
import colors from '../../../utils/colors';

import PickImage from '../../../components/PickImage/PickImage';
import {RegisterSchema} from '../../../utils/validations';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';
import {showMessage} from 'react-native-flash-message';

const errorStyles = {
  marginBottom: 8,
  color: 'red',
  fontWeight: 'bold',
};

const Register = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  async function register(values) {
    const {nameSurname, emailAddress, username, password, image} = values;
    try {
      setLoading(true);
      const userDoc = await firestore().collection('Users').doc(username).get();
      if (userDoc.exists) {
        showMessage({
          message: 'Bu kullanıcı adı ile bir kullanıcı zaten bulunuyor!',
          type: 'danger',
        });
        setLoading(false)
      } else {
        const querySnapshot = await firestore()
          .collection('Users')
          .where('emailAddress', '==', emailAddress)
          .get();
        const docsLength = querySnapshot.docs.length;
        if (docsLength === 0) {
          await firestore().collection('Users').doc(username).set({
            nameSurname,
            emailAddress,
            username,
            image: null,
            likes: [],
          });
          if(image) {
            const profileImageReference = storage().ref(`/users/${username}`)
            const task = profileImageReference.putFile(image)
            task.on('state_changed', taskSnapshot => {
              const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
              setLoadingProgress(progress.toFixed(0))
            })
            task.then(async () => {
              const profileImageURL = await profileImageReference.getDownloadURL()
              await firestore().collection('Users').doc(username).update({
                image: profileImageURL
              })
              await auth().createUserWithEmailAndPassword(emailAddress,password)
              setLoading(false)
            })
          }
        }
        else {
          showMessage({
            message: "Bu e-posta adresi ile bir kullanıcı zaten bulunuyor!",
            type: "danger"
          })
          setLoading(false)
        }
      }

      const querySnapshot = await firestore()
        .collection('Users')
        .where('emailAddress', '==', emailAddress)
        .get();
      const docsLength = querySnapshot.docs.length;
      if (docsLength === 0) {
        // Bu email adresiyle kayıtlı kullanıcı yoksa
        await firestore().collection('Users').doc(username).set({
          nameSurname,
          emailAddress,
          username,
          image: null,
          favoritePosts: [],
          posts: [],
        });
      }
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpg')}
      style={styles.container}
      blurRadius={12}
      resizeMode="cover">
      <SafeAreaView>
        <LoadingModal visible={loading} progress={loadingProgress} label={"Kayıt olunuyor"}/>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color={colors.white} size={48} />
        </Pressable>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Top */}
          <View style={styles.topContainer}>
            <Text style={styles.heading}>Kayıt Ol</Text>
          </View>

          <Formik
            initialValues={{
              image: image,
              nameSurname: '',
              username: '',
              emailAddress: '',
              password: '',
              passwordAgain: '',
              posts: [],
              favoritePosts: [],
            }}
            validationSchema={RegisterSchema}
            onSubmit={values => {
              register(values);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => {
              return (
                <>
                  <PickImage
                    image={image}
                    setImage={setImage}
                    handleImageChange={imageURI => {
                      setFieldValue('image', imageURI);
                    }}>
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

                  <Input
                    oval={false}
                    label={'Ad Soyad'}
                    value={values.nameSurname}
                    onChangeText={handleChange('nameSurname')}
                  />
                  {touched.nameSurname && errors.nameSurname && (
                    <Text style={errorStyles}>{errors.nameSurname}</Text>
                  )}
                  <Input
                    oval={false}
                    value={values.emailAddress}
                    label={'E-posta Adresi'}
                    onChangeText={handleChange('emailAddress')}
                  />
                  {touched.emailAddress && errors.emailAddress && (
                    <Text style={errorStyles}>{errors.emailAddress}</Text>
                  )}
                  <Input
                    oval={false}
                    value={values.username}
                    label={'Kullanıcı Adı'}
                    onChangeText={handleChange('username')}
                  />
                  {touched.username && errors.username && (
                    <Text style={errorStyles}>{errors.username}</Text>
                  )}

                  <Input
                    oval={false}
                    label={'Şifre'}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={errorStyles}>{errors.password}</Text>
                  )}
                  <Input
                    oval={false}
                    label={'Şifre Tekrar'}
                    value={values.passwordAgain}
                    onChangeText={handleChange('passwordAgain')}
                    secureEntry={true}
                  />
                  {touched.passwordAgain && errors.passwordAgain && (
                    <Text style={errorStyles}>{errors.passwordAgain}</Text>
                  )}
                  <Button
                    label={'Kayıt Ol'}
                    onPress={handleSubmit}
                    additionalStyles={{
                      container: {backgroundColor: colors.success},
                    }}
                    loading={loading}
                  />
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;
