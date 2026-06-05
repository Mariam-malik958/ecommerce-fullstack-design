import React, { useState } from 'react';
import { Send, Search, Plus, Smile, Phone, Video, Info, MoreVertical } from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Customer Support',
      avatar: '💬',
      lastMessage: 'Your order has been confirmed',
      time: '2 mins ago',
      unread: 2,
      messages: [
        { sender: 'support', text: 'Hello! How can we help?', time: '10:30 AM' },
        { sender: 'you', text: 'Hi, I have a question about my order', time: '10:32 AM' },
        { sender: 'support', text: 'Your order has been confirmed', time: '10:35 AM' },
      ],
    },
    {
      id: 2,
      name: 'Delivery Partner',
      avatar: '🚚',
      lastMessage: 'On the way to your location',
      time: '15 mins ago',
      unread: 0,
      messages: [
        { sender: 'support', text: 'Your package is ready for delivery', time: '9:00 AM' },
        { sender: 'support', text: 'On the way to your location', time: '9:45 AM' },
      ],
    },
    {
      id: 3,
      name: 'Sales Team',
      avatar: '🛍️',
      lastMessage: 'Check out our new collection!',
      time: '1 hour ago',
      unread: 1,
      messages: [
        { sender: 'support', text: 'Check out our new collection!', time: '8:30 AM' },
        { sender: 'you', text: 'Thanks for the update', time: '8:35 AM' },
      ],
    },
  ]);

  const current = chats[selectedChat];

  const handleSendMessage = () => {
    if (message.trim()) {
      const updatedChats = [...chats];
      updatedChats[selectedChat].messages.push({
        sender: 'you',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      // Update last message and time dynamically
      updatedChats[selectedChat].lastMessage = message;
      updatedChats[selectedChat].time = 'Just now';
      setChats(updatedChats);
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Chats</h2>
          <button style={styles.newChatBtn} title="New Chat">
            <Plus size={18} color="#4f46e5" />
          </button>
        </div>

        <div style={styles.searchContainer}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search conversations..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.chatsList}>
          {chats.map((chat, idx) => {
            const isSelected = selectedChat === idx;
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(idx)}
                style={{
                  ...styles.chatItem,
                  background: isSelected ? '#f1f5f9' : 'transparent',
                }}
                onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'transparent')}
              >
                <div style={styles.chatAvatar}>{chat.avatar}</div>
                <div style={styles.chatDetails}>
                  <h4 style={styles.chatName}>{chat.name}</h4>
                  <p style={styles.chatPreview}>{chat.lastMessage}</p>
                </div>
                <div style={styles.chatMeta}>
                  <p style={styles.chatTime}>{chat.time}</p>
                  {chat.unread > 0 && (
                    <div style={styles.unreadBadge}>{chat.unread}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        {/* Header */}
        <div style={styles.chatHeader}>
          <div style={styles.headerInfo}>
            <div style={styles.largeAvatar}>{current.avatar}</div>
            <div>
              <h3 style={styles.headerName}>{current.name}</h3>
              <div style={styles.statusWrapper}>
                <span style={styles.statusDot}></span>
                <p style={styles.headerStatus}>Online</p>
              </div>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button 
              style={styles.actionBtn} 
              title="Voice Call"
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
            >
              <Phone size={18} />
            </button>
            <button 
              style={styles.actionBtn} 
              title="Video Call"
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
            >
              <Video size={18} />
            </button>
            <button 
              style={styles.actionBtn} 
              title="Info"
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
            >
              <Info size={18} />
            </button>
            <button 
              style={styles.actionBtn} 
              title="More"
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div style={styles.messagesContainer}>
          {current.messages.map((msg, idx) => {
            const isYou = msg.sender === 'you';
            return (
              <div
                key={idx}
                style={{
                  ...styles.messageWrapper,
                  justifyContent: isYou ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    background: isYou ? '#4f46e5' : '#ffffff',
                    color: isYou ? '#ffffff' : '#1e293b',
                    borderRadius: isYou ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    border: isYou ? 'none' : '1px solid #e2e8f0',
                  }}
                >
                  <p style={styles.messageText}>{msg.text}</p>
                  <p
                    style={{
                      ...styles.messageTime,
                      color: isYou ? 'rgba(255,255,255,0.75)' : '#94a3b8',
                    }}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <div style={styles.inputContainer}>
            <button style={styles.iconBtn} title="Add Emoji">
              <Smile size={20} color="#64748b" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              style={styles.messageInput}
            />
            <button 
              onClick={handleSendMessage} 
              style={{
                ...styles.sendBtn,
                opacity: message.trim() ? 1 : 0.6,
                cursor: message.trim() ? 'pointer' : 'not-allowed',
                background: message.trim() ? '#4f46e5' : '#cbd5e1'
              }}
              disabled={!message.trim()}
            >
              <Send size={15} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  sidebar: {
    width: '340px',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e2e8f0',
  },
  sidebarHeader: {
    padding: '24px 24px 16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarTitle: {
    color: '#0f172a',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.5px',
  },
  newChatBtn: {
    background: '#f0fdf4', // Soft green or light indigo shade
    background: '#eef2ff',
    border: 'none',
    borderRadius: '10px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: '#f8fafc',
    margin: '0 24px 20px 24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: '#0f172a',
    fontSize: '14px',
    outline: 'none',
    flex: '1',
  },
  chatsList: {
    flex: '1',
    overflowY: 'auto',
    padding: '0 12px',
  },
  chatItem: {
    display: 'flex',
    gap: '14px',
    padding: '12px',
    cursor: 'pointer',
    borderRadius: '12px',
    marginBottom: '6px',
    transition: 'all 0.2s ease',
  },
  chatAvatar: {
    fontSize: '20px',
    width: '46px',
    height: '46px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: '#f1f5f9',
    borderRadius: '50%',
  },
  chatDetails: {
    flex: '1',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  chatName: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a',
  },
  chatPreview: {
    margin: '0',
    fontSize: '13px',
    color: '#64748b',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  chatMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '6px',
  },
  chatTime: {
    margin: '0',
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
  },
  unreadBadge: {
    background: '#ef4444',
    color: 'white',
    borderRadius: '12px',
    padding: '0 6px',
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '600',
  },
  chatArea: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    background: '#f8fafc',
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 28px',
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  largeAvatar: {
    fontSize: '22px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f1f5f9',
    borderRadius: '50%',
  },
  headerName: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '4px',
  },
  statusDot: {
    width: '7px',
    height: '7px',
    background: '#22c55e',
    borderRadius: '50%',
  },
  headerStatus: {
    margin: '0',
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    background: 'transparent',
    border: 'none',
    borderRadius: '10px',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#64748b',
    transition: 'all 0.2s ease',
  },
  messagesContainer: {
    flex: '1',
    overflowY: 'auto',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  messageWrapper: {
    display: 'flex',
    marginBottom: '4px',
  },
  messageBubble: {
    maxWidth: '60%',
    padding: '12px 16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  messageText: {
    margin: '0 0 6px 0',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  messageTime: {
    margin: '0',
    fontSize: '10px',
    textAlign: 'right',
    fontWeight: '500',
  },
  inputArea: {
    padding: '16px 28px 24px 28px',
    background: '#ffffff',
    borderTop: '1px solid #e2e8f0',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: '#f8fafc',
    borderRadius: '14px',
    padding: '10px 16px',
    border: '1px solid #e2e8f0',
  },
  messageInput: {
    flex: '1',
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#0f172a',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    transition: 'color 0.2s',
    ':hover': {
      color: '#0f172a'
    }
  },
  sendBtn: {
    border: 'none',
    borderRadius: '10px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
};