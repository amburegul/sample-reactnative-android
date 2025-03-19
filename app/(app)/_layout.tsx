import { Drawer } from 'expo-router/drawer';
import { colorTemplate } from '@/components/colors';
import { useFonts } from "expo-font";
import { Pressable, Text, } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Redirect } from 'expo-router';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "FiraSans-Black": require("../../assets/fonts/FiraSans-Black.ttf"),
  });


  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>; // Show loading state
  }

  return (
    <Drawer screenOptions={{
      headerTitleStyle: {
        fontWeight: "bold", // Ubah ketebalan teks header
        // fontSize: 20, // Bisa juga ubah ukuran font
      },
      headerStyle: { backgroundColor: colorTemplate[2] }, // Ubah warna latar belakang header
      headerTintColor: "white", // Ubah warna teks header
      drawerStyle: {
        backgroundColor: colorTemplate[2],  // Dark theme background
        width: 350,                  // Set drawer width
      },
      drawerContentStyle: {
        paddingTop: 10,  // Adds spacing at the top
      },
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      drawerItemStyle: {
        marginVertical: 5,  // Adds spacing between items
        borderRadius: 10,   // Round item edges
        padding: 10,        // Increase item padding
      },
      drawerActiveTintColor: "black",   // Active item text color
      drawerInactiveTintColor: "white", // Inactive item text color
      drawerActiveBackgroundColor: colorTemplate[2], // Active item background
    }}>
      <Drawer.Screen name="index" options={{ title: "Home",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ), }} />
      <Drawer.Screen name="(pets)" options={{ drawerLabel: "Pets Data", headerTitle:"Pets Data",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="paw" size={size} color={color} />
          ), }}  />
      <Drawer.Screen name="(booking)" options={{ drawerLabel: "Kunjungan", headerTitle:"Kunjungan",
          drawerIcon: ({ color, size }) => (
              <FontAwesome name="book" size={size} color={color} />
            ),
          }}  />
    </Drawer>
  );
}


