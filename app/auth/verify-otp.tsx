import { useLocalSearchParams, useRouter } from "expo-router"
import React, { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import api from "../services/apiClient"

const VerifyOtpScreen = () => {
  const router = useRouter()
  const { email } = useLocalSearchParams<{ email: string }>()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerifyOtp = async () => {
    if (!otp) return Alert.alert("Error", "Enter the OTP")

    try {
      setLoading(true)
      await api.verifyOtp({ email, otp })
      Alert.alert("Success", "OTP verified. Set a new password.")
      router.push({ pathname: "/reset-password", params: { email, otp } })
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-center bg-slate-900 px-6">
      <Text className="text-white text-3xl font-bold mb-8 text-center">
        Verify OTP 📩
      </Text>

      <TextInput
        placeholder="Enter OTP"
        placeholderTextColor="#94a3b8"
        value={otp}
        onChangeText={setOtp}
        className="bg-slate-800 text-white px-4 py-3 rounded-xl mb-6 text-center tracking-[6px]"
        keyboardType="number-pad"
      />

      <TouchableOpacity
        onPress={handleVerifyOtp}
        disabled={loading}
        className={`${
          loading ? "bg-gray-500" : "bg-green-600"
        } py-3 rounded-xl`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Verifying..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default VerifyOtpScreen
