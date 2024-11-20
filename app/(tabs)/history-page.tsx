import { View, Text } from 'react-native'
import React from 'react'
import useQRStore from '@/hooks/ZSDataStore'

const HistoryPage = () => {
	const getQrData = useQRStore((state)=>state.qrData)
	console.log("getQrData ", getQrData);
  return (
	<View>
	  <Text>HistoryPage</Text>
	</View>
  )
}

export default HistoryPage