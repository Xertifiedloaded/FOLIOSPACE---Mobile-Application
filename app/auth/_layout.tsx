import { Stack, Tabs } from "expo-router"
import { StatusBar } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar
        barStyle="light-content" // or "light-content"
        backgroundColor="transparent"
        translucent={true}
      />
    </SafeAreaView>
  )
}
