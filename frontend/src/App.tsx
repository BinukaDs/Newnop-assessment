import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from "@/components/ui/sonner"
import { UserContext } from './context/user.context'
import { useState, useEffect } from 'react'
import { isAuthenticated } from './services/auth.service'
import ProtectedRoute from './services/protectedRoute'
function App() {
  const [user, setUser] = useState(null);




  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticateResponse = await isAuthenticated();
        if (authenticateResponse) {
          const user = authenticateResponse.user;
          localStorage.setItem("userId", user._id);
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/tasks/:taskId" element={<TaskDetail />} /> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
