import { View, Text, Button,Image, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { Owner } from '@/components/objectCatalouge';
import { fSize } from '@/components/fontSize';
import { colorTemplate } from '@/components/colors';
import { AuthContext } from "../../components/authContext";
import { useContext } from "react";
import { ApiService } from "@/components/apiAxios";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "@/components/notif";

export default function HomeScreen() {
  const { getUserObject } = useContext(AuthContext);
  const { getToken } = useContext(AuthContext);
  useEffect(() => {
      registerForPushNotificationsAsync().then(pushToken => {
        if (pushToken) {
          console.log("FCM Token:", pushToken);
          regisToken(pushToken);
          // Kirim token ke backend untuk disimpan
        }
      });
    }, []);


  const regisToken = async (token: string) => {
      const response = await ApiService.registerPushToken(getToken(), token);
    };

  
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop:20}}>
      <Text style={{fontSize:fSize.h2,fontWeight:"bold", color:colorTemplate[0]}}>Halo, {getUserObject()?.profile_obj.name}!</Text>
      <Image
                style={styles.avatar_image}
                source={{uri: ApiService.BASE_URL+getUserObject()?.profile_obj.photos}}
                />
      <Text style={{fontSize:fSize.h3,fontWeight:"bold", color:colorTemplate[1]}}>Hewan peliharaanmu sudah menunggu!</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  
  avatar_image:{
    borderRadius:150,
    width:300,
    height: 300, 
    margin:0, 
    padding:0,
    borderWidth:2,
    marginVertical:20,
    borderColor:colorTemplate[2],
    textAlign:"center"
  }});