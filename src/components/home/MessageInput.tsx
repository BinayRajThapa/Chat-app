import { useState } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useAuthStore } from '../../store/authStore'
import '../../styles/message.scss'

const MessageInput = () => {
  const [text, setText] = useState('')
  const sendMessage = useChatStore((state) => state.sendMessage)
  const user = useAuthStore((state) => state.user)

  const handleSend = () => {
    if (!text.trim() || !user) return
    sendMessage(text.trim(), user.username)
    setText('')
  }

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default MessageInput
