import RNFS from 'react-native-fs';

// we only check for mp4 for video
export const getFileType = (uri: string) => {
    return uri.includes('.mp4') ? 'video' : 'image'; 
}

export const getDestinationPath = (name: string) => `${RNFS.ExternalStorageDirectoryPath}/editPicsVids/${name}`;