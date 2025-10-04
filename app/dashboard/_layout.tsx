import { Stack } from "expo-router"
import { View, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import DashboardFooter from "../components/DashboardFooter"
import DashboardHeader from "../components/DashboardHeader"

export default function DashboardLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <DashboardHeader />

      <View className="bg-white" style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      <DashboardFooter />
    </SafeAreaView>
  )
}
