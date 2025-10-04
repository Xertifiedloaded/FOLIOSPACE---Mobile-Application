import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const Login = () => {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = () => {
    router.push("/dashboard")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white px-6 py-10 justify-center">
        <View className="items-center mb-10">
          <Image
            className="w-72 h-24"
            source={require("../../assets/images/logo.png")}
            accessibilityLabel="logo"
            resizeMode="contain"
          />
          <Text className="text-gray-700 text-base mt-2 font-medium">
            Welcome back to Foliospace
          </Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text className="text-gray-600 mb-2 font-medium">Email</Text>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2 font-medium">Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <Pressable
            className="flex-row items-center"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Ionicons
              name={rememberMe ? "checkbox" : "square-outline"}
              size={22}
              color={rememberMe ? "#9333EA" : "#6b7280"}
            />
            <Text className="ml-2 text-gray-600">Remember me</Text>
          </Pressable>

          <TouchableOpacity onPress={() => router.push("/auth/forget-password")}>
            <Text className="text-purple-600 text-sm font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-purple-600 rounded-lg py-4 mt-10 flex-row items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-lg font-semibold">Sign In</Text>
          <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/register")}
          className="mt-6"
        >
          <Text className="text-center text-gray-500">
            Don’t have an account?{" "}
            <Text className="text-purple-600 font-semibold">Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login
