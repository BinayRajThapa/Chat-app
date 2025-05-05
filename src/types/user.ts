export interface User {
  username: string
  password: string
  name: string
  email: string
}

export const validateUser = (user: User) => {
  if (!user.name || !user.email || !user.username || !user.password) {
    return 'All fields are required'
  }

  if (!user.email.includes('@')) {
    return 'Email must be valid'
  }

  if (user.password.length < 6) {
    return 'Password must be at least 6 characters'
  }

  return null
}
