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
				<Ionicons name='menu' size={30} color='white' />
			</View>


			<View className='pt-8 px-6 '>

				<View className='bg-[#333333]  rounded-lg h-16 px-2  flex flex-row justify-between items-center ' >
					<TouchableOpacity onPressIn={() => setIsFocused(1)} className={`w-[45%] h-[80%] flex  justify-center rounded-lg  ${isFocused === 1 ? 'bg-[#FDB623]' : null}`} activeOpacity={1} >
						<Text className='text-center text-white text-xl font-PoppinsMedium'>
							Scan
						</Text>

					</TouchableOpacity>
					<Pressable className={`w-[45%] h-[80%] flex  justify-center rounded-lg  ${isFocused === 2 ? 'bg-[#FDB623]' : null}`} onPressIn={() => setIsFocused(2)} >
						<Text className='text-center text-xl text-white font-PoppinsMedium'>
							Create
						</Text>
					</Pressable>
				</View>

				<FlatList
					className='mt-6 h-[65%] '
					
					data={history}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View className='  px-2 py-1 flex gap-y-5'>
							<TouchableOpacity activeOpacity={0.5} className='h-fit bg-[#333333] flex  w-full flex-row justify-between py-2 rounded-lg px-3 items-center' onPress={() => handleResultPage(item)}>
								<QrSvg width="45" height="45" />


								<View className=' max-h-32  overflow-x-hidden pl-2 w-[70%] flex flex-col gap-y-2'>
									<Text className='text-white text-left '>

									{JSON.stringify(item.details).replace(/[{}"]/g, '')}
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