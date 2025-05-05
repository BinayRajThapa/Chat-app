import { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useAuthStore } from '../../store/authStore'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import '../../styles/message.scss'

const ChatWindow = () => {
  const conversations = useChatStore((state) => state.conversations)
  const activeId = useChatStore((state) => state.activeConversationId)
  const load = useChatStore((state) => state.loadConversations)
  const user = useAuthStore((state) => state.user)
  const bottomRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find((c) => c.id === activeId)

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages])

  if (!activeConversation) {
    return <div className="chat-window">Select a chat to start messaging</div>
  }

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {activeConversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.content}
            isSender={msg.sender === user?.username}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatWindow
