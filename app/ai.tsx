import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ChatMessage = ({ message, isUser }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideAnim])

  return (
    <Animated.View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.aiMessageContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {!isUser && (
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={16} color="#ec4899" />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text style={[styles.messageText, isUser && styles.userMessageText]}>
          {message.text}
        </Text>
        {message.data && (
          <View style={styles.portfolioPreview}>
            <Text style={styles.previewTitle}>✨ Portfolio Updated</Text>
            <Text style={styles.previewCompany}>{message.data.company}</Text>
            <Text style={styles.previewPosition}>{message.data.position}</Text>
            <View style={styles.previewSkills}>
              {message.data.skills.map((skill, idx) => (
                <View key={idx} style={styles.previewSkillTag}>
                  <Text style={styles.previewSkillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      {isUser && (
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={16} color="#ffffff" />
        </View>
      )}
    </Animated.View>
  )
}

const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current
  const dot2 = useRef(new Animated.Value(0)).current
  const dot3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animate = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -8,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start()
    }

    animate(dot1, 0)
    animate(dot2, 200)
    animate(dot3, 400)
  }, [])

  return (
    <View style={styles.typingContainer}>
      <View style={styles.aiAvatar}>
        <Ionicons name="sparkles" size={16} color="#ec4899" />
      </View>
      <View style={styles.typingBubble}>
        <Animated.View style={[styles.typingDot, { transform: [{ translateY: dot1 }] }]} />
        <Animated.View style={[styles.typingDot, { transform: [{ translateY: dot2 }] }]} />
        <Animated.View style={[styles.typingDot, { transform: [{ translateY: dot3 }] }]} />
      </View>
    </View>
  )
}

export default function AIPortfolioChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm your AI portfolio assistant. Tell me about your work experience and I'll help you organize it. For example, you can say 'I worked at Foliospace from 2023 till date as a fullstack developer'",
      isUser: false,
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages, isTyping])

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true)

    setTimeout(() => {
      const responses = [
        {
          text: "Great! I've added that to your portfolio. Your experience at Foliospace has been recorded with all the skills you mentioned.",
          data: {
            company: "Foliospace",
            position: "Full Stack Developer",
            skills: ["UI/UX", "Mobile Dev", "Web Dev"],
          },
        },
        {
          text: "Perfect! I've updated your portfolio with this new experience. Would you like to add any specific projects or achievements?",
          data: null,
        },
        {
          text: "Excellent! I've saved that information. Your portfolio is looking great! Want to add more experiences or tell me about your education?",
          data: null,
        },
      ]

      const response = responses[Math.floor(Math.random() * responses.length)]

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: response.text,
          isUser: false,
          data: response.data,
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
      }

      setMessages((prev) => [...prev, userMessage])
      setMessage("")
      simulateAIResponse(message)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <View style={styles.headerContent}>
          <View style={styles.aiIconContainer}>
            <Ionicons name="sparkles" size={20} color="#ec4899" />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerStatus}>● Online</Text>
          </View>
        </View>
        <Pressable style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#111827" />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isUser={msg.isUser} />
        ))}
        {isTyping && <TypingIndicator />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Pressable style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color="#6b7280" />
        </Pressable>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#9ca3af"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={handleSend}
            style={[
              styles.sendButton,
              (!message.trim() || isTyping) && styles.sendButtonDisabled,
            ]}
            disabled={!message.trim() || isTyping}
          >
            <Ionicons name="send" size={20} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: 8,
  },
  aiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fce7f3",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  headerStatus: {
    fontSize: 12,
    color: "#10b981",
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  chatContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  aiMessageContainer: {
    justifyContent: "flex-start",
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fce7f3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ec4899",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 12,
  },
  aiBubble: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#ec4899",
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#374151",
  },
  userMessageText: {
    color: "#ffffff",
  },
  portfolioPreview: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fce7f3",
    borderRadius: 12,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ec4899",
    marginBottom: 8,
  },
  previewCompany: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  previewPosition: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  previewSkills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  previewSkillTag: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  previewSkillText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ec4899",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  typingBubble: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 16,
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#111827",
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ec4899",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
})