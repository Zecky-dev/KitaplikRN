import React, {useState} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { ModalPortal } from 'react-native-modals';

// Screens
import Login from './screens/Auth/Login/Login';
import Register from './screens/Auth/Register/Register';
import Feed from './screens/Feed/Feed';
import Account from './screens/Account/Account';

// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './utils/colors';

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
    </Stack.Navigator>
  );
};

// Feed
// Create New Post
// Account

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
      }}>
      <Tab.Screen
        name="FeedScreen"
        component={Feed}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerTitle: 'Akış',
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={Account}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="account" size={size} color={color} />
          ),
          headerTitle: 'Hesabım',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
      <>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent={true} />
        {loggedIn ? <MainTabs /> : <AuthStack />}
      </NavigationContainer>
      <ModalPortal/>
      </>
      
  );
};

export default App;
