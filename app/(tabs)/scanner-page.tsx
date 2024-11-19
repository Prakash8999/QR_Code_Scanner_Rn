import { View, TouchableOpacity, Linking, AppState, Platform, StatusBar, Pressable, StyleSheet, Text, Image, Alert } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import Flash from 'react-native-vector-icons/Fontisto';
import FolderIcon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import QrcodeDecoder from 'qrcode-decoder';

import QrImageReader from 'react-native-qr-image-reader';

import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import { CameraType, CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { QrBody } from '@/assets/images/SvgImage';
import Slider from '@react-native-community/slider';
import PlusMinus from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import ScannerOverlay from '@/components/SelectImage';
import { useCodeScanner } from 'react-native-vision-camera';
import jsQR from 'jsqr';
const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
const ScannerPage = () => {
  const [flashMode, setFlashMode] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [image, setImage] = useState<string | null>('');
  const [scale, setScale] = React.useState(1);
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });


  const [permission, requestPermission] = useCameraPermissions();
  const [switchCamera, setSwitchCamera] = useState<CameraType>('back')
  const qrLock = useRef(false);

  const appState = useRef(AppState.currentState);
  const increaseZoom = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 1)); // Ensure zoom does not exceed 1
  };

  const decreaseZoom = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0)); // Ensure zoom does not go below 0
  };
  useEffect(() => {
    const subs = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subs.remove();
    };
  }, []);

  const toggleFlashMode = () => {
    setFlashMode(!flashMode);
  };

  const switchCam = () => {
    setSwitchCamera(current => (current === 'back' ? 'front' : 'back'));
  }


  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64:true

    });

    console.log(result);

    if (!result.canceled) {
      // await   decodeQRCode(result?.assets[0]?.uri);

      return setImage(result?.assets[0]?.uri);


    }
  }

  const handleZoomChange = useCallback(
    debounce((value: number) => setZoom(value), 100), // Adjust debounce delay if needed
    []
  );

  //   const decodeQRCode = async (imageUri: string) => {
  //     console.log("object ", imageUri);
  //     var qr = new QrcodeDecoder();

  //       // let {result}  =await QrImageReader.decode({path:imageUri})

  //       // console.log("qwertyui", imageUri)
  //       // console.log("data ", result);
  //     await  qr.decodeFromImage(imageUri).then((res) => {
  //         console.log("res", res);
  //       }).catch((err)=>{
  // console.log("err", err)
  //       });

  //   };
// Define a handler function that processes the scan result
const handleBarcodeScanned = ({ type, data,raw, bounds,cornerPoints}: BarcodeScanningResult) => {
  if (data) {
    // You can create the BarcodeScanningResult object here
    // const barcodeResult: BarcodeScanningResult = {
    //   type,      // the barcode type (e.g., 'QR_CODE', 'EAN_13')
    //   data,      // the scanned data (e.g., 'https://example.com')
    //   raw ,
    //   bounds,
    //   cornerPoints
    // };

    // Handle the barcode scanning result with a delay (optional)
    setTimeout(() => {
      // scanHandler(barcodeResult); // Pass the result to the scan handler function
      console.log("QR code", data);
  
    }, 500);

  }
};


  console.log(image)
  return (
    <View className="bg-[#333333] opacity-85 h-full w-full flex items-center">
      {/* Flash Toggle Button */}
      <View className="bg-[#333333] top-10 w-[85%] h-12 elevation-2xl rounded-lg flex flex-row justify-between items-center px-8">
        <TouchableOpacity onPress={toggleFlashMode}>
          <Flash name="flash" size={30} color={`${flashMode ? '#FDB623' : 'white'}`} />
        </TouchableOpacity>
        <Pressable onPress={handleImagePicker}>
          <FolderIcon name="images" size={30} color="white" />
        </Pressable>
        <Pressable onPress={switchCam}>
          <FolderIcon name="camera-reverse" size={30} color="white" />
        </Pressable>
      </View>

      <View className="w-[85%] h-[42.2%] top-24 fle items-center relative ">
        <CameraView
          style={{
            width: '96%',
            height: '100%',
            top: 14
          }}
          // onBarcodeScanned={({ data }) => {

          //   if (data) {
          //     // qrLock.current = true;
          //     setTimeout(async () => {
          //       scanHandler(data)
          //       // await Linking.openURL(data);

          //     }, 500);
          //     console.log("qr code", data);
          //   }
          // }}
          facing={switchCamera}
          flash='on'
          enableTorch={flashMode}
          // autofocus='on'
          zoom={zoom}
          onBarcodeScanned={handleBarcodeScanned}
        />



        <QrBody
          width="90%" // Matches CameraView width
          height="42%"
          style={{
            position: 'absolute'

            // backgroundColor:'white'

          }}

        />


        <Image source={{ uri: image }} style={{ width: 200, height: 200, position: 'absolute' }}
          resizeMode='cover' />



      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={decreaseZoom}>
          <Text>

            <PlusMinus
              name='minus' size={30} color={'white'}
            />
          </Text>
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={zoom}
          onValueChange={(value) => handleZoomChange(value)} minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#333333"
          thumbTintColor="#FDB624"

        />
        <TouchableOpacity style={styles.button} onPress={increaseZoom}>
          <Text>

            <PlusMinus
              name='plus' size={30} color={'white'}
            />
          </Text>
        </TouchableOpacity>

        {/* <ScannerOverlay /> */}
      </View>

    </View>
  );
};

export default ScannerPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 150,
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  button: {

    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
