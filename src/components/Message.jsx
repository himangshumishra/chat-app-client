import { useAuth } from '../context/AuthContext';

const Message = ({ message }) => {
  const { currentUser } = useAuth();
  const isMyMessage = message.sender._id === currentUser.id;
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-sm ${
          isMyMessage 
            ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white' 
            : 'bg-slate-800 border border-slate-700 text-white'
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div className={`text-xs mt-1 text-right flex justify-end items-center ${
          isMyMessage ? 'text-slate-200/75' : 'text-slate-400'
        }`}>
          <span>{formatTime(message.createdAt)}</span>
          {isMyMessage && message.read && (
            <span className="ml-1 text-slate-200">✓</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;