import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert, ToastAndroid, Share } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GoBackIcon from 'react-native-vector-icons/Ionicons';
import { Link, Navigator, useNavigation } from 'expo-router';
import { QrSvg } from '@/assets/images/SvgImage';
import useQRStore from '@/hooks/ZSDataStore';
import { QRCodeDetails } from '@/helpers/RefractorQrData';
import * as Clipboard from 'expo-clipboard';
import Copy from 'react-native-vector-icons/MaterialIcons'
import OpenLink from 'react-native-vector-icons/FontAwesome'
import ShareData from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveQRCodeWithId } from '@/hooks/SaveDataLocally';
import { useNavigationState } from '@react-navigation/native';


const ResultPage = () => {
	const getQrData = useQRStore.getState().qrData;

	const data: QRCodeDetails = JSON.parse(getQrData?.code!);
	const [dataText, setDataText] = useState('')

	type OpenURLButtonProps = {
		url: string;
		// children: string;
	};

	const saveData = async () => {

		await saveQRCodeWithId(data);
	}
	const navigation = useNavigation()
	const state = useNavigationState((state) => state);
	// const prevRoute =state.history?.[state.index - 2] || "None"; // Get the previous route
	// console.log("state.history ", state.routeNames)
	// console.log("pr" , prevRoute)  
	// const prevRouteRef = useRef<string | null>(null);

	const routes = navigation.getState()?.routes;
const prevRoute = routes[routes.length - 4].name;
const currentRoute = routes[routes.length - 1].name;
console.log("prrr", currentRoute)
if (prevRoute === "scanner-page" && currentRoute === "result-page") {
	saveData()
}
	
	const OpenURLButton = ({ url }: OpenURLButtonProps) => {
		const handlePress = useCallback(async () => {
			// Checking if the link is supported for links with custom URL scheme.
			const supported = await Linking.canOpenURL(url);

			if (supported) {
				// Opening the link with some app, if the URL scheme is "http" the web link should be opened
				// by some browser in the mobile
				await Linking.openURL(url);
			} else {
				Alert.alert(`Don't know how to open this URL: ${url}`);
			}
		}, [url]);

		return <TouchableOpacity onPress={handlePress} className='flex flex-col justify-center items-center'>
			<OpenLink name='external-link' size={30} color={'white'} />
			<Text className='text-white font-PoppinsRegular'>
				Open Url
			</Text>
		</TouchableOpacity>;
	}



	const copyToClipboard = (text: string) => {
		Clipboard.setStringAsync(text);
		ToastAndroid.showWithGravity(
			'All Your Base Are Belong To Us',
			100, // Duration (e.g., SHORT, LONG)
			ToastAndroid.TOP // Position (TOP, CENTER, or BOTTOM)
		);
	};

	const shareText = async (text: string) => {
		try {
			await Share.share({ message: text });
		} catch (err) {
			console.log(err);
		}
	}
	const renderData = (forCopy = false): string | JSX.Element => {
		if (data.type === 'WiFi') {
			const { ssid, securityType, password, hidden } = data.details;
			return forCopy
				? `SSID: ${ssid}\nSecurity Type: ${securityType}\nPassword: ${password}\nHidden: ${hidden ? 'Yes' : 'No'}`
				: (
					<>
						<Text className="text-white text-base">SSID: {ssid + '\n'}</Text>
						<Text className="text-white text-base">Security Type: {securityType + '\n'}</Text>
						<Text className="text-white text-base">Password: {password + '\n'}</Text>
						<Text className="text-white text-base">Hidden: {hidden ? 'Yes' : 'No'}</Text>
					</>
				);
		} else if (data.type === 'vCard') {
			const { fullName, mobile, homePhone, email, url } = data.details;
			return forCopy
				? `Full Name: ${fullName}\nMobile: ${mobile}\nHome Phone: ${homePhone}\nEmail: ${email}\nURL: ${url}`
				: (
					<>
						<Text className="text-white text-base" selectable={true}>Full Name: {fullName + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Mobile: {mobile + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Home Phone: {homePhone + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Email: {email + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>URL: {url + '\n'}</Text>
					</>
				);
		} else if (data.type === 'URL') {
			return forCopy ? `URL: ${data.details.url}` : (
				<Text className="text-white text-base" selectable={true}>URL: {data.details.url}</Text>
			);
		} else {
			return forCopy ? `Data: ${data.details.data}` : (
				<Text className="text-white text-base" selectable={true}>{data.details.data}</Text>
			);
		}
	};



	return (
		<View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full ">
			<View className="flex flex-row items-center gap-x-6 top-8 left-10">
				<Link href={'/(tabs)/scanner-page'} className="p-1.5 bg-[#333333] rounded-lg">
					<GoBackIcon name="chevron-back" size={30} color={'white'} />
				</Link>
				<Text className="text-white text-2xl font-PoppinsMedium tracking-wider">Result</Text>
			</View>

			<View className="w-[80%] min-h-[25%] h-fit max-h-[60%] overflow-hidden bg-[#333333] mx-auto top-16 rounded-lg elevation-2xl p-6 flex gap-y-5">
				<View className="flex flex-row gap-x-6">
					<QrSvg width="45" height="45" />
					<View>
						<Text className="font-PoppinsRegular text-xl text-white">Data</Text>
						<Text className="font-PoppinsThin text-sm text-white">{getQrData?.timestamp}</Text>
					</View>
				</View>
				<View
					style={{
						borderBottomColor: 'white',
						opacity: 50,
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				<ScrollView>
					<View className="flex gap-y-2 ">
						<Text selectable={true}>

							{renderData()}
						</Text>

					</View>
				</ScrollView>
			</View>
			<View className='top-20 p-6 w-[80%]  h-fit  mx-auto flex flex-row justify-between'>
				{data.type === 'URL' ? (

					<OpenURLButton url={data.details.url} />
				) : null}

				<TouchableOpacity onPress={() => copyToClipboard(renderData(true) as string)} className='  text-center flex items-center'>
					<Copy name='content-copy' color={'white'} size={30} className='text-center ' />
					<Text className='text-center text-white font-PoppinsRegular'>
						Copy
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => shareText(renderData(true) as string)}>
					<ShareData name='share' color={'white'} size={30} className='text-center' />
					<Text className='text-center text-white font-PoppinsRegular'>
						Share
					</Text>
				</TouchableOpacity>



			</View>
		</View>
	);
};

export default ResultPage;
