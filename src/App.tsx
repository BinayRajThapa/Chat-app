import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Home from './pages/Home'
import { useAuthStore } from './store/authStore'

function App() {
  const user = useAuthStore((state) => state.user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
