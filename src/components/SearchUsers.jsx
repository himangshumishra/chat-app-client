import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { searchUsers } from '../utils/api';
import { useSocket } from '../context/SocketContext';

const SearchUsers = ({ onSelectUser }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isUserOnline } = useSocket();

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchUsers(query);
      } else if (query === '') {
        setUsers([]);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const fetchUsers = async (searchQuery) => {
    try {
      setLoading(true);
      setError('');
      const result = await searchUsers(searchQuery);
      setUsers(result);
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-2">
      <div className="px-4 mb-3">
        <input
          type="text"
          placeholder="Search by email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-500 transition-colors duration-200"
        />
      </div>

      {error && (
        <div className="px-4 text-rose-400 text-sm mb-2">{error}</div>
      )}

      <div className="divide-y divide-slate-800 max-h-[calc(100vh-190px)] overflow-y-auto scrollbar-thin scrollbar-thumb-rose-500/50 scrollbar-track-slate-900 hover:scrollbar-thumb-rose-500">
        {loading ? (
          <div className="flex justify-center p-4">
            <svg className="animate-spin h-6 w-6 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="px-4 py-3 hover:bg-slate-800/50 cursor-pointer transition-colors duration-150"
              onClick={() => onSelectUser(user)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-medium mr-3">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-slate-400">{user.email}</div>
                  </div>
                </div>
                <span className={`h-2 w-2 rounded-full ring-2 ring-slate-900 ${isUserOnline(user._id) ? 'bg-green-400' : 'bg-slate-500'
                  }`}></span>
              </div>
            </motion.div>
          ))
        ) : query.trim().length >= 2 ? (
          <div className="px-4 py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-400">No users found</p>
            <p className="mt-1 text-sm text-slate-500">Try a different search term</p>
          </div>
        ) : (
          <div className="px-4 py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-800/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-slate-400">Find someone to chat with</p>
            <p className="mt-1 text-sm text-slate-500">Search by email address</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;