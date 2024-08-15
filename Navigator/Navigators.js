import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import CustomerDashboard from '../Screens/CustomerDashboard';
import CreateShipment from '../Screens/CreateShipment';
import AdminDashboard from '../Screens/AdminDashboard';


const Stack = createNativeStackNavigator();

const Navigators = () => {
  return (
    <>
      <StatusBar backgroundColor="#cd220b" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="CreateShipment" component={CreateShipment} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />

      </Stack.Navigator>
    </>

  );
};


export default Navigators

