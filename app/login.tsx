import { router } from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, Alert, Text, View, Image, TextInput, Button } from 'react-native';
import { colorTemplate } from '@/components/colors';
import { fSize, fontSizeStyle } from '@/components/fontSize';
// import { ApiService } from "@/design/api";
import { ApiService } from "@/components/apiAxios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/authContext";
// import { useEffect } from "react";
// import { registerForPushNotificationsAsync } from "../components/notif";

export default function SignIn() {
  const { signIn } = useAuth();

  const Separator = () => <View style={styles.separator} />;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await ApiService.login(username, password);
    if (response?.status == 200) {
      console.log('sukses');
      signIn(JSON.stringify({
        jwt: response.token,
        userObject: jwtDecode(response.token)
      }));
    }
    else
      alert('Userame atau Password salah, coba lagi yakk!');
    // console.log(jwtDecode(response.token));
    // console.log('handlelogin');
  };


  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo-512.png')} style={styles.logo} />
      <Text style={styles.h1}>SELAMAT DATANG DI APLIKASI CRMDRH.COM</Text>
      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />
      {/* <Text
        onPress={() => {
          alert('oke');
          signIn(['ahayayayay']);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/(app)");
        }}>
        Sign Inasdasdklkajsdl;lkasdl;askjd;aslkdsal;dajs;dkashdjas;lkdas;ldkas;dk
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    flex: 1,
    paddingHorizontal: 15,
    // alignContent: 'flex-start',
    // justifyContent:'flex-start',
    justifyContent: "flex-start",
    backgroundColor: colorTemplate[10],
    flexDirection: "column",
    height: 800
  },
  logo: {
    // flex:1,
    resizeMode: 'contain',
    width: 200,
    height: 200,
    alignSelf: "center"
    // margin:0
  },
  h1: {
    marginTop: 20,
    marginBottom: 40,
    color: 'white',
    fontSize: fSize.h3,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#FFFFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
})
