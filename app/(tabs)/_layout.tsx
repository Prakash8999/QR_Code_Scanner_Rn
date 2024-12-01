import { QrCodeLogo } from '@/assets/images/SvgImage';
import { Tabs } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import History from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function TabLayout() {

  return (
    <SafeAreaView style={styles.safearea} >
    {/* <NavigationContainer> */}
    {/* <KeyboardAvoidingView
        // style={styles.container}
        behavior='position'
        keyboardVerticalOffset={60} // Adjust this value based on your tab bar height
      > */}

      <Tabs screenOptions={{ tabBarActiveTintColor: '#ffcc00', tabBarStyle: styles.tabBar }} >
        <Tabs.Screen
          name="generate-page"
          
          options={{
            title: 'Generate',
            // tabbar
            tabBarLabelStyle: {
              fontSize: 15
            },
            headerShown: false,
            tabBarIcon: ({ color }) => <Icon size={28} name="qrcode" color={color} />,
          }}
          />
        <Tabs.Screen
          name="scanner-page"
          options={{
            
            // tabBarShowLabel:false,
            headerShown: false,
            tabBarLabel: "Scan",
            tabBarLabelStyle: {
              fontSize: 15
            },
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.middleTab}>
                <View style={[styles.iconWrapper]}>
                  <QrCodeLogo />
                </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="history-page"
          options={{
            title: 'History',
            tabBarLabelStyle: {
              fontSize: 15,
            },
            headerShown: false,
            tabBarIcon: ({ color }) => <History size={28} name="history" color={color} />,
          }}
          />

        <Tabs.Screen
          name="setting-page"
          options={{
            href: null
          }}
          />

        <Tabs.Screen
          name="result-page"
          options={{
            headerShown:false,
            href: null
          }}
          />
        <Tabs.Screen
          name="qrform-page"
          options={{
            headerShown:false,
            href: null
          }}
          />

      </Tabs>
          {/* </KeyboardAvoidingView> */}
          {/* </NavigationContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  tabBar: {
    
    backgroundColor: '#333333',
    height: 60,
    borderBottomWidth: 0,
    // width: '90%',
    paddingTop: 5,
    paddingBottom: 2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1.0,
    },
    // shadowColor: 'white',

    borderColor: '#FDB623',
    borderWidth: 1,
    // left: '5%',
  },
  middleTab: {
    position: 'absolute',
    bottom: 3, // Lifts the middle tab above the tab bar
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcc00',
  },

});
