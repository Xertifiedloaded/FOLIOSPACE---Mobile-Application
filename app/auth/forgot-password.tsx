import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import api from "../services/apiClient"

const ForgotPasswordScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async () => {
    if (!email) {
      return Alert.alert("Error", "Please enter your email")
    }
    try {
      setLoading(true)
      // 🚨 depends on your backend endpoint, replace if needed
      await api.requestPasswordReset({ email })
      Alert.alert("Success", "Password reset instructions sent to your email")
      router.replace("/login") // back to login after request
    } catch (err: any) {
      console.error("Forgot password error:", err.response?.data || err.message)
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to send reset email"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-center bg-slate-900 px-6">
      <Text className="text-white text-3xl font-bold mb-8 text-center">
        Forgot Password 🔑
      </Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        className="bg-slate-800 text-white px-4 py-3 rounded-xl mb-6"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TouchableOpacity
        onPress={handleForgotPassword}
        disabled={loading}
        className={`${loading ? "bg-gray-500" : "bg-blue-600"} py-3 rounded-xl`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} className="mt-6">
        <Text className="text-blue-400 text-center">Back to Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgotPasswordScreen
