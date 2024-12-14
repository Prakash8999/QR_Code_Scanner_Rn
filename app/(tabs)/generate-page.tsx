import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import WifiSymbol from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
// import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6Brands';
import { TwitterSvg } from '@/assets/images/SvgImage';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRouter } from 'expo-router';

const iconsData = [
	{ id: 1, name: 'format-text', type: 'Text', size: 30, color: 'white', showName: "Text" },
	{ id: 2, name: 'www', type: 'Www', size: 30, color: 'white', showName: "Url" },
	{ id: 3, name: 'wifi', type: 'Feather', size: 30, color: 'white', showName: "WiFi" },
	{ id: 4, name: 'event-available', type: 'MaterialIcons', size: 30, color: 'white', showName: "Event" },
	{ id: 5, name: 'perm-contact-cal', type: 'MaterialIcons', size: 30, color: 'white', showName: "vCard" },
	{ id: 6, name: 'business', type: 'MaterialIcons', size: 30, color: 'white', showName: "Business" },
	{ id: 7, name: 'location-on', type: 'MaterialIcons', size: 30, color: 'white', showName: "Location" },
	{ id: 8, name: 'whatsapp', type: 'FontAwesome', size: 30, color: 'white', showName: "Whatsapp" },
	{ id: 9, name: 'email', type: 'Zocial', size: 30, color: 'white', showName: "Email" },
	{ id: 10, name: 'x-twitter', type: 'FontAwesome6Pro', size: 30, color: 'white', showName: "Twitter" },
	{ id: 11, name: 'instagram', type: 'FontAwesome', size: 30, color: 'white', showName: "Instagram" },
	{ id: 12, name: 'telephone', type: 'Foundation', size: 30, color: 'white', showName: "Telephone" },
];

const IconComponent = ({ name, type, size, color }: { name: string, type: string, size: number, color: string }) => {
	switch (type) {
		case 'Text':
			return <MaterialCommunityIcons name={name} size={size} color={color} />;
		case 'Www':
			return <Text className='font-PoppinsRegular text-white'>WWW</Text>;

		case 'Feather':
			return <WifiSymbol name={name} size={size} color={color} />;
		case 'MaterialIcons':
			return <MaterialIcon name={name} size={size} color={color} />;
		case 'FontAwesome':
			return <FontAwesome name={name} size={size} color={color} />;
		case 'Zocial':
			return <ZocialIcon name={name} size={size} color={color} />;
		case 'FontAwesome6Pro':
			return <TwitterSvg logoColor='white'/>;
		case 'Foundation':
			return <Foundation name={name} size={size} color={color} />;
		default:
			return null;
	}
};
const GenerateQrCode = () => {
	const router = useRouter()
	return (
		<View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full ">
			<View className="flex flex-row items-center gap-x-6 top-8 left-10 mb-6">
				<Text className="text-white text-2xl font-PoppinsMedium tracking-wider">Generate QR</Text>
			</View>
			<View className="flex-1 justify-center my-auto px-8 h-full mt-5">
				<FlatList
					data={iconsData}
					keyExtractor={(item) => item.id.toString()}
					numColumns={3}
					columnWrapperStyle={{
						justifyContent: 'space-between',
						alignItems: 'stretch',
						marginBottom: 50, // Spacing between rows
					}}
					renderItem={({ item }) => (

						<TouchableOpacity
						
							onPress={() => router.push({
								pathname:'/(tabs)/qrform-page' as any,
								params:{type:item.showName}
							})}
							activeOpacity={0.7}

							style={{
								width: '25%', // Ensures proper spacing
								aspectRatio: 1, // Makes the icon container square
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10,
								borderWidth: 1,
								elevation: 3,
								borderColor: 'white',
								backgroundColor: '#333333', // Optional: Background for better visuals
							}}
						>

							{/* <View className='bg-[#F5F5F5] '> 

								 
							<Text className='text-[#333333]  '>
								{item.showName}
							</Text>
							</View> */}

							<View className='flex justify-center items-center'>

								<IconComponent name={item.name} type={item.type} size={item.size} color={item.color} />
								<Text className='text-white text-sm  font-PoppinsRegular'>
									{item.showName}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					contentContainerStyle={{
						paddingVertical: 30,
					}}
				/>
			</View>
		</View>
	);
};

export default GenerateQrCode