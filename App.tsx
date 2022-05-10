import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FileList from './src/views/FileList';
import SignIn from './src/views/SignIn';
import File from './src/views/FIle';
import RNFS from 'react-native-fs';

const Stack = createNativeStackNavigator();

const App = () => {

	// Create files foler if it doesn't exist
	useEffect(() => {
		async function createFilesFolder() {
			try {
				await RNFS.mkdir(`${RNFS.ExternalStorageDirectoryPath}/editPicsVids`);
			} catch (err) {}
		}
		createFilesFolder();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={"SignIn"}>
				<Stack.Screen
					name="SignIn"
					component={SignIn}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="FileList"
					component={FileList}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="File"
					component={File}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
