import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import { useQRStore } from '@/hooks/ZSDataStore';
import { QRCodeDetails } from '@/helpers/RefractorQrData';
import { Link } from 'expo-router';
import GoBackIcon from 'react-native-vector-icons/Ionicons';
import { QrSvg } from '@/assets/images/SvgImage';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

const GenerateResultPage = () => {
	const getQrData = useQRStore.getState().qrData;
	const data : QRCodeDetails = JSON.parse(getQrData?.code!);
	const qrRef = useRef<any>(null);
	const viewShotRef = useRef<any>(null);

	const [dataText, setDataText] = useState('')
	console.log("object ", data);




	const renderData = (forCopy = false): string | React.ReactNode => {
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

					</>
				);
		} else if (data.type === 'Url' || data.type === 'URL') {
			return forCopy ? `URL: ${data.details.url}` : (
				<Text className="text-white text-base" selectable={true}>Url: {data.details.url}</Text>
			);
		}
		else if (data.type === 'geo') {
			const { latitude, longitude, query } = data.details;
			return forCopy
				? `Latitude: ${latitude}\nLongitude: ${longitude}\nQuery: ${query || ''}`
				: (
					<>
						<Text className="text-white text-base" selectable={true}>Latitude: {latitude + '\n'}</Text>
						<Text className="text-white text-base" selectable={true}>Longitude: {longitude + '\n'}</Text>
						{
							query && <Text className={`text-white text-base `} selectable={true}>Query: {query}</Text>
						}
					</>
				);
		}
		else if (data.type === 'Text' || data.type === 'text') {
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
			return forCopy ? `Email: ${data.details.email}` : (
				<Text className="text-white text-base" selectable={true}>Email: {data.details.email}</Text>
			);
		}
		else if (data.type === 'Event') {
			const { description, endDateTime, eventLocation, eventName, startDateTime } = data.details;
			return forCopy
				? `Event Name: ${eventName}\nStart Date & Time: ${startDateTime}\nEnd Date & Time: ${endDateTime}\nEvent Location: ${eventLocation}\nDescription: ${description}`
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
				? `Company Name: ${companyName}\nPhone: ${phone}\nEmail: ${email}\nURL: ${website}\nIndustry: ${industry || ''}\nAddress: ${address || ''}\nCity: ${city || ''}\nCountry: ${country || ''}`
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
		else if (data.type === 'Twitter') {
			return forCopy ? `Twitter: ${data.details.twitter}` : (
				<Text className="text-white text-base" selectable={true}>Twitter: {data.details.twitter}</Text>
			);
		}
		else if (data.type === 'Instagram') {
			return forCopy ? `Instagram: ${data.details.instagram}` : (
				<Text className="text-white text-base" selectable={true}>Instagram: {data.details.instagram}</Text>
			);
		}
		else {
			return forCopy ? `Data: ${data.details.data}` : (
				<Text className="text-white text-base" selectable={true}>{data.details.data ? data.details.data : Object.entries(data.details).map(([k, v]) => `${k.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}: ${v}`).join('\n')}</Text>
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

			<View className="w-[80%] min-h-[25%] h-fit max-h-[75%] overflow-hidden bg-[#333333] mx-auto top-16 rounded-lg elevation-2xl p-6 flex gap-y-5">
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex gap-y-2 mb-4">
						<Text selectable={true}>
							{renderData()}
						</Text>
					</View>
					<View className="flex items-center justify-center py-4">
						{data.qrContent && (
							<View 
								ref={viewShotRef} 
								style={{ padding: 25, backgroundColor: 'white', borderRadius: 30, elevation: 5 }}
								className="items-center justify-center shadow-lg"
							>
								<QRCode
									value={data.qrContent}
									size={width * 0.5}
									getRef={(c) => (qrRef.current = c)}
								/>
							</View>
						)}
					</View>
				</ScrollView>
			</View>

		</View>
	)
}

export default GenerateResultPage