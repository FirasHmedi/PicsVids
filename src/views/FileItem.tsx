import React from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { Colors } from '../constants/colors';
import { getFileType } from '../utils';

const FileItem = ({item, onPressItem}: any) => {

    const uri = item.uri;
    const isVideo = getFileType(uri) === "video";
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPressItem} >
        {
            isVideo ?
            <Video 
                source={{uri}}
                poster={Image.resolveAssetSource(require('../assets/images/video.png')).uri}
                style={styles.video}
                paused
            />
            :
            <Image 
                source={{uri: item.uri}}
                style={styles.image}
                resizeMode={'cover'}
            />
        }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: Dimensions.get('window').width - 40
    },
    video: {
        height: 200,
        width: Dimensions.get('window').width - 40,
        backgroundColor: Colors.white
    }
});

export default FileItem;