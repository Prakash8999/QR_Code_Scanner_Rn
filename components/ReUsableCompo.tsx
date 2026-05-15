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


export const OpenURLButton = ({ url, text, iconName }: OpenURLButtonProps) => {
	const handlePress = useCallback(async () => {
		let finalUrl = url;

		// Add protocol if missing for web URLs (identified by external-link icon or starting with www.)
		if (!/^([a-z0-9+.-]+):/i.test(url)) {
			finalUrl = `https://${url}`;
		}

		// Checking if the link is supported
		try {
			const supported = await Linking.canOpenURL(finalUrl);
			console.log("URL:", finalUrl, "Supported:", supported);

			if (supported) {
				await Linking.openURL(finalUrl);
			} else {
				// On some devices/OS versions canOpenURL returns false even for valid URLs.
				// We attempt to open it anyway as a fallback.
				await Linking.openURL(finalUrl);
			}
		} catch (error) {
			console.log("error while opening url", error);
			Alert.alert(`Don't know how to open this URL: ${finalUrl}`);
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
