import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: '',
    status: 'Available',
    avatar: ''
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Settings state
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: {
      sound: true,
      email: false
    }
  });
  
  // Avatar options
  const avatarOptions = [
    '👤', '😀', '😎', '🤓', '🦊', '🐱', '🐼', '🦄', '🦁', '🐯'
  ];
  
  const [selectedAvatar, setSelectedAvatar] = useState('👤');

  useEffect(() => {
    // You could fetch additional profile data here if needed
    if (currentUser) {
      setProfileData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSettingsChange = (e) => {
    const { name, checked, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : e.target.value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, you would make an API call here
      // const response = await axios.put('/api/profile', {
      //   ...profileData,
      //   avatar: selectedAvatar
      // });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Profile updated successfully!');
      
      // Update the profile data in context if needed
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, you would make an API call here
      // const response = await axios.put('/api/profile/password', {
      //   currentPassword: passwordData.currentPassword,
      //   newPassword: passwordData.newPassword
      // });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  
  const updateSettings = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, you would make an API call here
      // const response = await axios.put('/api/profile/settings', settings);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-block relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-fuchsia-600 rounded-full flex items-center justify-center text-4xl">
                {selectedAvatar}
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-500 mb-2">
              {currentUser?.name || 'User Profile'}
            </h1>
            <p className="text-slate-400">{currentUser?.email}</p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-slate-800 mb-8">
            <button 
              onClick={() => setActiveTab('account')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'account' 
                ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' 
                : 'text-slate-400'
              }`}
            >
              Account
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'security' 
                ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' 
                : 'text-slate-400'
              }`}
            >
              Security
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'settings' 
                ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' 
                : 'text-slate-400'
              }`}
            >
              Settings
            </button>
          </div>
          
          {/* Success and Error Messages */}
          {success && (
            <div className="mb-6 p-3 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-200 text-sm">
              {success}
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-3 bg-rose-900/50 border border-rose-700 rounded-lg text-rose-200 text-sm">
              {error}
            </div>
          )}
          
          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Avatar</label>
                <div className="flex flex-wrap gap-3">
                  {avatarOptions.map(avatar => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center ${
                        selectedAvatar === avatar 
                        ? 'bg-gradient-to-br from-rose-500 to-fuchsia-600 ring-2 ring-fuchsia-400' 
                        : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                  disabled
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={profileData.status}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Away">Away</option>
                  <option value="Do Not Disturb">Do Not Disturb</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  onClick={updateProfile}
                  disabled={loading}
                  className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-2 rounded-lg font-medium hover:shadow-lg disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </div>
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Change Password</h2>
              
              <div className="mb-6">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  onClick={updatePassword}
                  disabled={loading}
                  className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-2 rounded-lg font-medium hover:shadow-lg disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </motion.button>
              </div>
              
              <div className="mt-12 border-t border-slate-800 pt-6">
                <h2 className="text-xl font-semibold mb-6">Account Actions</h2>
                
                <div>
                  <motion.button
                    onClick={handleLogout}
                    className="bg-rose-900/30 border border-rose-800 hover:bg-rose-900/50 px-6 py-2 rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Preferences</h2>
              
              {/* <div className="mb-6">
                <label htmlFor="theme" className="block text-sm font-medium text-slate-300 mb-2">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={settings.theme}
                  onChange={handleSettingsChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System</option>
                </select>
              </div> */}
              
              <div className="mb-6">
                <span className="block text-sm font-medium text-slate-300 mb-3">
                  Notifications
                </span>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sound"
                      name="notifications.sound"
                      checked={settings.notifications.sound}
                      onChange={handleSettingsChange}
                      className="w-4 h-4 text-fuchsia-500 bg-slate-800 border-slate-700 rounded focus:ring-fuchsia-500"
                    />
                    <label htmlFor="sound" className="ml-2 text-sm text-slate-300">
                      Enable sound notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email"
                      name="notifications.email"
                      checked={settings.notifications.email}
                      onChange={handleSettingsChange}
                      className="w-4 h-4 text-fuchsia-500 bg-slate-800 border-slate-700 rounded focus:ring-fuchsia-500"
                    />
                    <label htmlFor="email" className="ml-2 text-sm text-slate-300">
                      Receive email notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  onClick={updateSettings}
                  disabled={loading}
                  className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-2 rounded-lg font-medium hover:shadow-lg disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;