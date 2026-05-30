import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QrSvg } from '@/assets/images/SvgImage'
import Icon from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router'
import { useCameraPermissions } from 'expo-camera'
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = () => {
	const [permission, requestPermission] = useCameraPermissions();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkStatus = async () => {
			if (!permission) return;

			try {
				const hasOpened = await AsyncStorage.getItem('hasOpened');
				if (hasOpened === 'true' && permission.granted) {
					router.replace('/(tabs)/scanner-page' as any);
				} else {
					setIsChecking(false);
				}
			} catch (error) {
				console.log('Error checking AsyncStorage', error);
				setIsChecking(false);
			}
		};

		checkStatus();
	}, [permission]);

	const handleStart = async () => {
		if (!permission?.granted && permission?.canAskAgain) {
			await requestPermission();
		}
		router.replace(`/(tabs)/scanner-page` as any);
	};

	if (isChecking) {
		return <View className='bg-[#333333] h-full w-full' />;
	}

	return (
		<View className='bg-[#333333] h-full w-full flex justify-center items-center'>

			<QrSvg height='200' width='200' />


			<View className='flex items-center top-52 gap-y-7'>

				<View className='flex items-center '>

					<Text className='text-white font-PoppinsRegular text-xl'>
						Unlock Instant Actions with Every Scan!
					</Text>
				</View>
				<View className={`bg-[#FDB623] w-72  h-12 flex justify-center  rounded-md`}>

					<TouchableOpacity className='w-full flex flex-row justify-center gap-x-3 '
						onPress={handleStart} 
						activeOpacity={0.5}
						>
						<Text className='text-center text-xl font-PoppinsRegular text-[#333333]'>
							Let's Start
						</Text>
						<Icon name="arrowright" size={24} color={'#333333'} />
					</TouchableOpacity>
				</View>


			</View>
		</View>
	)
}

export default index

const styles = StyleSheet.create({})