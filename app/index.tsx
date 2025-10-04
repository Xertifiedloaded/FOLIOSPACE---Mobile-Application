import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

const Landing = () => {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      )
    }, 9000) 

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <ImageBackground
      source={{ uri: backgroundImages[currentImageIndex] }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.65)", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBar} />
            <Text style={styles.logoText}>FOLIOSPACE</Text>
          </View>
        </View>


        <View style={styles.main}>
          <View style={styles.hero}>
            <Text style={styles.title}>Foliospace</Text>
            <View style={styles.underline} />
            <Text style={styles.subtitle}>Create your perfect portfolio</Text>
            <Text style={styles.description}>
              Transform your creative vision into reality. Build stunning
              portfolios that capture attention, showcase your unique talents,
              and open doors to new opportunities. Whether you&apos;re a designer,
              developer, photographer, or artist, your story deserves to be told
              beautifully.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.featureText}>
                Beautiful, customizable templates
              </Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.featureText}>Mobile-responsive designs</Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.featureText}>Share with a single link</Text>
            </View>
          </View>
        </View>

        <View style={styles.cta}>
          <TouchableOpacity
            onPress={() => router.push("/auth/login")}
            style={styles.primaryBtn}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryText}>Get Started</Text>
            <Ionicons
              name="arrow-forward"
              size={22}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>
              Already have an account?{" "}
              <Text style={styles.secondaryLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

export default Landing

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBar: {
    width: 8,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
    marginRight: 12,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  hero: {
    marginBottom: 30,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    lineHeight: 58,
    marginBottom: 16,
  },
  underline: {
    width: 80,
    height: 4,
    backgroundColor: "white",
    marginBottom: 20,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 12,
  },
  description: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "300",
  },
  features: {
    marginTop: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    color: "rgba(255,255,255,0.8)",
    marginLeft: 10,
    fontSize: 14,
  },
  cta: {
    marginBottom: 40,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  primaryText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryBtn: {
    marginTop: 16,
    paddingVertical: 8,
  },
  secondaryText: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    fontSize: 14,
  },
  secondaryLink: {
    fontWeight: "600",
    color: "white",
  },
})
