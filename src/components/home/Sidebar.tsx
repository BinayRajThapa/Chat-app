import React from 'react'
import '../../styles/home.scss'

type SidebarProps = {
  username: string
  onLogout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ username, onLogout }) => {
  return (
    <div className="sidebar">
      <div>
        <h2>💬 Chat App</h2>
        <p>Welcome, <strong>{username}</strong></p>
      </div>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </div>
  )
}

export default Sidebar
