import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { QrSvg } from '@/assets/images/SvgImage'
import Icon from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router'
import { useCameraPermissions } from 'expo-camera'
const index = () => {
	const [permission, requestPermission] = useCameraPermissions();

	useEffect(() => {
		// Automatically request permission on first render
		if (!permission?.granted) {
			requestPermission();
		}
	}, [permission]);

	const isPermissionGranted = Boolean(permission?.granted);
	return (
		<View className='bg-[#333333] h-full w-full flex justify-center items-center'>

			<QrSvg height='200' width='200' />


			<View className='flex items-center top-52 gap-y-7'>

				<View className='flex items-center '>

					<Text className='text-white font-PoppinsRegular text-xl'>
						Unlock Instant Actions with Every Scan!
					</Text>
				</View>
				<View className={`bg-[#FDB623] w-72  h-12 flex justify-center  rounded-md  ${!isPermissionGranted ? 'opacity-80' : 'opacity-100'}`}>

					<TouchableOpacity className='w-full flex flex-row justify-center gap-x-3 '
						disabled={!isPermissionGranted}
						onPress={() => router.push(`/(tabs)/scanner-page` as any)} 
						activeOpacity={0.5}
						>
						<Text className='text-center text-xl font-PoppinsRegular text-[#333333]'>
							Let's Start
						</Text>
						<Icon name="arrowright" size={24} color={'#333333'} />
					</TouchableOpacity>
					{!isPermissionGranted && (
						<Text style={{ color: "red", textAlign: "center" }}>
							Camera permission is required to use this feature.
						</Text>
					)}
				</View>


			</View>
		</View>
	)
}

export default index

const styles = StyleSheet.create({})