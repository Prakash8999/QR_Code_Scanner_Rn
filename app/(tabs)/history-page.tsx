import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useQRStore from '@/hooks/ZSDataStore'
import { clearAsyncStorage, getQRCodeHistory } from '@/hooks/SaveDataLocally'



const HistoryPage = () => {
	const getQrHistory = async () => {
		const getData = await getQRCodeHistory()

		return getData
	}

console.log(HistoryPage)
	const showHistory = getQrHistory()

	console.log(Array.isArray(showHistory))
	const clearHistory = async () => {
		await clearAsyncStorage().then(() => {
			console.log('history cleared')
		}).catch((error) => {
			console.log(error)
		})
	}

	return (
		<View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full ">
			<TouchableOpacity onPress={clearHistory}>
				<Text className="text-white text-2xl text-center p-5">Clear data</Text>
			</TouchableOpacity>
			<Text>HistoryPage</Text>
		</View>
	)
}

export default HistoryPage