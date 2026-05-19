import { View, Text, TouchableOpacity, Pressable, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {useQRStore} from '@/hooks/ZSDataStore'
import { clearAsyncStorage, deleteQRCode, getQRCodeHistory } from '@/hooks/SaveDataLocally'
import { QRCodeDetails } from '@/helpers/RefractorQrData'
import { useIsFocused } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, useFocusEffect } from 'expo-router'
import DeleteIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { QrSvg } from '@/assets/images/SvgImage'

const formatDetails = (item: QRCodeDetails) => {
	const { type, details } = item;
	if (!details) return '';
	
	if (type === 'WiFi') {
		return `SSID: ${details.ssid}\nSecurity Type: ${details.securityType}\nPassword: ${details.password}\nHidden: ${details.hidden ? 'Yes' : 'No'}`;
	} else if (type === 'vCard') {
		const parts = [];
		if (details.fullName) parts.push(`Full Name: ${details.fullName}`);
		if (details.mobile) parts.push(`Mobile: ${details.mobile}`);
		if (details.homePhone) parts.push(`Home Phone: ${details.homePhone}`);
		if (details.email) parts.push(`Email: ${details.email}`);
		if (details.company) parts.push(`Company: ${details.company}`);
		if (details.job) parts.push(`Job: ${details.job}`);
		if (details.city) parts.push(`City: ${details.city}`);
		if (details.address) parts.push(`Address: ${details.address}`);
		if (details.url) parts.push(`URL: ${details.url}`);
		return parts.join('\n');
	} else if (type === 'Url' || type === 'URL') {
		return `URL: ${details.url}`;
	} else if (type === 'geo') {
		const parts = [];
		parts.push(`Latitude: ${details.latitude}`);
		parts.push(`Longitude: ${details.longitude}`);
		if (details.query) parts.push(`Query: ${details.query}`);
		return parts.join('\n');
	} else if (type === 'Text' || type === 'text') {
		return `Text: ${details.text}`;
	} else if (type === 'Telephone') {
		return `Telephone: ${details.telephone?.tel || details.telephone}`;
	} else if (type === 'Whatsapp') {
		return `WhatsApp: ${details.whatsapp}`;
	} else if (type === 'Email') {
		return `Email: ${details.email}`;
	} else if (type === 'Event') {
		const parts = [];
		if (details.eventName) parts.push(`Event Name: ${details.eventName}`);
		if (details.startDateTime) parts.push(`Start Date & Time: ${details.startDateTime}`);
		if (details.endDateTime) parts.push(`End Date & Time: ${details.endDateTime}`);
		if (details.eventLocation) parts.push(`Event Location: ${details.eventLocation}`);
		if (details.description) parts.push(`Description: ${details.description}`);
		return parts.join('\n');
	} else if (type === 'bCard') {
		const parts = [];
		if (details.companyName) parts.push(`Company Name: ${details.companyName}`);
		if (details.industry) parts.push(`Industry: ${details.industry}`);
		if (details.phone) parts.push(`Phone No: ${details.phone}`);
		if (details.email) parts.push(`Email: ${details.email}`);
		if (details.website) parts.push(`Website: ${details.website}`);
		if (details.address) parts.push(`Address: ${details.address}`);
		if (details.city) parts.push(`City: ${details.city}`);
		if (details.country) parts.push(`Country: ${details.country}`);
		return parts.join('\n');
	} else if (type === 'Twitter') {
		return `Twitter: ${details.twitter}`;
	} else if (type === 'Instagram') {
		return `Instagram: ${details.instagram}`;
	} else {
		if (details.data) return `Data: ${details.data}`;
		
		return Object.entries(details).map(([k, v]) => {
			const formattedKey = k.replace(/([A-Z])/g, " $1");
			const finalKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
			return `${finalKey}: ${v}`;
		}).join('\n');
	}
};

const HistoryPage = () => {

	const [history, setHistory] = useState<(QRCodeDetails & { id: number })[]>([])
	const fetchHistory = async () => {
		const data = await getQRCodeHistory();
		console.log(data)
		setHistory(data.sort((a, b) => b.id - a.id)); // Update state when screen is focused
	};
	useFocusEffect(
		useCallback(() => {
			fetchHistory();
		}, [])
	);
	const isPageFocused = useIsFocused();
	const [isFocused, setIsFocused] = useState(1);

	// useEffect(() => {
	// 	console.log("ertyuio")
	// 	fetchHistory();
	// }, [isFocused || isPageFocused]);
	console.log("history ", history)

	const clearHistory = async () => {
		await clearAsyncStorage().then(() => {
			fetchHistory()
			console.log('history cleared')
		}).catch((error) => {
			console.log(error)
		})
	}

console.log("type of", typeof history)
	const handleDelete = async (id: number) => {
		const updatedHistory = await deleteQRCode(id);
		setHistory(updatedHistory); // Update state in the component
	  };
	console.log(isFocused);


	const addData = useQRStore((state) => state.setQRData)
	const handleResultPage = (data:QRCodeDetails) =>{
		console.log("calling function")
		addData(JSON.stringify(data))
		router.push('/(tabs)/result-page')
	}
	return (
		<View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full ">
			{/* <TouchableOpacity onPress={clearHistory}>
				<Text className="text-white text-2xl text-center p-5">Clear data</Text>
			</TouchableOpacity> */}
			<View className=' flex flex-row justify-between pt-8 px-6 '>
				<Text className='font-PoppinsMedium text-xl text-white  w-fit '>
					History
				</Text>
				{/* <Ionicons name='menu' size={30} color='white' /> */}
			</View>


			<View className='pt-8 px-6 '>

				<View className='bg-[#333333]  rounded-lg h-16 px-2  flex flex-row justify-between items-center ' >
					<TouchableOpacity onPressIn={() => setIsFocused(1)} className={`w-[45%] h-[80%] flex  justify-center rounded-lg  ${isFocused === 1 ? 'bg-[#FDB623]' : null}`} activeOpacity={1} >
						<Text className='text-center text-white text-xl font-PoppinsMedium'>
							Scanned
						</Text>

					</TouchableOpacity>
					<Pressable className={`w-[45%] h-[80%] flex  justify-center rounded-lg  ${isFocused === 2 ? 'bg-[#FDB623]' : null}`} onPressIn={() => setIsFocused(2)} >
						<Text className='text-center text-xl text-white font-PoppinsMedium'>
							Created
						</Text>
					</Pressable>
				</View>

				<FlatList
					className='mt-6 h-[65%] '
					
					data={history.filter((item) => isFocused === 1 ? !item.generated : item.generated)}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View className='  px-2 py-1 flex gap-y-5'>
							<TouchableOpacity activeOpacity={0.5} className='h-fit bg-[#333333] flex  w-full flex-row justify-between py-2 rounded-lg px-3 items-center' onPress={() => handleResultPage(item)}>
								<QrSvg width="45" height="45" />


								<View className=' max-h-32  overflow-x-hidden pl-2 w-[70%] flex flex-col gap-y-2'>
									<Text className='text-white text-left' numberOfLines={3} ellipsizeMode='tail'>
										{formatDetails(item)}
									</Text>

									<Text className='text-white font-PoppinsThin text-sm '>
										{item.timestamp}
									</Text>
								</View>

								{/* <View className=' flex justify-center'> */}
								<TouchableOpacity activeOpacity={0.5} onPress={() => handleDelete(item.id)}  >

									<DeleteIcon name='delete-forever' size={30} color={'#FDB623'} className='   my-auto' />
								</TouchableOpacity>
								{/* <Text className='text-white font-PoppinsThin text-sm '>
										{item.timestamp}
									</Text>
								</View> */}



							</TouchableOpacity>


						</View>
					)}

				/>
			</View>

		</View>
	)
}

export default HistoryPage