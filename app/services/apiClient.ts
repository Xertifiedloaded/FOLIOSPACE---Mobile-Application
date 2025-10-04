import AsyncStorage from "@react-native-async-storage/async-storage"

const BASE_URL = "https://foliospace.org.ng/api"

async function request(
  endpoint: string,
  options: RequestInit = {},
  auth: boolean = true
) {
  let headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  }

  // Attach token if available
  if (auth) {
    const token = await AsyncStorage.getItem("authToken")
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json().catch(() => ({}))

    console.log("✅ API Response:", {
      status: response.status,
      url: endpoint,
    })

    if (!response.ok) {
      console.error("❌ API Error:", {
        status: response.status,
        url: endpoint,
        data,
      })

      if (response.status === 401) {
        await AsyncStorage.removeItem("authToken")
        console.error("Unauthorized - Clearing token")
      }

      throw { status: response.status, data }
    }

    return data
  } catch (error: any) {
    console.error("❌ Fetch Error:", error.message || error)
    throw error
  }
}

// ---------------------- Payload Interfaces ----------------------
interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  email: string
  password: string
  name: string
  [key: string]: any
}

interface ForgotPasswordPayload {
  email: string
}

interface VerifyOtpPayload {
  email: string
  otp: string
}

interface ResetPasswordPayload {
  email: string
  otp: string
  newPassword: string
}

// ---------------------- API Service ----------------------
const apiService = {
  getProjects: () => request("/projects", { method: "GET" }),
  getPosts: () => request("/posts", { method: "GET" }),
  getTestimonial: () => request("/portfolio/users", { method: "GET" }),

  login: async (payload: LoginPayload) => {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }, false)

    // if (data.token) {
    //   await AsyncStorage.setItem("authToken", data.token)
    // }
    return data
  },

  register: async (payload: RegisterPayload) => {
    const data = await request("/auth/create", {
      method: "POST",
      body: JSON.stringify(payload),
    }, false)

    // if (data.token) {
    //   await AsyncStorage.setItem("authToken", data.token)
    // }
    return data
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken")
  },

  requestPasswordReset: (payload: ForgotPasswordPayload) =>
    request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }, false),

  verifyOtp: (payload: VerifyOtpPayload) =>
    request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }, false),

  resetPassword: (payload: ResetPasswordPayload) =>
    request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }, false),
}

export default apiService
