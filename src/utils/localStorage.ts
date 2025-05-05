import { User } from '../types/user'

const USERS_KEY = 'chat-users'
const CURRENT_USER_KEY = 'chat-current-user'

export const saveUser = (user: User) => {
  const users = getUsers()
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
}

export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : []
}

export const setCurrentUser = (user: User) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY)
  return data ? JSON.parse(data) : null
}

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}
