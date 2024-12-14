import { QRCodeDetails, QRCodeGeneratedDetails } from "@/helpers/RefractorQrData";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveQRCodeWithId = async (qrCodeDetails: QRCodeDetails) => {
	try {
		// Retrieve last ID
		const lastId = await AsyncStorage.getItem('lastQrId');
		const newId = lastId ? parseInt(lastId) + 1 : 1;

		// Add the new ID to the QR code details
		const newQRCode = { id: newId, ...qrCodeDetails, timestamp:new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).format(new Date()) };

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
export const deleteQRCode = async (id: number): Promise<(QRCodeDetails & { id: number })[]> => {
	try {
	  const history = await getQRCodeHistory();
	  const updatedHistory = history.filter((item) => item.id !== id);
	  await AsyncStorage.setItem('qrHistory', JSON.stringify(updatedHistory));
	  return updatedHistory;
	} catch (error) {
	  console.error('Error deleting QR Code:', error);
	  return [];
	}
  };

  

  export const saveGeneratedQrCode = async (qrCodeDetails: QRCodeGeneratedDetails) => {
	try {
		// Retrieve last ID
		const lastId = await AsyncStorage.getItem('lastQrId');
		const newId = lastId ? parseInt(lastId) + 1 : 1;

		// Add the new ID to the QR code details
		const newQRCode = { id: newId, ...qrCodeDetails, timestamp:new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).format(new Date()) };

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
