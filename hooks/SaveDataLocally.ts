import { QRCodeDetails } from "@/helpers/RefractorQrData";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveQRCodeWithId = async (qrCodeDetails: QRCodeDetails) => {
	try {
		// Retrieve last ID
		const lastId = await AsyncStorage.getItem('lastQrId');
		const newId = lastId ? parseInt(lastId) + 1 : 1;

		// Add the new ID to the QR code details
		const newQRCode = { id: newId, ...qrCodeDetails };

		// Get existing history
		const existingHistory = await AsyncStorage.getItem('qrHistory');
		const history = existingHistory ? JSON.parse(existingHistory) : [];

		// Append new QR code to history
		history.push(newQRCode);

		// Save updated history and new last ID
		await AsyncStorage.setItem('qrHistory', JSON.stringify(history));
		await AsyncStorage.setItem('lastQrId', newId.toString());

		console.log('QR Code saved with ID:', newId);
	} catch (error) {
		console.error('Error saving QR Code with ID:', error);
	}
};

export const getQRCodeHistory = async (): Promise<(QRCodeDetails & { id: number })[]> => {
	try {
		const history = await AsyncStorage.getItem('qrHistory');
		return history ? JSON.parse(history) : [];
	} catch (error) {
		console.error('Error retrieving QR Code history:', error);
		return [];
	}
};


export const clearAsyncStorage = async () => {
	await AsyncStorage.clear();
}