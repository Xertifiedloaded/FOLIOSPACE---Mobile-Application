import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
export default function RootLayout() {
  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent={true}
      />
    </SafeAreaView>
  )
}
