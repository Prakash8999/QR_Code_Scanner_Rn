import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import WifiSymbol from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
// import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6Brands';
import { TwitterSvg } from '@/assets/images/SvgImage';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

interface SingleInputQrProps {
	className: string,
	type: String,
	placeholder: string,
	logo: string,
	label: string
}

export const SingleInputQrGenerator: React.FC<SingleInputQrProps> = ({ className, type, placeholder, logo, label }: SingleInputQrProps) => {

	const [inputValue, setInputValue] = useState('')
	console.log("check type ", type)
	return (
		// <KeyboardAvoidingView 	behavior='padding' style={{height:'100%'}}>

		<View className={`h-[40%] w-[80%] bg-[#333333]  `} style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#FDB623' }}>
			<View className='flex justify-center gap-y-10 items-center h-full'>

				<View className=''>

					{
						type === 'Text' ? <MaterialCommunityIcons name={'format-text'} size={40} color={'#FDB623'} /> : type === 'Url' ? <Text className='font-PoppinsRegular text-[#FDB623] text-xl tracking-wider'>WWW</Text> : type === 'Whatsapp' ? <FontAwesome name={'whatsapp'} size={40} color={'#FDB623'} /> : type === 'Twitter' ? <TwitterSvg logoColor='#FDB623' /> : type === 'Email' ? <MaterialIcon name={'email'} size={40} color={'#FDB623'} /> : type === 'Telephone' ? <Foundation name={'telephone'} size={40} color={'#FDB623'} /> : type === 'Instagram' ? <FontAwesome name={'instagram'} size={40} color={'#FDB623'} /> : null

					}
				</View>

				<View className='w-full '>
					<Text className={`text-white font-PoppinsRegular pl-5 `}>{label}</Text>
					<TextInput
						className={`text-white font-PoppinsRegular  w-[90%] border mx-auto border-gray-400 rounded-xl  `}
						placeholderTextColor={'gray'}
						onChangeText={setInputValue}
						value={inputValue}
						placeholder={placeholder}
					/>
				</View>

				<TouchableOpacity className='bg-[#FDB623] rounded-md px-2 py-3'>
					<Text className='text-xl font-PoppinsMedium'>
						Generate QR Code
					</Text>
				</TouchableOpacity>
			</View>


		</View>
		// </KeyboardAvoidingView>
	)
}




export const WifiQrCompo: React.FC<{ className: string }> = ({ className }) => {
	const [network, setNetwork] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View className={`h-[50%] w-[80%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#FDB623' }}>
			<View className="flex justify-center gap-y-8 pb-4 items-center h-full">
				<WifiSymbol name="wifi" size={60} color="#FDB623" />
				<View className='flex w-full gap-y-6'>
					<View className='flex '>

						<Text className='text-white  font-PoppinsMedium pl-4'>
							SSID
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="Enter Network Name"
							placeholderTextColor="gray"
							value={network}
							onChangeText={setNetwork}
						/>
					</View>
					<View>

						<Text className='text-white  font-PoppinsMedium pl-4'>
							Password
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="Enter Password"
							placeholderTextColor="gray"
							value={password}
							onChangeText={setPassword}
						/>
					</View>
				</View>
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3">
					<Text className="text-xl font-PoppinsMedium">Generate WiFi QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export const EventQrCompo: React.FC<{ className: string }> = ({ className }) => {
	const [eventName, setEventName] = useState('');
	const [startDateTime, setStartDateTime] = useState('');
	const [endDateTime, setEndDateTime] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [description, setDescription] = useState('');

	return (
		<View className={`h-[80%] w-[80%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#FDB623' }}>
			<View className="flex justify-center gap-y-3 items-center h-full">
				<MaterialIcon name="event-available" size={60} color="#FDB623" />
				<View className='w-full flex gap-y-2'>
					<View className='flex gap-y-2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Event Name
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="Event Name"
							placeholderTextColor="gray"
							value={eventName}
							onChangeText={setEventName}
						/>
					</View>
					<View className='flex gap-y-2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Start Date & Time 
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="17 Aug 2022, 12:30 pm"
							placeholderTextColor="gray"
							value={startDateTime}
							onChangeText={setStartDateTime}
						/>
					</View>
					<View className='flex gap-y-2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							End Date & Time 
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="17 Aug 2022, 06:30 pm"
							placeholderTextColor="gray"
							value={endDateTime}
							onChangeText={setEndDateTime}
						/>
					</View>
					<View className='flex gap-y-2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Event Location
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="Enter Location"
							placeholderTextColor="gray"
							value={eventLocation}
							onChangeText={setEventLocation}
						/>
					</View>
					<View className='flex gap-y-2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Description
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
							placeholder="Event any details"
							placeholderTextColor="gray"
							value={description}
							onChangeText={setDescription}
						/>
					</View>
		
				</View>
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3">
					<Text className="text-xl font-PoppinsMedium">Generate Event QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};



export const ContactQrCompo: React.FC<{ className: string }> = ({ className }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		company: '',
		job: '',
		phone: '',
		email: '',
		website: '',
		address: '',
		city: '',
		country: '',
	});

	const updateField = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<View className={`h-[85%] w-[90%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2,borderTopWidth: 2, borderColor: '#FDB623' }}>
			<View className="flex  gap-y-5 items-center h-full">
				<MaterialIcon name="perm-contact-cal" size={60} color="#FDB623" />


				<View className='flex gap-y-2'>
				<View className='w-full flex flex-row'>

					<View className='flex gap-y-1 w-1/2 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							First Name
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Name"
							placeholderTextColor="gray"
							value={formData.firstName}
							onChangeText={(text) => updateField(formData.firstName, text)}
							/>
					</View>
					<View className='flex gap-y-1 w-1/2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Last Name
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Name"
							placeholderTextColor="gray"
							value={formData.lastName}
							onChangeText={(text) => updateField(formData.lastName, text)}
							/>
					</View>
				</View>
				<View className='w-full flex flex-row'>

					<View className='flex gap-y-1 w-1/2 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
Company						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Company"
							placeholderTextColor="gray"
							value={formData.company}
							onChangeText={(text) => updateField(formData.company, text)}
							/>
					</View>
					<View className='flex gap-y-1 w-1/2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Job
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Job"
							placeholderTextColor="gray"
							value={formData.job}
							onChangeText={(text) => updateField(formData.lastName, text)}
							/>
					</View>
				</View>
				<View className='w-full flex flex-row'>

					<View className='flex gap-y-1 w-1/2 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Phone
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Phone"
							placeholderTextColor="gray"
							value={formData.phone}
							onChangeText={(text) => updateField(formData.phone, text)}
							/>
					</View>
					<View className='flex gap-y-1 w-1/2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Email
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Email"
							placeholderTextColor="gray"
							value={formData.email}
							onChangeText={(text) => updateField(formData.email, text)}
							/>
					</View>
				</View>





					<View className='flex gap-y-1'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Website
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Website"
							placeholderTextColor="gray"
							value={formData.website}
							onChangeText={(text) => updateField(formData.website, text)}
							/>
					
					</View>
					<View className='flex gap-y-1 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Address
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Address"
							placeholderTextColor="gray"
							value={formData.address}
							onChangeText={(text) => updateField(formData.address, text)}
							/>
					
					</View>

				<View className='w-full flex flex-row'>

					<View className='flex gap-y-1 w-1/2 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							City
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter City"
							placeholderTextColor="gray"
							value={formData.city}
							onChangeText={(text) => updateField(formData.city, text)}
							/>
					</View>
					<View className='flex gap-y-1 w-1/2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Country
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Country"
							placeholderTextColor="gray"
							value={formData.country}
							onChangeText={(text) => updateField(formData.country, text)}
							/>
					</View>
				</View>
				{/* {Object.entries(formData).map(([key, value]) => (
					<TextInput
						key={key}
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-md h-11"
						placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
						placeholderTextColor="gray"
						value={value}
						onChangeText={(text) => updateField(key, text)}
					/>
				))} */}
				</View>
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3">
					<Text className="text-xl font-PoppinsMedium">Generate Contact QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const BusinessQrCompo: React.FC<{ className: string }> = ({ className }) => {
	const [formData, setFormData] = useState({
		companyName: '',
		industry: '',
		phone: '',
		email: '',
		website: '',
		address: '',
		city: '',
		country: '',
	});

	const updateField = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<View className={`h-[85%] w-[90%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2,borderTopWidth: 2, borderColor: '#FDB623' }}>
			<View className="flex  gap-y-5 items-center h-full">
				<MaterialIcon name="perm-contact-cal" size={60} color="#FDB623" />


				<View className='flex gap-y-2'>
				

					<View className='flex gap-y-1  '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Company Name
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Name"
							placeholderTextColor="gray"
							value={formData.companyName}
							onChangeText={(text) => updateField(formData.companyName	, text)}
							/>
					</View>
					<View className='flex gap-y-1 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Industry 
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="e.g Food/Agency"
							placeholderTextColor="gray"
							value={formData.industry}
							onChangeText={(text) => updateField(formData.industry, text)}
							/>
				</View>
				
				<View className='w-full flex flex-row'>

					<View className='flex gap-y-1 w-1/2 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Phone
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Phone"
							placeholderTextColor="gray"
							value={formData.phone}
							onChangeText={(text) => updateField(formData.phone, text)}
							/>
					</View>
					<View className='flex gap-y-1 w-1/2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Email
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Email"
							placeholderTextColor="gray"
							value={formData.email}
							onChangeText={(text) => updateField(formData.email, text)}
							/>
					</View>
				</View>





					<View className='flex gap-y-1'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Website
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Website"
							placeholderTextColor="gray"
							value={formData.website}
							onChangeText={(text) => updateField(formData.website, text)}
							/>
					
					</View>
					<View className='flex gap-y-1 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Address
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Address"
							placeholderTextColor="gray"
							value={formData.address}
							onChangeText={(text) => updateField(formData.address, text)}
							/>
					
					</View>

				<View className='w-full flex flex-row'>

					<View className='flex gap-y-1 w-1/2 '>
						<Text className='text-white font-PoppinsMediums pl-4'>
							City
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter City"
							placeholderTextColor="gray"
							value={formData.city}
							onChangeText={(text) => updateField(formData.city, text)}
							/>
					</View>
					<View className='flex gap-y-1 w-1/2'>
						<Text className='text-white font-PoppinsMediums pl-4'>
							Country
						</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Country"
							placeholderTextColor="gray"
							value={formData.country}
							onChangeText={(text) => updateField(formData.country, text)}
							/>
					</View>
				</View>
				{/* {Object.entries(formData).map(([key, value]) => (
					<TextInput
						key={key}
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-md h-11"
						placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
						placeholderTextColor="gray"
						value={value}
						onChangeText={(text) => updateField(key, text)}
					/>
				))} */}
				</View>
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3">
					<Text className="text-xl font-PoppinsMedium">Generate Contact QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};



export const Location = ({ className }: { className: string }) => {
	return (
		<View className=''>



		</View>
	)
}



