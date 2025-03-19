import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon from Expo
import { colorTemplate } from '@/components/colors';
import { fSize } from "@/components/fontSize";
import { Pet, Visit } from "@/components/objectCatalouge";
import { useLocalSearchParams } from 'expo-router';
import { ApiService } from "@/components/apiAxios";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "@/components/authContext";
import { useRouter } from "expo-router";



export default function UpcomingScreen() {
    const router = useRouter();
    const { pet } = useLocalSearchParams();
    const petObj: Pet = typeof pet === "string" ? JSON.parse(pet) : null;
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {/* KUNJUNGAN */}
                <ExpandableFlatList />
            </View>
        </View>
    );
}

const ExpandableFlatList = () => {
    type ItemProps = { visit: Visit };
    const { pet } = useLocalSearchParams();
    const petObj: Pet = typeof pet === "string" ? JSON.parse(pet) : null;

    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { getToken } = useContext(AuthContext);
    const [visits, setVisits] = useState<Visit[]>([]); // Store fetched data
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        loadVisits();
    }, []);

    const loadVisits = async () => {
        try {
            const data = await ApiService.fetchVisitHistory(getToken());
            setVisits(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };


    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id); // Toggle expand/collapse
    };

    const renderItem = ({ item }: { item: Visit }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(item.id.toString())} >
                <Text style={styles.title}>{item.visitDate} ({item.petName}) <FontAwesome name="angle-double-down" size={fSize.h5} /></Text>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />

            {expandedId === item.id.toString() && (
                <View style={{backgroundColor:colorTemplate[3], padding:5, borderRadius:10}}>
                    {/* <Text style={styles.details}>{item.id.toString()}</Text> */}
                    {/* <Text style={{fontWeight:'bold'}}>{item.notes}</Text> */}
                    <Text style={{ fontSize: fSize.h5, fontWeight: 'bold', fontStyle: 'italic' }}>TOTAL PEMBELIAN PRODUK</Text>
                    <Text style={{ marginLeft: 10 }}>{item.totalProduct?'Rp.'+item.totalProduct.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):'-'}</Text>
                    <Text style={{ fontSize: fSize.h5, fontWeight: 'bold', fontStyle: 'italic' }}>TOTAL PEMBAYARAN LAYANAN</Text>
                    <Text style={{ marginLeft: 10 }}>{item.totalService?'Rp.'+item.totalService.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):'-'}</Text>

                    <Text style={{ fontSize: fSize.h5, fontWeight: 'bold', fontStyle: 'italic' }}>DIAGNOSIS KUNJUNGAN</Text>
                    {item.diagnosis.map((diagItem) => {
                        let i = 0;
                        return (
                            <View  key={i++} >
                                <Text style={{ marginLeft: 10 }}>* {diagItem.diagnose}</Text>
                                <Text style={{ marginLeft: 30, fontStyle:"italic" }}>Berat : {diagItem.weight}g; Panjang : {diagItem.length}Cm;</Text>
                            </View>
                        );
                    })}
                    {/* <View style={{ borderBottomWidth: 1, marginVertical: 10 }} /> */}

                </View>
            )}
        </View>
    );


    return loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (
        <FlatList
            data={visits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={styles.frame}
        />
    );
};


const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        marginVertical: -1,

    },
    item: {
        color: 'black',
    },
    title: {
        color: "black",
        fontSize: fSize.h5,
    },
    details: {

    },
    frame: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        paddingVertical: 15
        // paddingTop:15,
    },
    h1: {
        fontSize: fSize.h1,
        color: colorTemplate[2],
        textAlign: 'center',
    },
    avatar_image: {
        borderRadius: 150,
        width: 180,
        height: 180,
        margin: 0,
        padding: 0,
        borderWidth: 2,
        marginVertical: 10,
        borderColor: colorTemplate[2],
        textAlign: "center",
        marginHorizontal: 'auto',
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'flex-start',
        backgroundColor: colorTemplate[3]
    },
    fl_item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        height: 180,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    fl_name: {
        fontSize: fSize.h2,
        fontWeight: 'bold',
    },
    fl_age: {
        fontSize: fSize.h4,
        fontWeight: 'bold',
        fontStyle: 'italic'
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
