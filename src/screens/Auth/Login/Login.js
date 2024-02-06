import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Pressable,
} from "react-native";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import styles from "./Login.style";
import colors from "../../../utils/colors";


const Login = ({navigation}) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")}
      style={styles.container}
      blurRadius={12}
      resizeMode="cover"
    >
      <StatusBar barStyle={"light-content"} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* Top */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.heading}>Kitap Dostum</Text>
          <Text style={styles.headingDescription}>
            Kitap Dostum uygulamasına hoşgeldiniz, favori kitaplarınızı
            paylaşabilir. Başkalarının favori kitaplarına erişebilirsiniz!
          </Text>
        </View>

        {/* Inputs */}
        <Input placeholder={"E-posta Adresi"} onChangeText={(text) => null} />
        <Input
          placeholder={"Şifre"}
          onChangeText={(text) => null}
          secureEntry
        />

        {/* Button */}
        <Button
          oval={true}
          label={"Giriş Yap"}
          additionalStyles={{
            container: {
              backgroundColor: colors.success,
            },
          }}
          onPress={() => console.log("Giriş yap")}
        />

        {/* Additional Buttons */}
        <View
          style={styles.additionalButtonsContainer}>

          <Pressable onPress={() => console.log("Forget password")}>
            <Text style={styles.pressableLabel}>
              Şifremi Unuttum
            </Text>
          </Pressable>

          <View style={{ width: 16 }} />

          <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.pressableLabel}>
              Kayıt ol
            </Text>
          </Pressable>


       

        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
