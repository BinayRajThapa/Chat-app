import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useChatStore } from '../store/chatStore'
import Sidebar from '../components/home/Sidebar'
import ChatList from '../components/home/ChatList'
import ChatWindow from '../components/home/ChatWindow'
import '../styles/home.scss'

const Home = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const loadConversations = useChatStore((state) => state.loadConversations)
  const createConversation = useChatStore((state) => state.createConversation)

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  useEffect(() => {
    loadConversations()

    if (user) {
      const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]')
      if (savedConversations.length === 0) {
        createConversation(user.username, 'User2') 
      }
    }
  }, [user, loadConversations, createConversation])

  if (!user) return <p className="home-loading">Loading...</p>

  return (
    <div className="home-container">
      <Sidebar username={user.username} onLogout={handleLogout} />
      <ChatList />
      <ChatWindow />
    </div>
  )
}

export default Home
