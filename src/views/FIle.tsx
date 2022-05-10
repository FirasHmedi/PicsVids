import React, { useState } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { FloatButton } from '../components/FloatButton';
import { Header } from '../components/Header';
import { Colors } from '../constants/colors';
import { getFileType } from '../utils';
import ImageFile from './ImageFile';
import VideoFile from './VideoFile';

const File = ({ route }: any) => {
    
    const [isEdit, setIsEdit] = useState(false)
    const [uri] = useState<string>(route.params.uri);
    const isFileVideo = getFileType(uri) === "video";

    const onEdit = () => setIsEdit(true);
    
    return (
        <View style={styles.container} >
            <Header />
            {
                isFileVideo ?
                <VideoFile isEdit={isEdit} uri={uri} />
                :
                <ImageFile isEdit={isEdit} uri={uri} setIsEdit={setIsEdit} />
            }
            {
                !isEdit && !isFileVideo &&
                <FloatButton iconName='edit' onPress={onEdit} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary
    }
});

export default File;