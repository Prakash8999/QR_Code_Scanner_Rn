import { QRCodeDetails } from '@/helpers/RefractorQrData';
import {create} from 'zustand';

interface QRState {
	qrData: {
	  code: string ; // The QR code data
	  timestamp: string; // Time when the QR code was scanned
	} | null; // Null if no QR code is scanned yet
	setQRData: (data: string) => void;
  }
  
  const useQRStore = create<QRState>((set) => ({
	qrData: null,
	setQRData: (data: string ) =>
	  set({
		qrData: {
		  code: data,
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

  export default useQRStore
  