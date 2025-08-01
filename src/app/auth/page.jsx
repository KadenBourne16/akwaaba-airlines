"use client"

import { useRouter } from "next/navigation"
import AuthSystem from "./components/authpage"

export default function AuthPage() {
  const router = useRouter()

  const handleLogin = (userData, accountType) => {
    console.log(`${accountType} login successful:`, userData)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("accountType", accountType)

    if (accountType === "flight-service") {
      router.push("/staff-dashboard")
    } else {
      router.push("/")
    }
  }

  const handleSignUp = (userData) => {
    console.log("Client signup successful:", userData)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("accountType", "client")
    router.push("/")
  }

  return <AuthSystem onLogin={handleLogin} onSignUp={handleSignUp} />
}
