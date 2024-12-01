// import { View } from 'react-native';
// import React from 'react';
// import { useRoute } from '@react-navigation/native';
// import { SingleInputQrGenerator } from '@/components/QrGenerator';

// type QrType = 'Text' | 'Url' | 'Whatsapp' | 'Twitter' | 'Email' | 'Instagram' | 'Telephone' 
// // type QrWifiType = 'WiFi'
// // type QrEventType = 'Event'
// // type QrContactType ='Contact'
// // type QRbusinessType ='Business'



// interface QrConfig {
//     label: string;
//     placeholder: string;
// }

// const qrConfig  = {
//     Text: { label: 'Text', placeholder: 'Enter Text' },
//     Url: { label: 'Url', placeholder: 'Enter Url' },
//     Whatsapp: { label: 'Whatsapp', placeholder: 'Enter Number' },
//     Twitter: { label: 'Twitter', placeholder: 'Enter Twitter Username' },
//     Email: { label: 'Email', placeholder: 'Enter Email' },
//     Instagram: { label: 'Instagram', placeholder: 'Enter Instagram Username' },
//     Telephone: { label: 'Telephone', placeholder: '+1xxxxxxxxx' },
//     // WiFi: { label: 'Wi-Fi', placeholder: 'Enter Wi-Fi Network Name'}
// };

// const QrForm: React.FC = () => {
//     const { params } = useRoute<{ params: { type: QrType  } }>();
//     const qrProps = qrConfig[params.type] ? { ...qrConfig[params.type], type: params.type, logo: 'test' } : null;

//     return (
//         <View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full flex justify-center items-center">
//             {qrProps && <SingleInputQrGenerator className='bg-black' {...qrProps} />}

// {
// <WifiQrCompo />
// }

//         </View>
//     );
// };

// export default QrForm;

import { Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SingleInputQrGenerator,WifiQrCompo ,BusinessQrCompo,EventQrCompo,ContactQrCompo} from '@/components/QrGenerator';

// import BusinessQrCompo from '@/components/BusinessQrCompo';

type QrType = 
  | 'Text' 
  | 'Url' 
  | 'Whatsapp' 
  | 'Twitter' 
  | 'Email' 
  | 'Instagram' 
  | 'Telephone' 
  | 'WiFi'
  | 'Event'
  | 'Contact'
  | 'Business';

const qrConfig = {
    Text: { label: 'Text', placeholder: 'Enter Text' },
    Url: { label: 'Url', placeholder: 'Enter Url' },
    Whatsapp: { label: 'Whatsapp', placeholder: 'Enter Number' },
    Twitter: { label: 'Twitter', placeholder: 'Enter Twitter Username' },
    Email: { label: 'Email', placeholder: 'Enter Email' },
    Instagram: { label: 'Instagram', placeholder: 'Enter Instagram Username' },
    Telephone: { label: 'Telephone', placeholder: '+1xxxxxxxxx' },
};

// Multi-Input Components Mapping
const className = 'your-class-name-here'; // Replace with your desired class name

const multiInputComponents: Record<string, React.FC> = {
  'Wi-Fi': (props) => <WifiQrCompo {...props} className={className} />,
  Event: (props) => <EventQrCompo {...props} className={className} />,
  Contact: (props) => <ContactQrCompo {...props} className={className} />,
  Business: (props) => <BusinessQrCompo {...props} className={className} />,
};

const QrForm: React.FC = () => {
  const { params } = useRoute<{ params: { type: QrType } }>();
  const { type } = params;

  console.log(type)
  // Check if it's a single-input type
  const isSingleInput = !!qrConfig[type as keyof typeof qrConfig];
  
  // Render a single-input component if applicable
  if (isSingleInput) {
    const qrProps = { ...qrConfig[type as keyof typeof qrConfig], type, logo:'test' };
    return (
      <View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full flex justify-center items-center">
        <SingleInputQrGenerator className="bg-black" {...qrProps} />
      </View>
    );
  }

  // Render a multi-input component if applicable
  const MultiInputComponent = multiInputComponents[type];
  if (MultiInputComponent) {
    return (
      <View className="bg-[rgb(51,51,51)]/[0.85] h-full w-full flex items-center">
        <MultiInputComponent  />
      </View>
    );
  }

  // Render a fallback or error if type is invalid
  return (
    <View className="bg-red-500 h-full w-full flex justify-center items-center">
      <Text className="text-white">Invalid QR Type</Text>
    </View>
  );
};

export default QrForm;
