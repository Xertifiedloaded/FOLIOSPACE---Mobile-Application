import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const Register = () => {
  const router = useRouter()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white px-6 py-10">
        <View className="items-center mb-8">
          <Image
            className="w-72 h-24"
            source={require("../../assets/images/logo.png")}
            accessibilityLabel="logo"
            resizeMode="contain"
          />
          <Text className="text-gray-700 text-base mt-2 font-medium">
            Create an account on Foliospace
          </Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text className="text-gray-600 mb-2 font-medium">Username</Text>
            <TextInput
              placeholder="Enter your username"
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mt-4">
            <Text className="text-gray-600 mb-2 font-medium">Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mt-4">
            <Text className="text-gray-600 mb-2 font-medium">Email</Text>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mt-4">
            <Text className="text-gray-600 mb-2 font-medium">Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mt-4">
            <Text className="text-gray-600 mb-2 font-medium">
              Confirm Password
            </Text>
            <TextInput
              placeholder="Re-enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-xl px-4 py-4 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/auth/forget-password")}
          className="mt-2"
        >
          <Text className="text-purple-600 text-sm font-medium text-right">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-purple-600 rounded-lg py-4 mt-7 flex-row items-center justify-center active:opacity-80">
          <Text className="text-white text-lg font-semibold">
            Create Account
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/login")}
          className="mt-4"
        >
          <Text className="text-center text-gray-500">
            Already have an account?{" "}
            <Text className="text-purple-600 font-semibold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Register
