// import { QRCodeGeneratedDetails } from '@/helpers/RefractorQrData';
import { QRCodeGeneratedDetails } from '@/helpers/RefractorQrData';
import {create} from 'zustand';

interface QRState {
	qrData: {
	  code: string ; // The QR code data
	  base64ImageUrl?:string,
	  qrContent?: string,
	  timestamp: string; // Time when the QR code was scanned
	} | null; // Null if no QR code is scanned yet
	setQRData: (data: string, base64ImageUrl?: string, qrContent?: string) => void;
  }
  
  const useQRStore = create<QRState>((set) => ({
	qrData: null,
	setQRData: (data: string, base64ImageUrl?: string , qrContent?:string ) =>
	  set({
		qrData: {
		  code: data,
		  base64ImageUrl: base64ImageUrl || '',
		  qrContent: qrContent || '',
		  timestamp: new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).format(new Date()),
		},
	  }),
  }));


  
export {useQRStore}