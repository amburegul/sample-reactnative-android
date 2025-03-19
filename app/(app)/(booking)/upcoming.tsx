import { RefreshControl,FlatList, View, Text, TouchableOpacity, StyleSheet, StatusBar, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon from Expo
import { fSize } from "@/components/fontSize";
import { colorTemplate } from '@/components/colors';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Visit } from '@/components/objectCatalouge';
import React, { useEffect, useState,useCallback,useContext } from "react";
import { ApiService } from "@/components/apiAxios";
import { AuthContext } from "@/components/authContext";

type ItemProps = {visit: Visit};


export function VisitItem({visit}: ItemProps){
  return(
  <View style={styles.item}>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={styles.title}>{visit.petName}</Text>
      <Text style={{fontStyle:"italic"}}>{visit.visitDate}</Text>
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text>{visit.notes}</Text>
      {
        visit.status=="BOOKING"? <Ionicons name="checkmark-outline" size={30} color="blue" /> : (visit.status=="VISIT"?<Ionicons name="checkmark-done-outline" size={30} color="green" />:<Ionicons name="close-outline" size={30} color="red" />)
      }
      
    </View>
    
  </View>)
};


export default function BookingScreen() {
  const { getToken } = useContext(AuthContext);

  const [visits, setVisits] = useState<Visit[]>([]); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false);

  const loadVisits = async () => {
    try {
      const data = await ApiService.fetchVisits(getToken());
      console.log(data);
      setVisits(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisits();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadVisits();
    setRefreshing(false);
  }, []);


  return (
    <View style={{ flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
            data={visits}
            renderItem={({ item }) => <VisitItem visit={item} />}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
             />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
