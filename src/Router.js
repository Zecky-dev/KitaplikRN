import React, {useState, useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ModalPortal} from 'react-native-modals';

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

// auth
import auth from '@react-native-firebase/auth';

// Flash Message
import FlashMessage from 'react-native-flash-message';

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
    </Stack.Navigator>
  );
};

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
        unmountOnBlur: true
      }}>
      <Stack.Screen
        name="FeedScreen"
        component={Feed}
        options={{
          title: 'Akış',
        }}
      />
      <Stack.Screen
        name="ProfileDetailScreen"
        component={Account}
        options={{
          title: 'Profil Detay',
        }}
      />
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
        name="FeedTabScreen"
        component={FeedStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown: false,
          headerTitle: 'Akış',
        }}
      />
      <Tab.Screen
        name="AccountTabScreen"
        component={Account}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="account" size={size} color={color} />
          ),
          headerTitle: 'Hesabım',
        }}
        initialParams={{
          emailAddress: auth().currentUser.email
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent={true} />
        {user ? <MainTabs /> : <AuthStack />}
      </NavigationContainer>
      <ModalPortal />
      <FlashMessage position={'top'} />
    </>
  );
};

export default App;
