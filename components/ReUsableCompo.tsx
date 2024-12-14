import { useCallback } from "react";
import { Alert, Linking, TouchableOpacity,Text, ToastAndroid, Share } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Mail from 'react-native-vector-icons/Octicons'
import * as Clipboard from 'expo-clipboard';

type OpenURLButtonProps = {
	url: string;
	text:string;
	iconName:string
	// children: string;
};
// const isFocused = useIsFocused();


export const OpenURLButton = ({ url , text, iconName}: OpenURLButtonProps) => {
	const handlePress = useCallback(async () => {
		// Checking if the link is supported for links with custom URL scheme.
		const supported = await Linking.canOpenURL(url);
console.log("supported ", supported);
		if (supported) {
			// Opening the link with some app, if the URL scheme is "http" the web link should be opened
			// by some browser in the mobile
			await Linking.openURL(url);
		} else {
			console.log("error while opening url");
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
	}, [url]);

	return <TouchableOpacity onPress={handlePress} className='flex flex-col justify-center items-center'>
{
	iconName === 'Email' ? <Mail name='mail' size={30} color={'white'} /> : <FontAwesome name={iconName} size={30} color={'white'} />
}

		
		<Text className='text-white font-PoppinsRegular'>
			{text}
		</Text>
	</TouchableOpacity>;
}


export 	const copyToClipboard = (text: string) => {
	Clipboard.setStringAsync(text);
	ToastAndroid.showWithGravity(
		'Text Copied Successfully`',
		100, // Duration (e.g., SHORT, LONG)
		ToastAndroid.TOP // Position (TOP, CENTER, or BOTTOM)
	);
};

export 	const shareText = async (text: string) => {
	try {
		await Share.share({ message: text });
	} catch (err) {
		console.log(err);
	}
}
