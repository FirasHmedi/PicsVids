import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../constants/colors';

export const FloatButton = ({iconName, styleProps, onPress}: {iconName: string, onPress: () => void, styleProps?: any}) => {
    return(
        <TouchableOpacity style={{...styles.floatButton, ...styleProps}} onPress={onPress} >
            <Icon name={iconName} size={25} color={Colors.secondary} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatButton: {
        width: 50,  
        height: 50,   
        borderRadius: 25,            
        backgroundColor: Colors.primary,                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 15, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});
