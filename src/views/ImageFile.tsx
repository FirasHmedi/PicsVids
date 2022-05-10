import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    ToastAndroid
} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import { ColorsPalette } from '../components/ColorsPalettte';
import { FloatButton } from '../components/FloatButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { getDestinationPath } from '../utils';

const File = ({ isEdit, uri, setIsEdit }: any) => {

    const [chosenColor, setChoseColor] = useState('white');
    const canvas = useRef<SketchCanvas>();

    const saveInAsyncStorage = async (path: string) => {
        const jsonArray = await AsyncStorage.getItem('files');
        const _filesArray = [...JSON.parse(jsonArray ?? '[]'), 'file://'+path];
        await AsyncStorage.setItem('files', JSON.stringify(_filesArray));
    }

    const onSave = async () => {
        try{
            const name = 'editedPic'+ String(Math.ceil(Math.random() * 100000000));
            //save in the device storage
            canvas.current?.save('jpg', false, '', name, true, true, true);
            //move picture to our folder location
            await new Promise((resolve) => setTimeout(() => resolve(true), 500))
            const destPath = getDestinationPath(name+'.jpg');
            await RNFS.moveFile(RNFS.PicturesDirectoryPath+'/'+name+'.jpg', destPath);
            //save path of file in async storage
            saveInAsyncStorage(destPath);
            ToastAndroid.show('Image saved successfully', ToastAndroid.LONG);
            setIsEdit(false);
        }
        catch(err){}
    }

    const onCancel = () => setIsEdit(false);

    if(isEdit){
        return(
            <View style={styles.container}>
                <ColorsPalette setColor={setChoseColor} />
                <View style={styles.imageContainer} >
                    <SketchCanvas
                        ref={canvas}
                        style={styles.image}
                        strokeColor={chosenColor}
                        strokeWidth={4}
                        localSourceImage={{
                            filename: uri.replace('file://', ''),
                            mode: 'AspectFit'
                        }}
                    />
                </View>
                <FloatButton iconName='close' onPress={onCancel} styleProps={{left: 15}} />                    
                <FloatButton iconName='save' onPress={onSave} />
            </View>
        )
    }
    else{
        return(
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri}}
                    style={styles.image}
                    resizeMode={'contain'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '80%',
    },
});

export default File;