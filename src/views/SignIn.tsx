import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Colors } from '../constants/colors';

const SignIn = ({navigation}: any) => {

    // Check if user already connected in the past
    useEffect(() => {
        async function checkAuth() {
        try {
            const auth = await AsyncStorage.getItem("auth");
            if(auth === "true"){
                navigation.navigate('FileList');
            }
        } catch (err) {}
        }
        checkAuth();
    }, []);

    const onSignIn = async () => {
        await AsyncStorage.setItem('auth', 'true');
        navigation.navigate('FileList');
    }

    const CustomizedTextInput = ({label}: {label: string}) => {
        return(
            <TextInput 
                style={styles.inputText} 
                placeholder={label}
                placeholderTextColor={Colors.primary}
            />
        )
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >
                PICS VIDS
            </Text>
            <CustomizedTextInput label={"User name"} />
            <CustomizedTextInput label={"Password"} />
            <TouchableOpacity
                style={styles.signInButton}
                onPress={onSignIn}
            >
                <Text style={styles.buttonText}>
                    SIGN IN
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: Colors.secondary
    },
    title: {
        fontSize: 40,
        color: Colors.primary,
        fontWeight: 'bold'
    },
    inputText: {
        borderColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 2,
        width: '80%',
        margin: 24,
        color: Colors.primary,
        padding: 8,
        paddingHorizontal: 20
    },
    signInButton: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 24
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default SignIn;