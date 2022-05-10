import React from 'react';
import {
  PermissionsAndroid,
} from 'react-native';
import DocumentPicker  from 'react-native-document-picker'
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FloatButton } from '../components/FloatButton';
import { getDestinationPath } from '../utils';

const AddFileButton = ({setFiles}: any) => {

    // store uri of file in asyncStorage array and update state
    const storeFile = async (fileUri: string) => {
        const jsonArray = await AsyncStorage.getItem('files');
        const _filesArray = [...JSON.parse(jsonArray ?? '[]'), 'file://'+fileUri];
        setFiles(_filesArray.map((file) => ({uri: file})));
        await AsyncStorage.setItem('files', JSON.stringify(_filesArray));
    }

    const onAdd = async () => {
        try { 
            // get write permission for files
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if(granted !== "granted") return;
            // get selected file and then copy it to our app folder
            const fileSelected = await DocumentPicker.pickSingle({type: DocumentPicker.types.allFiles}); 
            const destPath = getDestinationPath(fileSelected.name);
            await RNFS.copyFile(fileSelected.uri, destPath);
            // store uri of file and update state
            storeFile(destPath);
        }
        catch(err) {}
    }

	return (
        <FloatButton 
            iconName={'plus'}
            onPress={onAdd}
        />
	)
}

export default AddFileButton;