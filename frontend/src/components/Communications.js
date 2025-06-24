import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Search, 
  Plus,
  Users,
  Hash,
  Bell,
  Settings,
  Paperclip,
  Smile,
  Image,
  File,
  UserPlus,
  Star,
  Pin,
  Archive,
  Trash2,
  Edit,
  Circle,
  CheckCircle2
} from 'lucide-react';

const mockChannels = [
  { id: 1, name: 'general', type: 'channel', unread: 3, members: 25, description: 'General company discussions' },
  { id: 2, name: 'sales-team', type: 'channel', unread: 0, members: 8, description: 'Sales team coordination' },
  { id: 3, name: 'inventory-alerts', type: 'channel', unread: 12, members: 15, description: 'Automated inventory notifications' },
  { id: 4, name: 'customer-support', type: 'channel', unread: 5, members: 12, description: 'Customer service discussions' }
];

const mockGroups = [
  { id: 5, name: 'Management Team', type: 'group', unread: 2, members: 5, avatar: 'M' },
  { id: 6, name: 'Store Managers', type: 'group', unread: 0, members: 8, avatar: 'S' },
  { id: 7, name: 'Project Alpha', type: 'group', unread: 1, members: 6, avatar: 'P' }
];

const mockDirectMessages = [
  { id: 8, name: 'Sarah Johnson', type: 'dm', unread: 1, online: true, role: 'Sales Manager', avatar: 'SJ' },
  { id: 9, name: 'Michael Chen', type: 'dm', unread: 0, online: true, role: 'Inventory Lead', avatar: 'MC' },
  { id: 10, name: 'Emma Rodriguez', type: 'dm', unread: 0, online: false, role: 'Customer Support', avatar: 'ER' },
  { id: 11, name: 'David Kim', type: 'dm', unread: 3, online: true, role: 'Store Manager', avatar: 'DK' }
];

const mockMessages = [
  {
    id: 1,
    user: 'Sarah Johnson',
    avatar: 'SJ',
    message: "Good morning team! The new Chanel collection just arrived. Let's make sure we update the inventory ASAP.",
    timestamp: '09:30 AM',
    reactions: [{ emoji: '👍', count: 3 }, { emoji: '🔥', count: 1 }],
    files: []
  },
  {
    id: 2,
    user: 'Michael Chen',
    avatar: 'MC',
    message: "I've already started processing the shipment. Should have everything in the system by noon.",
    timestamp: '09:32 AM',
    reactions: [{ emoji: '✅', count: 2 }],
    files: []
  },
  {
    id: 3,
    user: 'You',
    avatar: 'YU',
    message: "Perfect! Also, can someone check if we need to reorder Tom Ford items? We had some low stock alerts yesterday.",
    timestamp: '09:35 AM',
    reactions: [],
    files: [{ name: 'inventory-report.pdf', size: '2.3 MB', type: 'pdf' }]
  },
  {
    id: 4,
    user: 'Emma Rodriguez',
    avatar: 'ER',
    message: "I'll handle the Tom Ford reorder. We're running low on Black Orchid and Oud Wood.",
    timestamp: '09:40 AM',
    reactions: [{ emoji: '👍', count: 1 }],
    files: []
  }
];

const ChannelList = ({ channels, groups, directMessages, activeChannel, setActiveChannel, searchTerm, setSearchTerm }) => {
  const filteredChannels = channels.filter(ch => 
    ch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredGroups = groups.filter(gr => 
    gr.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredDMs = directMessages.filter(dm => 
    dm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ChannelItem = ({ item, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
      }`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <div className="flex items-center">
          {item.type === 'channel' && <Hash size={16} className={isActive ? 'text-black' : 'text-gray-400'} />}
          {item.type === 'group' && (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isActive ? 'bg-black text-yellow-400' : 'bg-yellow-500 text-black'
            }`}>
              {item.avatar}
            </div>
          )}
          {item.type === 'dm' && (
            <div className="relative">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isActive ? 'bg-black text-yellow-400' : 'bg-gray-600 text-white'
              }`}>
                {item.avatar}
              </div>
              {item.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
              )}
            </div>
          )}
        </div>
        <div className="text-left flex-1">
          <p className={`font-medium text-sm ${isActive ? 'text-black' : 'text-white'}`}>
            {item.name}
          </p>
          {item.type === 'dm' && item.role && (
            <p className={`text-xs ${isActive ? 'text-black/70' : 'text-gray-400'}`}>
              {item.role}
            </p>
          )}
        </div>
      </div>
      {item.unread > 0 && (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
          isActive ? 'bg-black text-yellow-400' : 'bg-red-500 text-white'
        }`}>
          {item.unread}
        </div>
      )}
    </button>
  );

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Communications</h2>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Channel Lists */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Channels */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Channels</h3>
            <button className="p-1 hover:bg-gray-800 rounded transition-colors">
              <Plus size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="space-y-1">
            {filteredChannels.map(channel => (
              <ChannelItem
                key={channel.id}
                item={channel}
                isActive={activeChannel?.id === channel.id}
                onClick={() => setActiveChannel(channel)}
              />
            ))}
          </div>
        </div>

        {/* Groups */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Groups</h3>
            <button className="p-1 hover:bg-gray-800 rounded transition-colors">
              <Plus size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="space-y-1">
            {filteredGroups.map(group => (
              <ChannelItem
                key={group.id}
                item={group}
                isActive={activeChannel?.id === group.id}
                onClick={() => setActiveChannel(group)}
              />
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Direct Messages</h3>
            <button className="p-1 hover:bg-gray-800 rounded transition-colors">
              <Plus size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="space-y-1">
            {filteredDMs.map(dm => (
              <ChannelItem
                key={dm.id}
                item={dm}
                isActive={activeChannel?.id === dm.id}
                onClick={() => setActiveChannel(dm)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageItem = ({ message, isOwn = false }) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-6`}>
    <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-4xl`}>
      {!isOwn && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
          {message.avatar}
        </div>
      )}
      
      <div className={`${isOwn ? 'mr-3' : ''}`}>
        <div className={`flex items-center space-x-2 mb-2 ${isOwn ? 'justify-end' : ''}`}>
          <span className="text-white font-semibold text-sm">{message.user}</span>
          <span className="text-gray-400 text-xs">{message.timestamp}</span>
        </div>
        
        <div className={`p-4 rounded-2xl ${
          isOwn 
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' 
            : 'bg-gray-800 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{message.message}</p>
          
          {message.files && message.files.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.files.map((file, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                  isOwn ? 'bg-black/10' : 'bg-gray-700'
                }`}>
                  <File size={20} className={isOwn ? 'text-black' : 'text-gray-400'} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isOwn ? 'text-black' : 'text-white'}`}>{file.name}</p>
                    <p className={`text-xs ${isOwn ? 'text-black/70' : 'text-gray-400'}`}>{file.size}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            {message.reactions.map((reaction, index) => (
              <button key={index} className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded-full transition-colors">
                <span className="text-sm">{reaction.emoji}</span>
                <span className="text-xs text-gray-400">{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const ChatArea = ({ activeChannel, messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add message logic here
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  if (!activeChannel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
          <p className="text-gray-400">Choose a channel, group, or direct message to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {/* Chat Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {activeChannel.type === 'channel' && <Hash size={20} className="text-yellow-400" />}
              {activeChannel.type === 'group' && (
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                  {activeChannel.avatar}
                </div>
              )}
              {activeChannel.type === 'dm' && (
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                    {activeChannel.avatar}
                  </div>
                  {activeChannel.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{activeChannel.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                {activeChannel.type !== 'dm' && (
                  <span className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {activeChannel.members} members
                  </span>
                )}
                {activeChannel.type === 'dm' && activeChannel.role && (
                  <span>{activeChannel.role}</span>
                )}
                {activeChannel.description && (
                  <span>• {activeChannel.description}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {activeChannel.type === 'dm' && (
              <>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Phone size={20} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Video size={20} className="text-gray-400" />
                </button>
              </>
            )}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Search size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <MoreHorizontal size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <MessageItem 
            key={message.id} 
            message={message} 
            isOwn={message.user === 'You'} 
          />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
              SC
            </div>
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${activeChannel.name}`}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-24"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                  <Paperclip size={18} className="text-gray-400" />
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                  <Image size={18} className="text-gray-400" />
                </button>
                <button type="button" className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                  <Smile size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-2xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

const Communications = () => {
  const [activeChannel, setActiveChannel] = useState(mockChannels[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  return (
    <div className="h-[calc(100vh-120px)] flex bg-gray-950 rounded-2xl overflow-hidden border border-gray-800">
      <ChannelList
        channels={mockChannels}
        groups={mockGroups}
        directMessages={mockDirectMessages}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ChatArea
        activeChannel={activeChannel}
        messages={messages}
      />
    </div>
  );
};

export default Communications;