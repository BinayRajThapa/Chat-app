import { useChatStore } from '../../store/chatStore'
import { useAuthStore } from '../../store/authStore'

const ChatList = () => {
  const conversations = useChatStore((state) => state.conversations)
  const activeId = useChatStore((state) => state.activeConversationId)
  const setActive = useChatStore((state) => state.setActiveConversation)
  const user = useAuthStore((state) => state.user)

  const otherParticipant = (participants: string[]) =>
    participants.find((p) => p !== user?.username) || 'User'

  return (
    <div className="chat-list">
      <h3>Chats</h3>
      <ul>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => setActive(conv.id)}
            className={conv.id === activeId ? 'active' : ''}
          >
            {otherParticipant(conv.participants)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList
