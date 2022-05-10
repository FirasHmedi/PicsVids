import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Colors } from '../constants/colors';

export const ColorsPalette = ({setColor}: any) => {

    const onPress = (color: string) => setColor(color);

    return(
        <View style={styles.container} >
            <TouchableOpacity onPress={() => onPress('red')} style={{...styles.colorCircle, backgroundColor: 'red'}} />
            <TouchableOpacity onPress={() => onPress('black')} style={{...styles.colorCircle, backgroundColor: 'black'}} />
            <TouchableOpacity onPress={() => onPress('white')} style={{...styles.colorCircle, backgroundColor: 'white'}} />
            <TouchableOpacity onPress={() => onPress('blue')} style={{...styles.colorCircle, backgroundColor: 'blue'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 250,
        paddingHorizontal: 16
    },
    colorCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: Colors.primary,
        borderWidth: 3
    },
});