import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const Settings = () => {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [privateProfile, setPrivateProfile] = useState(false)

  const accountSettings = [
    { icon: "person-outline", label: "Edit Profile", route: "/dashboard/profile", badge: null },
    { icon: "lock-closed-outline", label: "Change Password", route: "/security/password", badge: null },
    { icon: "mail-outline", label: "Email Settings", route: "/settings/email", badge: null },
    { icon: "shield-checkmark-outline", label: "Privacy & Security", route: "/settings/privacy", badge: "New" },
  ]

  const portfolioSettings = [
    { icon: "briefcase-outline", label: "Portfolio Visibility", route: "/portfolio/visibility", badge: null },
    { icon: "color-palette-outline", label: "Theme & Appearance", route: "/portfolio/theme", badge: null },
    { icon: "link-outline", label: "Custom Domain", route: "/portfolio/domain", badge: "Pro" },
    { icon: "analytics-outline", label: "Analytics & Insights", route: "/portfolio/analytics", badge: null },
  ]

  const supportSettings = [
    { icon: "help-circle-outline", label: "Help Center", route: "/support/help", badge: null },
    { icon: "chatbubble-outline", label: "Contact Support", route: "/support/contact", badge: null },
    { icon: "star-outline", label: "Rate Our App", route: "/support/rate", badge: null },
    { icon: "document-text-outline", label: "Terms & Conditions", route: "/legal/terms", badge: null },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarTextLarge}>O</Text>
        </View>
        <Text style={styles.userName}>Olaitan</Text>
        <Text style={styles.userEmail}>olaitan@example.com</Text>
        <TouchableOpacity style={styles.viewProfileButton}>
          <Text style={styles.viewProfileText}>View Portfolio</Text>
          <Ionicons name="arrow-forward" size={16} color="#793AE8" />
        </TouchableOpacity>
      </View>

      {/* Quick Toggle Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Settings</Text>
        <View style={styles.card}>
          <View style={styles.toggleItem}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: "#DBEAFE" }]}>
                <Ionicons name="notifications-outline" size={22} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.toggleLabel}>Push Notifications</Text>
                <Text style={styles.toggleDescription}>Get updates about your portfolio</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
              thumbColor={notifications ? "#793AE8" : "#F3F4F6"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={[styles.toggleItem, styles.toggleItemBorder]}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: "#FEE2E2" }]}>
                <Ionicons name="mail-outline" size={22} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.toggleLabel}>Email Updates</Text>
                <Text style={styles.toggleDescription}>Receive weekly digest emails</Text>
              </View>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
              thumbColor={emailUpdates ? "#793AE8" : "#F3F4F6"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={[styles.toggleItem, styles.toggleItemBorder]}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: "#F3E8FF" }]}>
                <Ionicons name="moon-outline" size={22} color="#9333EA" />
              </View>
              <View>
                <Text style={styles.toggleLabel}>Dark Mode</Text>
                <Text style={styles.toggleDescription}>Coming soon</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
              thumbColor={darkMode ? "#793AE8" : "#F3F4F6"}
              ios_backgroundColor="#E5E7EB"
              disabled
            />
          </View>

          <View style={[styles.toggleItem, styles.toggleItemBorder]}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="eye-off-outline" size={22} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.toggleLabel}>Private Profile</Text>
                <Text style={styles.toggleDescription}>Hide from search engines</Text>
              </View>
            </View>
            <Switch
              value={privateProfile}
              onValueChange={setPrivateProfile}
              trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
              thumbColor={privateProfile ? "#793AE8" : "#F3F4F6"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          {accountSettings.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={[
                styles.settingItem,
                index !== accountSettings.length - 1 && styles.settingItemBorder
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: "#F3F4F6" }]}>
                  <Ionicons name={item.icon as any} size={20} color="#793AE8" />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
              </View>
              <View style={styles.settingRight}>
                {item.badge && (
                  <View style={[
                    styles.badge,
                    item.badge === "Pro" ? styles.badgePro : styles.badgeNew
                  ]}>
                    <Text style={[
                      styles.badgeText,
                      item.badge === "Pro" ? styles.badgeTextPro : styles.badgeTextNew
                    ]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <View style={styles.card}>
          {portfolioSettings.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={[
                styles.settingItem,
                index !== portfolioSettings.length - 1 && styles.settingItemBorder
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: "#F3F4F6" }]}>
                  <Ionicons name={item.icon as any} size={20} color="#793AE8" />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
              </View>
              <View style={styles.settingRight}>
                {item.badge && (
                  <View style={[
                    styles.badge,
                    item.badge === "Pro" ? styles.badgePro : styles.badgeNew
                  ]}>
                    <Text style={[
                      styles.badgeText,
                      item.badge === "Pro" ? styles.badgeTextPro : styles.badgeTextNew
                    ]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & About</Text>
        <View style={styles.card}>
          {supportSettings.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={[
                styles.settingItem,
                index !== supportSettings.length - 1 && styles.settingItemBorder
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: "#F3F4F6" }]}>
                  <Ionicons name={item.icon as any} size={20} color="#793AE8" />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.versionSubtext}>© 2025 Portfolio App</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#F5F5F7",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 40,
  },
  profileCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#793AE8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarTextLarge: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  viewProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#793AE8",
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    letterSpacing: -0.3,
    textTransform: "uppercase",

  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  toggleItemBorder: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  toggleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeNew: {
    backgroundColor: "#DBEAFE",
  },
  badgePro: {
    backgroundColor: "#FEF3C7",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  badgeTextNew: {
    color: "#3B82F6",
  },
  badgeTextPro: {
    color: "#F59E0B",
  },
  logoutButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#EF4444",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 24,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: "#D1D5DB",
  },
})

export default Settings