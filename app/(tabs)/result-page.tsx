import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert, ToastAndroid, Share } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GoBackIcon from 'react-native-vector-icons/Ionicons';
import { Link, Navigator, useNavigation } from 'expo-router';
import { QrSvg } from '@/assets/images/SvgImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useQRStore } from '@/hooks/ZSDataStore';
import { QRCodeDetails } from '@/helpers/RefractorQrData';
import Copy from 'react-native-vector-icons/MaterialIcons'
import ShareData from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveQRCodeWithId } from '@/hooks/SaveDataLocally';
import { useNavigationState, useIsFocused } from '@react-navigation/native';
import { copyToClipboard, OpenURLButton, shareText } from '@/components/ReUsableCompo';


const ResultPage = () => {
	const getQrData = useQRStore.getState().qrData;
	const data: QRCodeDetails = JSON.parse(getQrData?.code!);


	console.log("data ", data)



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
			const { fullName, mobile, homePhone, email, url, company, job, city, address } = data.details;
			return forCopy
				? `Full Name: ${fullName}\nMobile: ${mobile}\nHome Phone: ${homePhone || ''}\nEmail: ${email}\nURL: ${url}\nCompany: ${company || ''}\nJob: ${job || ''}\nCity: ${city || ''}\nAddress: ${address || ''}`
				: (
					<>
						<Text className="text-white text-base" selectable={true}>Full Name: {fullName + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Mobile: {mobile + '\n'}</Text>
						{
							homePhone && <Text className={`text-white text-base `} selectable={true}>Home Phone: {homePhone + '\n'}</Text>
						}


						<Text className="text-white text-base" selectable={true}>Email: {email + '\n'}</Text>
						{
							company && <Text className="text-white text-base" selectable={true}>Company: {company + '\n'}</Text>

						}
						{
							job && <Text className="text-white text-base" selectable={true}>Job: {job + '\n'}</Text>
						}
						{
							city && <Text className="text-white text-base" selectable={true}>City: {city + '\n'}</Text>
						}
						{
							address && <Text className="text-white text-base" selectable={true}>Address: {address + '\n'}</Text>
						}
						{
							url && <Text className="text-white text-base" selectable={true}>URL: {url} </Text>
						}
						{/* <Text className="text-white text-base" selectable={true}>Website: {url + '\n'}</Text> */}

					</>
				);
		} else if (data.type === 'Url') {
			return forCopy ? `URL: ${data.details.url}` : (
				<Text className="text-white text-base" selectable={true}>Url: {data.details.url}</Text>
			);


		}
		else if (data.type === 'geo') {
			const {latitude, longitude,query } = data.details;
			return forCopy
				? `Latitude: ${latitude}\nLongitude: ${longitude}\Query: ${query || ''}`
				: (
					<>
						<Text className="text-white text-base" selectable={true}>Latitude: {latitude + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Longitude: {longitude + '\n'}</Text>
						{
							query && <Text className={`text-white text-base `} selectable={true}>Query: {query }</Text>
						}



					</>
				);
		}
		else if (data.type === 'Text') {
			return forCopy ? `Text: ${data.details.text}` : (
				<Text className="text-white text-base" selectable={true}>Text: {data.details.text}</Text>
			);
		}

		else if (data.type === 'Telephone') {
			return forCopy ? `Phone: ${data.details.telephone}` : (
				<Text className="text-white text-base" selectable={true}>Telephone: {data.details.telephone.tel ? data.details.telephone.tel : data.details.telephone}</Text>
			);
		}
		else if (data.type === 'Whatsapp') {
			return forCopy ? `WhatsApp: ${data.details.whatsapp}` : (
				<Text className="text-white text-base" selectable={true}>WhatsApp: {data.details.whatsapp}</Text>
			);
		}
		else if (data.type === 'Email') {
			return forCopy ? `WhatsApp: ${data.details.email}` : (
				<Text className="text-white text-base" selectable={true}>Email: {data.details.email}</Text>
			);
		}

		else if (data.type === 'Event') {
			const { description, endDateTime, eventLocation, eventName, startDateTime } = data.details;
			return forCopy
				? `Event Name: ${eventName}\nStart Date & Time: ${startDateTime}\nEnd Date & Time: ${endDateTime}\nEvent Location: ${eventLocation}\Description: ${description}`
				: (
					<>
						<Text className="text-white text-base" selectable={true}>Event Name: {eventName + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Start Date & Time: {startDateTime + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>End Date & Time: {endDateTime + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Event Location: {eventLocation + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Description: {description + '\n'}</Text>
					</>
				);
		}
		else if (data.type === 'bCard') {
			const { country, city, address, email, website, companyName, phone, industry } = data.details;
			return forCopy
				? `Company Name: ${companyName}\nPhone: ${phone}\nEmail: ${email}\nURL: ${website}\nIndustry: ${industry || ''}\nAddress: ${address || ''}\nCity: ${city || ''}n\Country: ${country || ''}`
				: (
					<>
						<Text className="text-white text-base" selectable={true}>Company Name: {companyName + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Industry: {industry + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Phone No: {phone + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Email: {email + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Website: {website} </Text>
						<Text className="text-white text-base" selectable={true}>Address: {address + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>City: {city + '\n'}</Text>

						<Text className="text-white text-base" selectable={true}>Country: {country + '\n'}</Text>


					</>
				);
		}
		else {
			return forCopy ? `Data: ${data.details.data}` : (
				<Text className="text-white text-base" selectable={true}>{data.details.data}</Text>
			);
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
			<View className='top-20 p-6 w-[80%]  h-fit  mx-auto flex flex-row justify-between'>
				{data.type === 'Url' ? (

					<OpenURLButton url={data.details.url.toLowerCase()} text='Open Url' iconName='external-link' />
				) : null}

				<TouchableOpacity onPress={() => copyToClipboard(renderData(true) as string)} className='  text-center flex items-center'>
					<Copy name='content-copy' color={'white'} size={30} />
					<Text className='text-center text-white font-PoppinsRegular'>
						Copy
					</Text>
				</TouchableOpacity>

				{
					data.type === 'Whatsapp' ? (
						<OpenURLButton url={`https://api.whatsapp.com/send/?phone=%2B91${data.details.whatsapp}&text&type=phone_number&app_absent=0`} text='Open' iconName='whatsapp' />


					) : null
				}
				{
					data.type === 'Email' ? (
						<OpenURLButton url={`mailto:${data.details.email}`} text='Open' iconName='Email' />


					) : null
				}

				<TouchableOpacity onPress={() => shareText(renderData(true) as string)} className='  text-center flex items-center'>
					<ShareData name='share' color={'white'} size={30} />
					<Text className='text-center text-white font-PoppinsRegular'>
						Share
					</Text>


				</TouchableOpacity>



			</View>
		</View>
	);
};

export default ResultPage;
