import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddProductStackNavigator, CartStackNavigator, MainStackNavigator, PaymentStackNavigator, ProfileStackNavigator } from './StackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../features/context/authContext';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const {isLoggedIn, currentUser} = useContext(AuthContext)
  return isLoggedIn && (currentUser.role === "seller" || currentUser.role === "admin") ? (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor:'#e6e6fa',
        tabBarInactiveBackgroundColor:'#e6e6fa',
        tabBarHideOnKeyboard:1,
      }}
    >
      <Tab.Screen
        name="home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size=30} color={color} />
          ),
        }}
      />
      <Tab.Screen name="cart" component={CartStackNavigator}
        options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="cart" size={size=30} color={color} />
            ),
          }}
      />
      <Tab.Screen name="AddProduct" component={AddProductStackNavigator}
        options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="plus-circle" size={size=29} color={color} />
            ),
          }}
      />
      
      
       <Tab.Screen name="profile" component={ProfileStackNavigator}
        options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="account" size={size=35} color={color} />
            ),
          }}
      />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor:'#e6e6fa',
        tabBarInactiveBackgroundColor:'#e6e6fa',
        tabBarHideOnKeyboard:1,
    
      }}
    >
      <Tab.Screen
        name="home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size=30} color={color} />
          ),
        }}
      />
      <Tab.Screen name="cart" component={CartStackNavigator}
        options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="cart" size={size=30} color={color} />
            ),
          }}
      />
       <Tab.Screen name="profile" component={ProfileStackNavigator}
        options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="account" size={size=35} color={color} />
            ),
          }}
      />
    </Tab.Navigator>
  );
};