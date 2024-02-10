// React - React Native 
import React, {useState} from 'react';
import {View, Text, ImageBackground, StatusBar, Pressable} from 'react-native';

// Custom components
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

// styles
import styles from './Login.style';
import colors from '../../../utils/colors';

// auth
import auth from '@react-native-firebase/auth';

// Formik and validation schemas
import {Formik} from 'formik';
import {LoginSchema} from '../../../utils/validations';

// Flash Message
import { showMessage } from 'react-native-flash-message';
import { getAuthErrorMessage } from '../../../utils/firebaseErrors';

const errorStyles = {
  marginBottom: 8,
  color: 'red',
  fontWeight: 'bold',
  textAlign: "center",
};

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  async function login(values) {
    const {email, password} = values;
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      showMessage({
        message: getAuthErrorMessage(error.code),
        type: "danger",
      })
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpg')}
      style={styles.container}
      blurRadius={12}
      resizeMode="cover">
      <StatusBar barStyle={'light-content'} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* Top */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.heading}>Kitap Dostum</Text>
          <Text style={styles.headingDescription}>
            Kitap Dostum uygulamasına hoşgeldiniz, favori kitaplarınızı
            paylaşabilir. Başkalarının favori kitaplarına erişebilirsiniz!
          </Text>
        </View>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => login(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              {/* Inputs */}
              <Input
                placeholder={'E-posta Adresi'}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={errorStyles}>{errors.email}</Text>
              )}
              <Input
                placeholder={'Şifre'}
                onChangeText={handleChange('password')}
                secureEntry
              />
              {touched.password && errors.password && (
                <Text style={errorStyles}>{errors.password}</Text>
              )}

              {/* Button */}
              <Button
                oval={true}
                label={'Giriş Yap'}
                additionalStyles={{
                  container: {
                    backgroundColor: colors.success,
                  },
                }}
                loading={loading}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        {/* Additional Buttons */}
        <View style={styles.additionalButtonsContainer}>
          <Pressable onPress={() => console.log('Forget password')}>
            <Text style={styles.pressableLabel}>Şifremi Unuttum</Text>
          </Pressable>

          <View style={{width: 16}} />

          <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.pressableLabel}>Kayıt ol</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
