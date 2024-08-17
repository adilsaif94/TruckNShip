import { Alert, Image, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

 
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const user_type = await AsyncStorage.getItem('user_type'); 
        if (user_type && user_type.toLowerCase() === 'admin') {
          navigation.navigate('AdminDashboard');
        } else if (user_type && user_type.toLowerCase() === 'customer') {
          navigation.navigate('CustomerDashboard');
        } else {
          Alert.alert("Login Failed", "Invalid user type.");
        }
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.142:8000/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token, user_type } = response.data;

        if (token) {
          // Save token to AsyncStorage
          await AsyncStorage.setItem('jwtToken', token);
          await AsyncStorage.setItem('user_type', user_type); 

          if (!user_type) {
            Alert.alert("Login Failed", "User type is not defined.");
            return;
          }

          Alert.alert("Login Successful!", "You have logged in successfully.");

          // Navigate based on user type
          if (user_type.toLowerCase() === 'admin') {
            navigation.navigate('AdminDashboard');
          } else if (user_type.toLowerCase() === 'customer') {
            navigation.navigate('CustomerDashboard');
          } else {
            Alert.alert("Login Failed", "Invalid user type.");
          }
        } else {
          Alert.alert("Login Failed", "No token received.");
        }
      } else {
        Alert.alert("Login Failed", response.data.message || "Invalid username or password.");
      }
    } catch (error) {

      if (error.response) {
        Alert.alert("Login Failed", error.response.data.message || "Invalid username or password.");
      } else {
        Alert.alert("Network Error", "Please check your internet connection.");
      }
    }
  };

 
  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('user_type');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/truck.png')} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
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
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={rememberMe}
            onValueChange={(value) => setRememberMe(value)}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => Alert.alert("Forget Password!")}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Don't Have an Account?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
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
    backgroundColor: 'white',
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
    fontWeight: '500',
  },
  forgetText: {
    fontSize: 11,
    color: "#fc8019",
    fontWeight: '500',
  },
  button: {
    backgroundColor: "#fc8019",
    height: 45,
    borderColor: "gray",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
});
