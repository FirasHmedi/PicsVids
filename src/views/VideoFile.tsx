import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Video from 'react-native-video';

const VideoFile = ({ uri }: any) => {
    return (
        <View style={styles.container} >
            <Video 
                source={{uri}}
                resizeMode={"cover"}
                style={styles.video}
                controls
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    video: {
        aspectRatio: 1,
        width: "80%"
    }
});

export default VideoFile;