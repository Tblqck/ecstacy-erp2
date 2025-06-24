import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  UserCheck, 
  LogOut,
  Menu,
  X,
  Bell,
  MessageCircle,
  Search,
  Sun,
  Moon
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard', permission: 'all', color: 'hover:text-blue-400' },
    { path: '/products', icon: Package, label: 'Products', permission: 'inventory', color: 'hover:text-green-400' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales', permission: 'sales', color: 'hover:text-purple-400' },
    { path: '/suppliers', icon: Truck, label: 'Suppliers', permission: 'suppliers', color: 'hover:text-orange-400' },
    { path: '/customers', icon: Users, label: 'Customers', permission: 'customers', color: 'hover:text-pink-400' },
    { path: '/purchase-orders', icon: FileText, label: 'Purchase Orders', permission: 'inventory', color: 'hover:text-indigo-400' },
    { path: '/communications', icon: MessageCircle, label: 'Communications', permission: 'all', color: 'hover:text-cyan-400' },
    { path: '/reports', icon: BarChart3, label: 'Reports', permission: 'reports', color: 'hover:text-red-400' },
    { path: '/users', icon: UserCheck, label: 'Users', permission: 'admin', color: 'hover:text-emerald-400' },
    { path: '/settings', icon: Settings, label: 'Settings', permission: 'all', color: 'hover:text-gray-400' }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Enhanced Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-black/95 backdrop-blur-xl border-r border-gray-800/50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}>
        
        {/* Enhanced Logo */}
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="relative z-10 flex items-center space-x-3">
            <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-black">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">PerfumeERP</h1>
              <p className="text-black/70 text-xs">Management System</p>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-400/25' 
                    : `text-gray-300 hover:bg-gray-800/50 ${item.color}`
                }`}
              >
                {/* Background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isActive ? 'opacity-100' : ''}`}></div>
                
                {/* Icon with enhanced styling */}
                <div className="relative z-10 flex items-center space-x-3 flex-1">
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-black/10' : 'group-hover:bg-gray-700/50'
                  }`}>
                    <Icon size={20} className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Enhanced User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm">
          <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700/50">
            <div className="flex items-center mb-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold text-lg">
                  {user?.name?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-yellow-400">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
            >
              <LogOut size={16} className="mr-2 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <header className="bg-black/80 backdrop-blur-xl border-b border-gray-800/50 z-10 shadow-lg">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-300 hover:text-yellow-400 lg:hidden rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold text-white">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-400">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Center - Search (Desktop) */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all backdrop-blur-sm"
                />
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-300 hover:text-yellow-400 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-300 hover:text-yellow-400 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group">
                <Bell size={20} className="group-hover:animate-pulse" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Communications Quick Access */}
              <Link 
                to="/communications"
                className="p-2 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              >
                <MessageCircle size={20} />
              </Link>
              
              {/* User Avatar */}
              <div className="flex items-center space-x-2 pl-2">
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold text-sm">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>
                <span className="text-sm text-gray-300 hidden sm:block font-medium">{user?.name}</span>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all backdrop-blur-sm"
              />
            </div>
          </div>
        </header>

        {/* Page Content with Enhanced Container */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 lg:px-6 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Enhanced Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800/50 z-30">
        <div className="flex items-center justify-around py-2">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-yellow-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;