import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import { Colors } from '../constants/colors';
import FileItemView from './FileItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../components/Header';
import { useIsFocused } from '@react-navigation/native';
import AddFileButton from '../components/AddFileButton';

const FileList = ({navigation}: any) => {

    const [files, setFiles] = useState<any>([]);
    const [showEditedOnly, setShowEditedOnly] = useState(false);
    const focus = useIsFocused();

    // fetch uri of files from async storage and update the state
    const fetchFiles = async () => {
        try {
            const jsonArray = await AsyncStorage.getItem('files');
            if (jsonArray !== null) {
                const files = (JSON.parse(jsonArray) ?? []).map((file: string) => ({uri: file}));
                if(showEditedOnly){
                    setFiles(files.filter(({uri}) => uri.includes('edited')));
                }else{
                    setFiles(files);
                }
            }
        } catch (err) {}
    }
    useEffect(() => {
        fetchFiles();
    }, [focus, showEditedOnly]);

    const navigateToFileScreen = (uri: string) => navigation.navigate('File', {uri});


	return (
		<View style={styles.container}>
            <Header setShowEditedOnly={setShowEditedOnly} />
			<FlatList
				data={files}
				renderItem={({item})=> 
                    <FileItemView 
                        item={item} 
                        onPressItem={() => navigateToFileScreen(item.uri)} 
                    />
                }
				keyExtractor={(_, index) => index.toString()}
				contentContainerStyle={styles.flatList}
			/>
            <AddFileButton
                setFiles={setFiles}
            />
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary
    },
    flatList: {
        paddingVertical: '4%',
        alignItems: 'center'
    },
});

export default FileList;