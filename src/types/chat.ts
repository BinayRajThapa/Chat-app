export interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: number;
  }
  
  export interface Conversation {
    id: string;
    participants: string[]; 
    messages: Message[];
  }
  