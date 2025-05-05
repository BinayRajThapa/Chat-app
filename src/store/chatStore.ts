import { create } from 'zustand'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: number
}

interface Conversation {
  id: string
  participants: string[]
  messages: Message[]
}

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  loadConversations: () => void
  setActiveConversation: (id: string) => void
  addMessage: (message: Message) => void
  sendMessage: (text: string, sender: string) => void
  createConversation: (user1: string, user2: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,

  loadConversations: () => {
    const savedConversations = localStorage.getItem('conversations')
    if (savedConversations) {
      set({ conversations: JSON.parse(savedConversations) })
    }
  },

  setActiveConversation: (id) => {
    set({ activeConversationId: id })
  },

  addMessage: (message) => {
    set((state) => {
      const updatedConversations = state.conversations.map((conv) =>
        conv.id === state.activeConversationId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      )
      localStorage.setItem('conversations', JSON.stringify(updatedConversations))
      return { conversations: updatedConversations }
    })
  },

  sendMessage: (text, sender) => {
    const message = {
      id: `${Date.now()}`,
      sender,
      content: text,
      timestamp: Date.now(),
    }

    set((state) => {
      const updatedConversations = state.conversations.map((conv) =>
        conv.id === state.activeConversationId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      )
      localStorage.setItem('conversations', JSON.stringify(updatedConversations))
      return { conversations: updatedConversations }
    })
  },

  createConversation: (user1, user2) => {
    set((state) => {
      const newConversation = {
        id: `${user1}-${user2}`,
        participants: [user1, user2],
        messages: [],
      }
      const updatedConversations = [...state.conversations, newConversation]
      localStorage.setItem('conversations', JSON.stringify(updatedConversations))
      return { conversations: updatedConversations }
    })
  }
}))
