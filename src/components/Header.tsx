import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/Octicons';

export const Header = ({setShowEditedOnly}: {setShowEditedOnly?: any}) => {
    return(
        <View style={styles.header} >
            <Text style={styles.headerText}>
                PICS VIDS
            </Text>
            {
                setShowEditedOnly &&
                <TouchableOpacity onPress={() => setShowEditedOnly((showEditOnly) => !showEditOnly)} >
                    <Icon name='arrow-switch' size={25} color={Colors.secondary} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
