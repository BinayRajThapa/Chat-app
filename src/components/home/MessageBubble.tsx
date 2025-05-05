import "../../styles/message.scss"


interface MessageBubbleProps {
  text: string
  isSender: boolean
}

const MessageBubble = ({ text, isSender }: MessageBubbleProps) => {
  return (
    <div className={`message-bubble ${isSender ? 'sent' : 'received'}`}>
      {text}
    </div>
  )
}

export default MessageBubble
