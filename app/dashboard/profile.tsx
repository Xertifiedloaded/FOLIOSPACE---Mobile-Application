import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as ImagePicker from "expo-image-picker"

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    tagline: "",
    phone: "",
    location: "",
    bio: "",
    yearsOfExperience: "",
    experienceLevel: "",
  })

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to grant permission to access your photos."
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const removeImage = () => {
    Alert.alert(
      "Remove Photo",
      "Are you sure you want to remove your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setProfileImage(null),
        },
      ]
    )
  }

  const guidelines = [
    {
      icon: "checkmark-circle",
      text: "Use a clear, high-resolution photo without blur",
    },
    {
      icon: "close-circle",
      text: "Avoid heavy filters or excessive editing",
    },
    {
      icon: "sunny",
      text: "Ensure good lighting with your face centered",
    },
  ]

  return (
    <ScrollView
      contentContainerStyle={{ padding: 10 }}
      showsVerticalScrollIndicator={false}
      className="bg-gray-50"
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">
          Profile Settings
        </Text>
        <Text className="text-gray-500 mt-1">
          Manage your profile information
        </Text>
      </View>

      <View className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
        <View className="items-center pt-8 pb-6 bg-gray-50">
          <View className="relative">
            <View className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                className="w-full h-full"
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../../assets/images/olaitan.png")
                }
                accessibilityLabel="Profile picture"
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-2 right-2 bg-[#793AE8] w-10 h-10 rounded-full items-center justify-center shadow-lg"
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-semibold text-gray-900 mt-4">
            Profile Picture
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            JPG, PNG or GIF (Max 5MB)
          </Text>
        </View>

        <View className="h-px bg-gray-200 mx-6" />

        <View className="p-6 space-y-3">
          <TouchableOpacity
            onPress={pickImage}
            className="bg-[#793AE8] mb-3 py-4 rounded-xl flex-row items-center justify-center shadow-sm active:opacity-80"
          >
            <Ionicons name="cloud-upload-outline" size={20} color="white" />
            <Text className="text-white text-center font-semibold ml-2 text-base">
              Upload New Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={removeImage}
            className="bg-white border-2 border-gray-200 py-4 rounded-xl flex-row items-center justify-center active:bg-gray-50"
          >
            <Ionicons name="trash-outline" size={20} color="#BB1C1C" />
            <Text className="text-[#BB1C1C] text-center font-semibold ml-2 text-base">
              Remove Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-2xl shadow-lg p-6 mb-5">
        <View className="flex-row items-center mb-6">
          <View className="bg-blue-100 p-2 rounded-lg">
            <Ionicons name="person" size={24} color="#2860E7" />
          </View>
          <Text className="text-xl font-bold text-gray-900 ml-3">
            Basic Information
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Username
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
              value={formData.username}
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
            />
            <Ionicons name="at" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            This will be your unique identifier
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Ionicons name="mail" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            We&apos;ll use this for account notifications
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={formData.fullName}
              onChangeText={(text) =>
                setFormData({ ...formData, fullName: text })
              }
            />
            <Ionicons name="person-outline" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            Your legal name as it appears on documents
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Professional Tagline
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="e.g., Senior Software Engineer"
              placeholderTextColor="#9CA3AF"
              value={formData.tagline}
              onChangeText={(text) =>
                setFormData({ ...formData, tagline: text })
              }
            />
            <Ionicons name="briefcase" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            A brief headline describing your role
          </Text>
        </View>

        {/* Phone Number */}
        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
            <Ionicons name="call" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            For important account updates only
          </Text>
        </View>

        {/* Location */}
        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Location
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="City, Country"
              placeholderTextColor="#9CA3AF"
              value={formData.location}
              onChangeText={(text) =>
                setFormData({ ...formData, location: text })
              }
            />
            <Ionicons name="location" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            Where you&apos;re currently based
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Bio</Text>
          <View className="flex-row items-start border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="Tell us about yourself..."
              placeholderTextColor="#9CA3AF"
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Ionicons
              name="document-text"
              size={20}
              color="#6B7280"
              style={{ marginTop: 14 }}
            />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            This will display on your profile summary
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Years of Experience
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="e.g., 5"
              placeholderTextColor="#9CA3AF"
              value={formData.yearsOfExperience}
              onChangeText={(text) =>
                setFormData({ ...formData, yearsOfExperience: text })
              }
              keyboardType="numeric"
            />
            <Ionicons name="calendar" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            Total years in your profession
          </Text>
        </View>

        <View className="mb-0">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Level of Experience
          </Text>
          <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 bg-gray-50">
            <TextInput
              className="flex-1 py-3.5 text-base text-gray-900"
              placeholder="e.g., Senior, Mid-level, Junior"
              placeholderTextColor="#9CA3AF"
              value={formData.experienceLevel}
              onChangeText={(text) =>
                setFormData({ ...formData, experienceLevel: text })
              }
            />
            <Ionicons name="trending-up" size={20} color="#6B7280" />
          </View>
          <Text className="text-xs text-gray-500 mt-1.5">
            Your current professional level
          </Text>
        </View>
      </View>

      <View className="bg-white rounded-2xl shadow-lg p-6 mb-5">
        <View className="flex-row items-center mb-4">
          <View className="bg-blue-100 p-2 rounded-lg">
            <Ionicons name="information-circle" size={24} color="#2860E7" />
          </View>
          <Text className="text-xl font-bold text-gray-900 ml-3">
            Photo Guidelines
          </Text>
        </View>

        <View className="space-y-4">
          {guidelines.map((item, index) => (
            <View key={index} className="flex-row items-start">
              <View className="mt-0.5">
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.icon === "close-circle" ? "#BB1C1C" : "#10B981"}
                />
              </View>
              <Text className="text-base text-gray-700 ml-3 flex-1 leading-6">
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <View className="flex-row items-start">
            <Ionicons name="bulb" size={20} color="#F59E0B" />
            <Text className="text-sm text-amber-800 ml-2 flex-1">
              A professional photo helps others recognize you and builds trust
              in your profile.
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="bg-[#793AE8] py-4 rounded-xl flex-row items-center justify-center shadow-lg active:opacity-80 mb-8">
        <Ionicons name="checkmark-circle" size={22} color="white" />
        <Text className="text-white text-center font-bold ml-2 text-base">
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Profile
