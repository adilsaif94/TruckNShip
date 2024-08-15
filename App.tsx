import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './Screens/Login'
import Navigators from './Navigator/Navigators'
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer>
      <Navigators />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})