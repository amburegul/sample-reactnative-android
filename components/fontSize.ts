import { StyleSheet, Alert, Text, View,Image } from 'react-native';
import {colorTemplate} from '@/components/colors';

export const fSize = {
    h1:35,
    h2:28,
    h3:22,
    h4:18,
    h5:15
};


export const fontSizeStyle = StyleSheet.create({
    fontH1: {
        fontSize:fSize.h3,
        color:colorTemplate[3]
    }
})