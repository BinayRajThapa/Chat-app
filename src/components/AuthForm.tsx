import { useState, FormEvent } from 'react'
import './AuthForm.scss'

interface AuthFormProps {
  title: string
  onSubmit: (
    username: string,
    password: string,
    email?: string,
    name?: string,
    confirmPassword?: string
  ) => void
  isSignup?: boolean
}

const AuthForm = ({ title, onSubmit, isSignup }: AuthFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !password.trim() || (isSignup && (!name.trim() || !email.trim() || !confirmPassword.trim()))) {
      alert('Please fill in all fields.')
      return
    }

    if (isSignup && password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    if (isSignup && !email.includes('@')) {
      alert('Please enter a valid email address.')
      return
    }

    onSubmit(username, password, email, name, confirmPassword)
  }

  return (
    <div className="page-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{title}</h2>

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button type="submit">{title}</button>
      </form>
    </div>
  )
}

export default AuthForm
