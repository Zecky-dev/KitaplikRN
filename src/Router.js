import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from './screens/Auth/Login/Login';
import Register from './screens/Auth/Register/Register';

// Navigators
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
    </Stack.Navigator>
  );
};

/*
const MainTabs = () => {
  return (

  )
}
*/

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
