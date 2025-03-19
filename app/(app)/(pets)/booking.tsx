import { View, Text, Pressable, StyleSheet, Button, Platform, TextInput,TouchableOpacity,ActivityIndicator } from "react-native";
import React, { useState,useContext } from 'react'
import { useRouter } from "expo-router";
import { Pet, petBooking } from '@/components/objectCatalouge';
import { fSize } from "@/components/fontSize";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons"; // Import icon from Expo
import { colorTemplate } from '@/components/colors';
import { useLocalSearchParams } from 'expo-router';
import { ApiService } from "@/components/apiAxios";
import {convertReadableDate, convertReadableTime24h} from "@/components/functions";
import { AuthContext } from "@/components/authContext";


export default function bookingScreen() {
    const [datePicked, setDate] = useState(new Date());
    const [timePicked, setTime] = useState(new Date());

    const { petObj } = useLocalSearchParams();
    const pet: Pet = typeof petObj === "string" ? JSON.parse(JSON.parse(petObj)) : null;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [inputNotes, setText] = useState("");
    const { getToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const submitBooking = async (bookingObj: petBooking) => {
        // const router = useRouter();
        const response = await ApiService.submitBooking(getToken(), bookingObj);
        console.log(response);
        if(response?.status == 201){
            // console.log('sukses');
            setIsLoading(false);
            alert('Berhasil reservasi kunjungan.');
            // router.back();
        }
        else
            alert('Gagal, coba lagi atau harap hubungi admin.');
        return false;
    };


    return (
        <View style={styles.container}>
            {isLoading && (
                <ActivityIndicator size="large" color="#00ff00" style={{position:"absolute", left:0, right:0, bottom:0, top:0,backgroundColor:colorTemplate[2],opacity:0.4,zIndex:9999 }} />
            )}
            <Image
                style={styles.pet_img}
                source={{ uri: ApiService.BASE_URL + pet.photos }}
            />
            <View style={{ padding: 10, alignItems: 'center' }}>
                <Text style={styles.pet_name}>{pet.name}</Text>
                <Text style={styles.pet_age}>{pet.age}</Text>
            </View>

            
                
            <View style={{ width: "100%", height:150,justifyContent:'flex-start'}}>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textarea}
                        multiline={true} // Enables multiple lines
                        numberOfLines={4} // Initial height (optional)
                        placeholder="Booking Notes..."
                        value={inputNotes}
                        onChangeText={setText}
                    />
                </View>
                <DatePickerWidget 
                    datePicked={selectedDate} 
                    setDate={setSelectedDate} 
                    timePicked={timePicked}
                    setTime={setTime} />
            </View>
            {/* Floating Action Button (FAB) */}
            <TouchableOpacity style={styles.fab} onPress={() =>{ 
                if(datePicked && timePicked && inputNotes){
                    setIsLoading(true);
                    submitBooking({
                        idPet:pet.id?.toString(),
                        notes:inputNotes,
                        bookingDate:convertReadableDate(selectedDate),
                        bookingTime:convertReadableTime24h(timePicked)
                    });
                    router.replace("/(app)/(pets)"); // Directly reset stack to pet index

                    setTimeout(() => {
                        router.replace("/(app)/(booking)"); // Then replace with booking
                    }, 200);
                }
                else
                    alert('lengkapi form dulu ya...');
                }}>
                <Ionicons name="send" size={27} color="blue" />
            </TouchableOpacity>
        </View>
    );
}


export function DatePickerWidget({ datePicked, setDate, timePicked, setTime }: 
    { datePicked: Date, setDate: (date: Date) => void, timePicked: Date, setTime: (time: Date) => void }) {
    
    const [dateShow, setdateShow] = useState(false);
    const onChangeDate = (event: any,selectedDate?: Date) => {
        setdateShow(Platform.OS === "ios"); // Keep open for iOS
        if (selectedDate) {
            setDate(selectedDate);
            // if (onDateSelected) onDateSelected(selectedDate); // Callback function
        }
    };

    
    const [timeShow, setTimeShow] = useState(false);
    const onChangeTime = (event: any, selectedTime?: Date) => {
        setTimeShow(false); // Hide picker
        if (selectedTime) {
          setTime(selectedTime);
        }
      };
    

    return (
        <View style={{flexDirection: "row",justifyContent: "flex-start",width: "100%"}}>
            <View style={{marginRight:20}}>
                <Button title={"Date: "+convertReadableDate(datePicked)} onPress={() => setdateShow(true)} color="#881E76FF"/>
                {dateShow && (
                    <DateTimePicker value={datePicked} mode="date" display="default" onChange={onChangeDate} />
                )}
            </View>
            <View>
                <Button title={"Time: "+ convertReadableTime24h(timePicked)} onPress={() => setTimeShow(true)} color="#ff5c5c"/>
                {timeShow && (
                    <DateTimePicker value={timePicked} mode="time" display="default" onChange={onChangeTime} is24Hour={true}/>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10
    },
    button: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5, marginBottom: 10 },
    closeButton: { backgroundColor: "#FF0000" },
    buttonText: { color: "#fff", fontSize: 16 },
    pet_img: {
        borderRadius: 10,
        margin: 0,
        width: 200,
        height: 200,
    },
    pet_name: {
        fontSize: fSize.h2,
        fontWeight: 'bold',
    },
    pet_age: {
        fontSize: fSize.h4,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    textContainer: {
    flex: 1,
    },
    textarea: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        textAlignVertical: "top", // Ensures text starts from the top
        height:100
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
