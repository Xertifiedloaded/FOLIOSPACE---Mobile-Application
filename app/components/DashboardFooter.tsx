import React, { useRef } from "react"
import { View, Text, Pressable, Animated, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter, usePathname } from "expo-router"

const navItems = [
  { label: "Home", icon: "home-sharp", route: "/dashboard" },
  { label: "Profile", icon: "person-circle", route: "/dashboard/profile" },
  { label: "Blog", icon: "globe-outline", route: "/dashboard/blog" },
  { label: "Analytics", icon: "analytics-sharp", route: "/dashboard/analytics" },
  { label: "Settings", icon: "settings-sharp", route: "/dashboard/settings" },
]

const NavButton = ({ item, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.navButton,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isActive ? "#793AE8" : "transparent",
            },
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={22}
            color={isActive ? "#ffffff" : "#6b7280"}
          />
        </View>

        <Text
          style={[
            styles.label,
            {
              color: isActive ? "#793AE8" : "#6b7280",
              fontWeight: isActive ? "600" : "500",
            },
          ]}
        >
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  )
}

export default function DashboardFooter() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {navItems.map((item) => (
          <NavButton
            key={item.label}
            item={item}
            isActive={pathname === item.route}
            onPress={() => router.push(item.route as any)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    maxWidth: 600,
    marginHorizontal: "auto",
    width: "100%",
  },
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.2,
    marginTop: 2,
  },
})