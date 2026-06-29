import { Navigate, Outlet, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { isAuthenticated } from "./auth.service"


type AuthStatus = "checking" | "authed" | "unauthed"

export default function ProtectedRoute() {
  const location = useLocation()
  const [status, setStatus] = useState<AuthStatus>("checking")

  useEffect(() => {
    let cancelled = false

    async function check() {
      try {
        const authenticateResponse = await isAuthenticated()
        if (cancelled) return
        setStatus((typeof authenticateResponse === 'object' && authenticateResponse.isValid) ? "authed" : "unauthed")
      } catch (error) {
        console.error("Error checking authentication:", error)
      }
    }

    check()

    return () => {
      cancelled = true
    }
  }, [location.pathname])

  if (status === "checking") return null

  if (status === "unauthed") {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <>

      <Outlet />
    </>
  )
}