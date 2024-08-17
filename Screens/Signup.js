import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Actionsheet, useDisclose, NativeBaseProvider } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); 
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleSignup = async () => {
    if (!name || !email || !password || !userType) {
      Alert.alert("All fields are required!");
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.142:8000/api/register', {
        name,
        email,
        password,
        user_type: userType.toLowerCase(),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 5000, // 5 seconds timeout for the request
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem('userToken', token);
        Alert.alert("Signup Successful!", "You have been registered successfully.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Signup Failed", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code not in the range of 2xx
        Alert.alert("Error", `Server responded with status ${error.response.status}: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        // The request was made, but no response was received
        Alert.alert("Network Error", "No response received. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert("Error", `Error in request setup: ${error.message}`);
      }
    }
  };
  
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/truck.png')} />
        <Text style={styles.title}>Signup</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={name}
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize='none'
          />

          <View>
            <TouchableOpacity onPress={onOpen} style={styles.actionsheetView}>
              <Text style={styles.userTypeText}>
                {userType || "Select User"} 
              </Text>
            </TouchableOpacity>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content backgroundColor="white">
                <Actionsheet.Item
                  backgroundColor="#fc8019"
                  style={styles.actionsheetItem}
                  onPress={() => { 
                    setUserType("Customer"); 
                    onClose(); 
                  }}
                >
                  <Text style={styles.centeredText}>Customer</Text>
                </Actionsheet.Item>
                <Actionsheet.Item
                  backgroundColor="#fc8019"
                  style={styles.actionsheetItem}
                  onPress={() => { 
                    setUserType("Admin"); 
                    onClose(); 
                  }}
                >
                  <Text style={styles.centeredText}>Admin</Text>
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity 
            onPress={handleSignup}
            style={styles.button}
          >
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Have an Account?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 33,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 30,
    color: "#fc8019",
  },
  inputView: {
    gap: 20,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#fc8019",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: "#fc8019",
    height: 45,
    borderColor: "gray",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 18,
  },
  footerView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  footerText: {
    color: "gray",
  },
  signup: {
    color: "#fc8019",
    fontSize: 15,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginLeft: 7,
  },
  actionsheetView: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#fc8019",
    justifyContent: "center", 
    backgroundColor:'white'
  },
  userTypeText: {
    fontSize: 14,
  },
  actionsheetItem: {
    marginVertical: 5, 
    borderRadius: 10,  
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 50, 
  },
  centeredText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
});
