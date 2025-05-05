import { useNavigate, Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { saveUser, getUsers, setCurrentUser } from '../utils/localStorage'
import { useAuthStore } from '../store/authStore'
import { User, validateUser } from '../types/user'

const Signup = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSignup = (
    username: string,
    password: string,
    email?: string,
    name?: string,
    confirmPassword?: string
  ) => {
    console.log('Sign Up:', { username, password, email, name, confirmPassword })

    if (!email || !name || !confirmPassword) {
      alert('All fields are required.')
      return
    }

    const users = getUsers()
    const userExists = users.some((u) => u.username === username)

    if (userExists) {
      alert('Username already exists!')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    const newUser: User = {
      username,
      password,
      email: email || '',
      name: name || ''
    }
    

    const validationError = validateUser(newUser)
    if (validationError) {
      alert(validationError)
      return
    }

    saveUser(newUser)
    setCurrentUser(newUser)
    login(newUser)
    navigate('/')
  }

  return (
    <>
      <AuthForm 
        title="Sign Up" 
        onSubmit={handleSignup} 
        isSignup={true} 
      />
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  )
}

export default Signup
