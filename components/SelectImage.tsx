import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import FolderIcon from 'react-native-vector-icons/Ionicons';

const ScannerOverlay = () => {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleImagePicker = async () => {
	  let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  quality: 1,
    });

    if (!result.canceled) {
		setImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => setImage(null);
  
  return (
	<GestureHandlerRootView style={{flex:1}}>

    <View style={{ flex: 1, backgroundColor: '#333333' }}>
      {/* Scanner and controls */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleImagePicker} style={styles.folderButton}>
          <FolderIcon name="images" size={30} color="white" />
        </TouchableOpacity>

        {/* Render picked image on top of the scanner */}
        {image && (
          <PanGestureHandler
            onGestureEvent={(e) =>
				setTranslate({
                x: e.nativeEvent.translationX,
                y: e.nativeEvent.translationY,
			})
		}
          >
            <PinchGestureHandler
              onGestureEvent={(e) => setScale(Math.max(1, e.nativeEvent.scale))}
			  >
              <View style={[styles.imageContainer, { transform: [{ scale }, { translateX: translate.x }, { translateY: translate.y }] }]}>
                <Image source={{ uri: image }} style={styles.image} />

                {/* Close Button */}
                <TouchableOpacity onPress={handleRemoveImage} style={styles.closeButton}>
                  <Text style={{ color: 'white', fontSize: 16 }}>X</Text>
                </TouchableOpacity>
              </View>
            </PinchGestureHandler>
          </PanGestureHandler>
        )}
      </View>
    </View>
	
</GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  folderButton: {
	  position: 'absolute',
	  top: 20,
	  left: 20,
	  backgroundColor: '#444',
	  borderRadius: 5,
	  padding: 10,
	},
	imageContainer: {
		position: 'absolute',
		top: '30%',
    left: '10%',
    width: '80%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScannerOverlay;
