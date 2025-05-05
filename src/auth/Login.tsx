import { useNavigate, Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { getUsers, setCurrentUser } from '../utils/localStorage'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleLogin = (username: string, password: string) => {
    console.log('Attempting login with:', { username, password })

    const users = getUsers()
    console.log('Available users:', users)

    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    )

    console.log('Matched user:', matchedUser)

    if (!matchedUser) {
      alert('Invalid username or password!')
      return
    }

    setCurrentUser(matchedUser)
    login(matchedUser)
    navigate('/')
  }

  return (
    <div className="page-wrapper">
      <AuthForm title="Login" onSubmit={handleLogin} />
      <p className="auth-link">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default Login
