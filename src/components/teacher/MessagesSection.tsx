import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Send, 
  Paperclip, 
  Smile,
  MoreVertical,
  Star,
  Clock,
  CheckCheck,
  Plus
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  studentName: string;
  studentAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const MessagesSection: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const quickTemplates = [
    "Thank you for your message! I'll get back to you shortly.",
    "Great progress in our last lesson! Keep up the excellent work.",
    "Please remember to bring your textbook to our next session.",
    "I've prepared some additional materials for you to practice.",
    "Let's schedule our next lesson. What time works best for you?"
  ];

  const conversations: Conversation[] = [
    {
      id: '1',
      studentName: 'Ahmed Hassan',
      studentAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Thank you for the lesson materials!',
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: '1',
          senderId: 'student',
          content: 'Hi Sarah! I wanted to ask about the homework you assigned.',
          timestamp: new Date(Date.now() - 3600000),
          isRead: true
        },
        {
          id: '2',
          senderId: 'teacher',
          content: 'Hello Ahmed! Of course, what specific questions do you have about the exercises?',
          timestamp: new Date(Date.now() - 3300000),
          isRead: true
        },
        {
          id: '3',
          senderId: 'student',
          content: 'I\'m having trouble with the conditional sentences in exercise 3.',
          timestamp: new Date(Date.now() - 3000000),
          isRead: true
        },
        {
          id: '4',
          senderId: 'teacher',
          content: 'I understand! Let me send you some additional materials that will help clarify conditional sentences. I\'ll also prepare some extra examples for our next lesson.',
          timestamp: new Date(Date.now() - 2700000),
          isRead: true
        },
        {
          id: '5',
          senderId: 'student',
          content: 'Thank you for the lesson materials!',
          timestamp: new Date(Date.now() - 300000),
          isRead: false
        }
      ]
    },
    {
      id: '2',
      studentName: 'Maria Garcia',
      studentAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Can we reschedule tomorrow\'s lesson?',
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 1,
      isOnline: false,
      messages: [
        {
          id: '1',
          senderId: 'student',
          content: 'Can we reschedule tomorrow\'s lesson?',
          timestamp: new Date(Date.now() - 1800000),
          isRead: false
        }
      ]
    },
    {
      id: '3',
      studentName: 'Lisa Park',
      studentAvatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Great lesson today! See you next week.',
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: '1',
          senderId: 'student',
          content: 'Great lesson today! See you next week.',
          timestamp: new Date(Date.now() - 7200000),
          isRead: true
        }
      ]
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // Add message logic here
      setMessageInput('');
    }
  };

  const handleTemplateSelect = (template: string) => {
    setMessageInput(template);
    setShowTemplates(false);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-1 text-sm bg-coral-500 text-white rounded-lg">
                All
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                Unread
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-coral-50 border-r-2 border-coral-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.studentAvatar}
                      alt={conversation.studentName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-medium truncate ${
                        conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {conversation.studentName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <div className="bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConv.studentAvatar}
                        alt={selectedConv.studentName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConv.studentName}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedConv.isOnline ? 'Online' : `Last seen ${formatTime(selectedConv.lastMessageTime)}`}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'teacher' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === 'teacher'
                          ? 'bg-coral-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.senderId === 'teacher' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.senderId === 'teacher' && (
                          <CheckCheck className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Templates */}
              {showTemplates && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Templates</h4>
                  <div className="space-y-2">
                    {quickTemplates.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => handleTemplateSelect(template)}
                        className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                {/* File Upload Progress */}
                {uploadingFile && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {uploadingFile.type.startsWith('image/') ? (
                          <ImageIcon className="h-4 w-4 text-blue-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="text-sm font-medium text-blue-900">{uploadingFile.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setUploadingFile(null);
                          setUploadProgress(0);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">{uploadProgress}% uploaded</p>
                  </div>
                )}

                <div className="flex items-end space-x-3">
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
                    >
                    <Paperclip className="h-5 w-5" />
                    </label>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div
                      className={`absolute inset-0 border-2 border-dashed rounded-lg transition-colors ${
                        dragOver ? 'border-coral-500 bg-coral-50' : 'border-transparent'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      {dragOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-coral-50 rounded-lg">
                          <div className="text-center">
                            <Upload className="h-6 w-6 text-coral-500 mx-auto mb-1" />
                            <p className="text-sm text-coral-600">Drop file to upload</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder={`Message ${selectedConv.studentName}...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 resize-none"
                      rows={1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>

                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>

                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                    <Smile className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-2 rounded-full transition-colors ${
                      messageInput.trim()
                        ? 'bg-coral-500 text-white hover:bg-coral-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;