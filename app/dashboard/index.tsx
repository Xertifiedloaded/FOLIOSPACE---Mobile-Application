import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import {
  PortfolioSectionData,
  quickActionData,
  recentActivityData,
} from "@/constants"

const Dashboard = () => {
  const router = useRouter()

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Welcome Back, Olaitan!</Text>
            <Text style={styles.heroSubtitle}>
              Your Portfolio is looking great
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>O</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressPercentage}>89%</Text>
            <Text style={styles.progressLabel}>Profile Complete</Text>
          </View>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Complete Profile</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View style={styles.statIconContainer}>
              <Ionicons name="eye-outline" size={24} color="#793AE8" />
            </View>
            <View style={styles.statBadge}>
              <Ionicons name="trending-up" size={12} color="#10B981" />
              <Text style={styles.statBadgeText}>12%</Text>
            </View>
          </View>
          <Text style={styles.statValue}>1,234</Text>
          <Text style={styles.statLabel}>Portfolio Views</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View style={styles.statIconContainer}>
              <Ionicons name="document-text-outline" size={24} color="#793AE8" />
            </View>
            <View style={styles.statBadge}>
              <Ionicons name="trending-up" size={12} color="#10B981" />
              <Text style={styles.statBadgeText}>8%</Text>
            </View>
          </View>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Blog Posts</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActionData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={[styles.quickActionCard, { backgroundColor: item.bg }]}
              activeOpacity={0.7}
            >
              <View style={styles.quickActionIconContainer}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={styles.quickActionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          {recentActivityData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.activityItem,
                index !== recentActivityData.length - 1 && styles.activityItemBorder
              ]}
            >
              <View style={[styles.activityIconContainer, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityLabel}>{item.label}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          ))}
        </View>
      </View>

      {/* Portfolio Sections */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Portfolio Sections</Text>
        <View style={styles.card}>
          {PortfolioSectionData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              style={[
                styles.portfolioItem,
                index !== PortfolioSectionData.length - 1 && styles.portfolioItemBorder
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.portfolioIconContainer, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <View style={styles.portfolioContent}>
                <Text style={styles.portfolioLabel}>{item.label}</Text>
                <Text style={styles.portfolioPosition}>{item.position}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  heroCard: {
    backgroundColor: "#793AE8",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#793AE8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "400",
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatarText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressInfo: {
    flex: 1,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    letterSpacing: -1,
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "500",
  },
  completeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  completeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#793AE8",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionCard: {
    width: "48%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
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
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  activityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
  },
  portfolioItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  portfolioItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  portfolioIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  portfolioContent: {
    flex: 1,
  },
  portfolioLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  portfolioPosition: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
  },
})

export default Dashboard