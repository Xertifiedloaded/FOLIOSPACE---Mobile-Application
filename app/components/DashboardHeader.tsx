import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
export default function DashboardHeader() {
  return (
      <View className="flex-row items-center p-4 bg-white shadow-sm max-w-4xl mx-auto justify-between w-full">
        <View className="flex-row  gap-2 items-center">
          <View className="h-[45] w-[45] rounded-full bg-[#793AE8] border border-[#793AE8] items-center justify-center">
            <Text className="text-white font-bold text-lg">F</Text>
          </View>
          <View className="">
            <Text className="font-bold text-lg">Foliospace</Text>
            <Text className="font-medium text-[#626469] text-xs">
              Your Portfolio Hub
            </Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
  )
}
