import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useQRStore } from '@/hooks/ZSDataStore';
import { QRCodeDetails } from '@/helpers/RefractorQrData';
import { Link } from 'expo-router';
import GoBackIcon from 'react-native-vector-icons/Ionicons';
import { QrSvg } from '@/assets/images/SvgImage';
const GenerateResultPage = () => {
	const getQrData = useQRStore.getState().qrData;
	const data : QRCodeDetails = JSON.parse(getQrData?.code!);

	const [dataText, setDataText] = useState('')
	console.log("object ", data);




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
				<Text className="text-white text-base" selectable={true}>Url: {data.details.url}</Text>
			);
		}
		else if (data.type === 'text') {
			return forCopy ? `Text: ${data.details.text}` : (

				<Text className='text-white text-base' selectable={true}>
					Text:{data.details.text}
				</Text>

			)
		}

		else {
			return forCopy ? `Data: ${data.details.data}` : (
				<Text className="text-white text-base" selectable={true}>{data.details.data}</Text>
			);
		}
	};


	return (
		<View className='bg-[rgb(51,51,51)]/[0.85] 	 h-full w-full '>
			<View className="flex flex-row items-center gap-x-6 top-8 left-10">
				<Link href={'/(tabs)/generate-page'} className="p-1.5 bg-[#333333] rounded-lg">
					<GoBackIcon name="chevron-back" size={30} color={'white'} />
				</Link>
				<Text className="text-white text-2xl font-PoppinsMedium tracking-wider">QR Code</Text>
			</View>

			<View className="w-[80%] min-h-[25%] h-fit max-h-[60%] overflow-hidden bg-[#333333] mx-auto top-16 rounded-lg elevation-2xl p-6 flex gap-y-5">
				<View className="flex flex-row gap-x-6">
					<QrSvg width="45" height="45" />
					<View>
						<Text className="font-PoppinsRegular text-xl text-white">Data</Text>
						<Text className="font-PoppinsThin text-sm text-white">{data.timestamp}</Text>
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

		</View>
	)
}

export default GenerateResultPage