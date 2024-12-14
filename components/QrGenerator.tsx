import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, Platform, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import WifiSymbol from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
// import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6Brands';
import { TwitterSvg } from '@/assets/images/SvgImage';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Alert } from 'react-native';
import { saveGeneratedQrCode } from '@/hooks/SaveDataLocally';
import { useQRStore } from '@/hooks/ZSDataStore';
import { useRouter } from 'expo-router';
import { parseQRCodeData, QRCodeDetails } from '@/helpers/RefractorQrData';
import DateTimePicker from '@react-native-community/datetimepicker';

// import Picker from 'react-native-dropdown-picker';

import { Picker } from '@react-native-picker/picker';



interface QRCodeWithToDataURL extends QRCode {
	toDataURL: (callback: (data: string) => void) => void;
}

interface SingleInputQrProps {
	className: string,
	type: String,
	placeholder: string,
	logo: string,
	label: string
}

export const SingleInputQrGenerator: React.FC<SingleInputQrProps> = ({ className, type, placeholder, logo, label }: SingleInputQrProps) => {

	const addData = useQRStore((state) => state.setQRData)


	const [inputValue, setInputValue] = useState('');
	const router = useRouter()

	console.log("type", type);
	let qrContent;
	if (type === 'Twitter') qrContent = `https://x.com/${inputValue}`
	else if (type === 'Instagram') qrContent = `https://www.instagram.com/${inputValue}/`
	else if (type === 'EMAIL') qrContent = `mailto:${inputValue}`
	else if (type === 'Telephone') qrContent = `tel:${inputValue}`
	else if (type === 'WhatsApp') qrContent = `https://wa.me/${inputValue}`
	else qrContent = inputValue



	const handleSaveQRCode = async () => {
		if (inputValue.trim().length < 4) {
			ToastAndroid.showWithGravity(
				'Minimum input length must be 4 characters.',
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
			return;
		}

		// Prepare the data object based on the type
		const preparedData: QRCodeDetails = {
			type: type.toString(),
			generated: true,
			details: { [type.toLowerCase()]: inputValue },
			timestamp: new Intl.DateTimeFormat('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			}).format(new Date()),
			qrContent: qrContent

		};
		const parsedData = parseQRCodeData(inputValue);
		console.log("preparedData ", preparedData)
		console.log("parsedData ", parsedData)
		// Save the data to Zustand
		addData(JSON.stringify(preparedData));

		// Navigate to the result page
		router.push('/(tabs)/result-page');
		setInputValue('')
	};



	return (
		// <KeyboardAvoidingView 	behavior='padding' style={{height:'100%'}}>

		<View className={`h-[40%] w-[80%] bg-[#333333]  `} style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#FDB623' }}>
			<View className={`flex justify-center ${type === 'Text' ? 'gap-y-0' : 'gap-y-10'} items-center h-full`}>

				<View className=''>

					{
						type === 'Text' ? <MaterialCommunityIcons name={'format-text'} size={40} color={'#FDB623'} /> : type === 'Url' ? <Text className='font-PoppinsRegular text-[#FDB623] text-xl tracking-wider'>WWW</Text> : type === 'Whatsapp' ? <FontAwesome name={'whatsapp'} size={40} color={'#FDB623'} /> : type === 'Twitter' ? <TwitterSvg logoColor='#FDB623' /> : type === 'Email' ? <MaterialIcon name={'email'} size={40} color={'#FDB623'} /> : type === 'Telephone' ? <Foundation name={'telephone'} size={40} color={'#FDB623'} /> : type === 'Instagram' ? <FontAwesome name={'instagram'} size={40} color={'#FDB623'} /> : null

					}
				</View>

				<View className='w-full '>
					<Text className={`text-white font-PoppinsRegular pl-5 `}>{label}</Text>
					{/* {
						type ==='Whatsapp' && <Text className={`text-white font-PoppinsRegular pl-5 `}>+91</Text>
					} */}
					<TextInput
						className={`text-white font-PoppinsRegular  w-[90%] border mx-auto border-gray-400 rounded-xl pl-2  ${type === 'Text' ? 'h-[50%]' : 'h-12'} `}
						placeholderTextColor={'gray'}
						onChangeText={setInputValue}
						value={inputValue}
						keyboardType={
							type === 'Whatsapp' || type === 'Telephone' ? 'numeric' : type === 'Email' ? 'email-address' : 'default'
						}

						placeholder={placeholder}
					/>
				</View>

				<TouchableOpacity className='bg-[#FDB623] rounded-md px-2 py-3' onPress={handleSaveQRCode}
				>
					<Text className='text-xl font-PoppinsMedium'>
						Generate QR Code
					</Text>
				</TouchableOpacity>

			</View>


		</View>
		// </KeyboardAvoidingView>
	)
}




export const WifiQrCompo: React.FC<{ className: string, type: string }> = ({ className, type }) => {
	const [network, setNetwork] = useState('');
	const [password, setPassword] = useState('');
	const [hidden, setHidden] = useState(false);
	const [securityType, setSecurityType] = useState('WPA/WPA2')
	const router = useRouter()
	const addData = useQRStore((state) => state.setQRData)

	const handleSaveQRCode = async () => {

		// Validation for required fields
		if (network.trim().length < 1) {
			ToastAndroid.showWithGravity(
				'SSID (Network Name) is required.',
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
			return;
		}

		if (securityType !== 'None' && password.trim().length < 8) {
			ToastAndroid.showWithGravity(
				'Password must be at least 8 characters for secured networks.',
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
			return;
		}

		const qrContent = `WIFI:S:${network};T:${securityType};P:${password};H:${hidden};;
`
		// Prepare the data object
		const preparedData: QRCodeDetails = {
			type: type.toString(),
			generated: true,
			details: {
				ssid: network,
				password: securityType !== 'None' ? password : '', // Password is optional for 'None'
				hidden,
				securityType,
			},
			timestamp: new Intl.DateTimeFormat('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			}).format(new Date()),
			qrContent: qrContent.trim()
		};

		console.log('Prepared Data:', preparedData);

		// Save the data to Zustand or your state management
		addData(JSON.stringify(preparedData));

		// Navigate to the result page
		router.push('/(tabs)/result-page');

		// Reset the input fields
		setNetwork('');
		setPassword('');
		setHidden(false);
		setSecurityType('WPA/WPA2');
	};
	console.log(securityType)
	return (
		<View className={`h-[70%] w-[80%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#FDB623' }}>
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
					<View
						className='flex flex-row items-center pl-4'>
						<TouchableOpacity
							style={{
								height: 20,
								width: 20,
								borderWidth: 1,
								borderColor: "gray",
								backgroundColor: "white",
								marginRight: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => setHidden(!hidden)} // Toggle hidden state
						>
							{hidden && (
								<Text style={{ color: "black", fontWeight: "bold" }}>✔</Text>
							)}
						</TouchableOpacity>
						<Text style={{ color: "white" }}>Hidden</Text>
					</View>
					<View>
						<Text className="text-white font-PoppinsMedium pl-4">
							Security Type
						</Text>
						<Picker
							selectedValue={securityType}

							style={{
								color: 'white',
								backgroundColor: '#333333',
								width: '90%',
								alignSelf: 'center',
								borderWidth: 1,
								borderColor: 'white',
								borderRadius: 10,
							}}
							focusable
							onValueChange={(itemValue) => setSecurityType(itemValue)}
						>



							<Picker.Item label="WPA/WPA2" value="WPA/WPA2" />
							<Picker.Item label="WEP" value="WEP" />
							<Picker.Item label="None" value="None" />
						</Picker>
					</View>
					{/* </View> */}
				</View>
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3" onPress={handleSaveQRCode}>
					<Text className="text-xl font-PoppinsMedium">Generate WiFi QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const EventQrCompo: React.FC<{ className: string; type: string }> = ({ className, type }) => {
	const [eventName, setEventName] = useState('');
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [eventLocation, setEventLocation] = useState('');
	const [description, setDescription] = useState('');
	const [showPicker, setShowPicker] = useState({
		startDate: false,
		startTime: false,
		endDate: false,
		endTime: false,
	});

	const router = useRouter();
	const addData = useQRStore((state) => state.setQRData);



	const handleSaveQRCode = () => {
		if (!eventName.trim()) {
			ToastAndroid.show('Event name is required.', ToastAndroid.SHORT);
			return;
		}
		if (!startDate || !startTime || !endDate || !endTime) {
			ToastAndroid.show('All date and time fields are required.', ToastAndroid.SHORT);
			return;
		}

		const combinedStartDateTime = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate(),
			startTime.getHours(),
			startTime.getMinutes()
		);
		const combinedEndDateTime = new Date(
			endDate.getFullYear(),
			endDate.getMonth(),
			endDate.getDate(),
			endTime.getHours(),
			endTime.getMinutes()
		);

		if (combinedStartDateTime >= combinedEndDateTime) {
			ToastAndroid.show('End date/time must be after the start date/time.', ToastAndroid.SHORT);
			return;
		}

		const qrContent = `BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${combinedStartDateTime.toLocaleString()},
DTEND:${combinedEndDateTime.toLocaleString()},
LOCATION:${eventLocation}
DESCRIPTION:${description}
END:VEVENT`.trim()

		const preparedData: QRCodeDetails = {
			type: type.toString(),
			generated: true,
			details: {
				eventName,
				startDateTime: combinedStartDateTime.toLocaleString(),
				endDateTime: combinedEndDateTime.toLocaleString(),
				eventLocation,
				description,
			},
			timestamp: new Intl.DateTimeFormat('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			}).format(new Date()),
			qrContent:qrContent
		};

		console.log('Prepared Data:', preparedData);
		addData(JSON.stringify(preparedData));
		router.push('/(tabs)/result-page');
	};

	return (
		<ScrollView
			className={`h-[70%] w-[80%] bg-[#333333] ${className}`}
			style={{
				borderRadius: 20,
				borderBottomWidth: 2,
				borderTopWidth: 2,
				borderColor: '#FDB623',
			}}
		>
			<View className="flex justify-center  items-center h-full">
				<MaterialIcon name="event-available" size={60} color="#FDB623" />
				<View className="w-full flex gap-y-2">
					<Text className="text-white font-PoppinsMediums pl-4">Event Name</Text>
					<TextInput
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
						placeholder="Event Name"
						placeholderTextColor="gray"
						value={eventName}
						onChangeText={setEventName}
					/>
					<Text className="text-white font-PoppinsMediums pl-4">Start Date</Text>
					<TouchableOpacity
						onPress={() => setShowPicker((prev) => ({ ...prev, startDate: true }))}
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4 py-3"
					>
						<Text className="text-white">{startDate ? startDate.toDateString() : 'Select Start Date'}</Text>
					</TouchableOpacity>
					{showPicker.startDate && (
						<DateTimePicker
							value={startDate || new Date()}
							mode="date"
							display="default"
							onChange={(event, date) => {
								setShowPicker((prev) => ({ ...prev, startDate: false }));
								if (date) setStartDate(date);
							}}
						/>
					)}
					<Text className="text-white font-PoppinsMediums pl-4">Start Time</Text>
					<TouchableOpacity
						onPress={() => setShowPicker((prev) => ({ ...prev, startTime: true }))}
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4 py-3"
					>
						<Text className="text-white">{startTime ? startTime.toLocaleTimeString() : 'Select Start Time'}</Text>
					</TouchableOpacity>
					{showPicker.startTime && (
						<DateTimePicker
							value={startTime || new Date()}
							mode="time"
							display="default"
							onChange={(event, time) => {
								setShowPicker((prev) => ({ ...prev, startTime: false }));
								if (time) setStartTime(time);
							}}
						/>
					)}
					<Text className="text-white font-PoppinsMediums pl-4">End Date</Text>
					<TouchableOpacity
						onPress={() => setShowPicker((prev) => ({ ...prev, endDate: true }))}
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4 py-3"
					>
						<Text className="text-white">{endDate ? endDate.toDateString() : 'Select End Date'}</Text>
					</TouchableOpacity>
					{showPicker.endDate && (
						<DateTimePicker
							value={endDate || new Date()}
							mode="date"
							display="default"
							onChange={(event, date) => {
								setShowPicker((prev) => ({ ...prev, endDate: false }));
								if (date) setEndDate(date);
							}}
						/>
					)}
					<Text className="text-white font-PoppinsMediums pl-4">End Time</Text>
					<TouchableOpacity
						onPress={() => setShowPicker((prev) => ({ ...prev, endTime: true }))}
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4 py-3"
					>
						<Text className="text-white">{endTime ? endTime.toLocaleTimeString() : 'Select End Time'}</Text>
					</TouchableOpacity>
					{showPicker.endTime && (
						<DateTimePicker
							value={endTime || new Date()}
							mode="time"
							display="default"
							onChange={(event, time) => {
								setShowPicker((prev) => ({ ...prev, endTime: false }));
								if (time) setEndTime(time);
							}}
						/>
					)}
					<Text className="text-white font-PoppinsMediums pl-4">Event Location</Text>
					<TextInput
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
						placeholder="Enter Location"
						placeholderTextColor="gray"
						value={eventLocation}
						onChangeText={setEventLocation}
					/>
					<Text className="text-white font-PoppinsMediums pl-4">Description</Text>
					<TextInput
						className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl pl-4"
						placeholder="Event details"
						placeholderTextColor="gray"
						value={description}
						onChangeText={setDescription}
					/>
				</View>
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3" onPress={handleSaveQRCode}>
					<Text className="text-xl font-PoppinsMedium">Generate Event QR</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};


export const ContactQrCompo: React.FC<{ className: string, type: string }> = ({ className, type }) => {
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
	const router = useRouter();
	const addData = useQRStore((state) => state.setQRData);


	const updateField = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleSaveQRCode = () => {
		const {
			firstName,
			lastName,
			phone,
			email,
			website,
			address,
			city,
			country,
			company,
			job,
		} = formData;

		// Validate required fields
		if (!firstName.trim() || !phone.trim()) {
			ToastAndroid.show('First Name and Phone are required.', ToastAndroid.SHORT);
			return;
		}

		// Prepare the contact details in a vCard-like format
		const contactDetails = `
		  BEGIN:VCARD
		  VERSION:3.0
		  N:${lastName};${firstName}
		  FN:${firstName} ${lastName}
		  ORG:${company}
		  TITLE:${job}
		  TEL:${phone}
		  EMAIL:${email}
		  URL:${website}
		  ADR:;;${address};${city};;${country}
		  END:VCARD
		`;

		// Generate QR code payload
		const qrData: QRCodeDetails = {
			type,
			generated: true,
			details: {
				fullName: firstName + " " + lastName,
				mobile: phone,
				email,
				url: website,
				address,
				city,
				country,
				company,
				job,
			},
			qrContent: contactDetails.trim(),
			timestamp: new Intl.DateTimeFormat('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			}).format(new Date())
		};

		console.log('QR Data:', qrData);

		// Example save operation (using a state or sending to a server)
		// Replace with your actual save logic
		addData(JSON.stringify(qrData)); // Assuming addData is a function from your Zustand store or similar state management
		router.push('/(tabs)/result-page');
	};
	return (
		<View className={`h-[85%] w-[90%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#FDB623' }}>
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
								onChangeText={(text) => updateField('firstName', text)}
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
								onChangeText={(text) => updateField('lastName', text)}
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
								onChangeText={(text) => updateField('company', text)}
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
								onChangeText={(text) => updateField('job', text)}
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
								keyboardType='number-pad'
								value={formData.phone}
								onChangeText={(text) => updateField('phone', text)}
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
								keyboardType='email-address'
								value={formData.email}
								onChangeText={(text) => updateField('email', text)}
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
							onChangeText={(text) => updateField('website', text)}
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
							onChangeText={(text) => updateField('address', text)}
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
								onChangeText={(text) => updateField('city', text)}
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
								onChangeText={(text) => updateField('country', text)}
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
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3" onPress={handleSaveQRCode}>
					<Text className="text-xl font-PoppinsMedium">Generate Contact QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const BusinessQrCompo: React.FC<{ className: string, type: string }> = ({ className, type }) => {
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


	const router = useRouter();
	const addData = useQRStore((state) => state.setQRData);

	const updateField = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleSaveQRCode = () => {
		// Validate required fields
		if (!formData.companyName || !formData.phone) {
			alert("Company Name and Phone are required!");
			return;
		}

		const qrContent = `
	MECARD:
	N:${formData.companyName};
	TEL:${formData.phone};
	EMAIL:${formData.email || ''};
	URL:${formData.website || ''};
	ADR:${formData.address || ''};
	NOTE:${formData.industry || ''};
	CITY:${formData.city || ''};
	COUNTRY:${formData.country || ''};
	;;
`.trim();

		const qrData: QRCodeDetails = {
			type: "bCard",
			generated: true,
			details: {
				...formData
			},
			qrContent: qrContent,
			timestamp: new Intl.DateTimeFormat('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			}).format(new Date()),
		};

		console.log('QR Data:', qrData);

		// Example save operation (using a state or sending to a server)
		// Replace with your actual save logic
		addData(JSON.stringify(qrData)); // Assuming addData is a function from your Zustand store or similar state management
		router.push('/(tabs)/result-page');


		setTimeout(() => {

			setFormData({
				companyName: '',
				industry: '',
				phone: '',
				email: '',
				website: '',
				address: '',
				city: '',
				country: '',
			});
		}, 300);

	}



	console.log(formData.companyName)
	return (
		<View className={`h-[85%] w-[90%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#FDB623' }}>
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
							onChangeText={(text) => updateField('companyName', text)}
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
							onChangeText={(text) => updateField('industry', text)}
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
								keyboardType='number-pad'
								value={formData.phone}
								onChangeText={(text) => updateField('phone', text)}
							/>
						</View>
						<View className='flex gap-y-1 w-1/2'>
							<Text className='text-white font-PoppinsMediums pl-4'>
								Email
							</Text>
							<TextInput
								className="text-white font-PoppinsRegular w-[90%] border mx-auto border-gray-400 rounded-xl h-12 pl-4"
								placeholder="Enter Email"
								keyboardType='email-address'
								placeholderTextColor="gray"
								value={formData.email}
								onChangeText={(text) => updateField('email', text)}
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
							onChangeText={(text) => updateField('website', text)}
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
							onChangeText={(text) => updateField('address', text)}
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
								onChangeText={(text) => updateField('city', text)}
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
								onChangeText={(text) => updateField('country', text)}
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
				<TouchableOpacity className="bg-[#FDB623] rounded-md px-2 py-3" onPress={handleSaveQRCode}>
					<Text className="text-xl font-PoppinsMedium">Generate Contact QR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};




export const GeoLocationQrCompo: React.FC<{ className: string, type: string }> = ({ className, type }) => {
	const [formData, setFormData] = useState({
		latitude: '',
		longitude: '',
		query: '',
	});
	const [qrContent, setQrContent] = useState<string | null>(null);

	const updateField = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const router = useRouter();
	const addData = useQRStore((state) => state.setQRData);

	const handleSaveQRCode = () => {
		const { latitude, longitude, query } = formData;

		if (!latitude || !longitude) {
			Alert.alert('Error', 'Please enter both latitude and longitude');
			return;
		}

		// Format QR content according to the geo URI schema
		const geoContent = query
			? `geo:${latitude},${longitude}?q=${encodeURIComponent(query)}`
			: `geo:${latitude},${longitude}`;

		const qrData: QRCodeDetails = {
			qrContent: geoContent,
			type: "geo",
			generated: true,
			details: {
				...formData
			},
			timestamp: new Intl.DateTimeFormat('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			}).format(new Date()),

		}
		addData(JSON.stringify(qrData)); // Assuming addData is a function from your Zustand store or similar state management
		router.push('/(tabs)/result-page');


		setTimeout(() => {

			setFormData({
				latitude: '',
				longitude: '',
				query: '',
			});
		}, 300);


	};

	return (
		<View className={`h-[85%] w-[90%] bg-[#333333] ${className}`} style={{ borderRadius: 20, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#FDB623' }}>
			<View className="flex gap-y-5 items-center h-full">
				<MaterialIcon name="location-on" size={60} color="#FDB623" />

				<View className="flex gap-y-2">
					<View className="flex gap-y-1">
						<Text className="text-white font-PoppinsMediums pl-4">Latitude</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-full border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Latitude"
							placeholderTextColor="gray"
							keyboardType="numeric"
							value={formData.latitude}
							onChangeText={(text) => updateField('latitude', text)}
						/>
					</View>

					<View className="flex gap-y-1">
						<Text className="text-white font-PoppinsMediums pl-4">Longitude</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-full border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Enter Longitude"
							placeholderTextColor="gray"
							keyboardType="numeric"
							value={formData.longitude}
							onChangeText={(text) => updateField('longitude', text)}
						/>
					</View>

					<View className="flex gap-y-1">
						<Text className="text-white font-PoppinsMediums pl-4">Query</Text>
						<TextInput
							className="text-white font-PoppinsRegular w-full border mx-auto border-gray-400 rounded-xl h-12 pl-4"
							placeholder="Optional (e.g., Restaurant Name)"
							placeholderTextColor="gray"
							value={formData.query}
							onChangeText={(text) => updateField('query', text)}
						/>
					</View>
				</View>

				<TouchableOpacity
					className="bg-[#FDB623] rounded-md px-2 py-3"
					onPress={handleSaveQRCode}
				>
					<Text className="text-xl font-PoppinsMedium">Generate Geo QR</Text>
				</TouchableOpacity>

				{qrContent && (
					<View className="mt-5">
						<QRCode value={qrContent} size={150} backgroundColor="#333333" color="#FDB623" />
						<Text className="text-white mt-3">{qrContent}</Text>
					</View>
				)}
			</View>
		</View>
	);
};
