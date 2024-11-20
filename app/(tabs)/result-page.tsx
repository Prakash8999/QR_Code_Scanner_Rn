import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import React, { useCallback } from 'react';
import GoBackIcon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';
import { QrSvg } from '@/assets/images/SvgImage';
import useQRStore from '@/hooks/ZSDataStore';
import { QRCodeDetails } from '@/helpers/RefractorQrData';
import OpenLink from 'react-native-vector-icons/FontAwesome'
const ResultPage = () => {
	const getQrData = useQRStore.getState().qrData;
	const data: QRCodeDetails = JSON.parse(getQrData?.code!);



	type OpenURLButtonProps = {
		url: string;
		// children: string;
	};

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

		return <TouchableOpacity onPress={handlePress} >
			<OpenLink name='external-link' size={25} color={'white'} />
		</TouchableOpacity>;
	}


	const renderData = () => {
		if (data.type === 'WiFi') {
			const { ssid, securityType, password, hidden } = data.details;
			return (
				<>
					<Text className="text-white text-base">SSID: {ssid}</Text>
					<Text className="text-white text-base">Security Type: {securityType}</Text>
					<Text className="text-white text-base">Password: {password}</Text>
					<Text className="text-white text-base">Hidden: {hidden ? 'Yes' : 'No'}</Text>
				</>
			);
		} else if (data.type === 'vCard') {
			const { name, fullName, mobile, homePhone, email, url } = data.details;
			return (
				<>
					<Text className="text-white text-base">Full Name: {fullName}</Text>
					<Text className="text-white text-base">Mobile: {mobile}</Text>
					<Text className="text-white text-base">Home Phone: {homePhone}</Text>
					<Text className="text-white text-base">Email: {email}</Text>
					<Text className="text-white text-base">URL: {url}</Text>
				</>
			);
		} else if (data.type === 'URL') {
			return <Text className="text-white text-base">URL: {data.details.url}</Text>;
		} else {
			return <Text className="text-white text-base">Data: {data.details.rawData}</Text>;
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
					<View className="flex gap-y-2">{renderData()}</View>
				</ScrollView>
			</View>
			<View >
				{data.type === 'URL' ? (
					<OpenURLButton url={data.details.url} />
				) : null}
			</View>
		</View>
	);
};

export default ResultPage;
