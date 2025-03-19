import { FlatList, View, Text, TouchableOpacity, StyleSheet, StatusBar,Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon from Expo
import { colorTemplate } from '@/components/colors';
import React,{useContext, useEffect, useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { fSize } from "@/components/fontSize";
import { Pet } from '@/components/objectCatalouge';
import {Dimensions} from 'react-native';
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ApiService } from "@/components/apiAxios";
import { AuthContext } from "@/components/authContext";

type PetProps = {
  pet: Pet;
};

export function PetItem({ pet }: PetProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push({pathname:"/(app)/(pets)/view",params:{pet:JSON.stringify(pet)}})}>
      <View style={styles.fl_item}>
        <Image
          style={styles.fl_image}
          source={{uri: ApiService.BASE_URL+pet.photos}}
          />
          <View style={{padding:10, alignItems:'center'}}>
            <Text style={styles.fl_name}>{pet.name}</Text>
            <Text style={styles.fl_age}>{pet.age}</Text>
            <Text>🍽: {pet.fFood} 🧸: {pet.fToy}</Text>
            {/* <Pressable style={({ pressed }) => [
                styles.btn, 
                pressed && styles.btn_pressed
              ]}
              android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}
              
              onPress={() => router.push("/(app)/(pets)/booking")}>
              <Text style={styles.btn_text}>Booking Kunjungan</Text>
            </Pressable> */}
          </View>
      </View>
    </Pressable>
  );
}



// const DATA:Pet[] = [];

export default function PetScreen() {
const { getToken } = useContext(AuthContext);

  const [pets, setPets] = useState<Pet[]>([]); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state

  const loadPets = async () => {
    try {
      const data = await ApiService.fetchPets(getToken());
      // console.log(data);
      setPets(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);  

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.fl_container}>
          <FlatList
          horizontal
            data={pets}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <PetItem pet={item} />}
          />

          {/* Floating Action Button (FAB) */}
          <TouchableOpacity style={styles.fab} onPress={() => alert("Button Pressed!")}>
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  btn:{
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorTemplate[1],
    borderRadius: 5,
    paddingHorizontal: 'auto',
    paddingVertical:'auto',
    height:40,
    width:200
  },
  btn_text:{
    color: 'white',
    fontSize: 18,
  },
  btn_pressed: {
    backgroundColor: colorTemplate[2],
  },
  fl_container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  fl_item: {
    backgroundColor: '#f9c2ff',
    height: (Dimensions.get('window').width - 40)+150,
    width: Dimensions.get('window').width - 40,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  fl_name: {
    fontSize: fSize.h2,
    fontWeight:'bold',
  },
  fl_age: {
    fontSize: fSize.h4,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  fl_image:{
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width:Dimensions.get('window').width - 40,
    margin:0, 
    padding:0,
    height: Dimensions.get('window').width - 40, 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20, // Adjust distance from bottom
    right: 20, // Adjust distance from right
    backgroundColor: colorTemplate[2], // Blue color (you can change this)
    width: 60, // Size of button
    height: 60,
    borderRadius: 30, // Make it circular
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
});