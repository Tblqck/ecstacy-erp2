import React, { useState } from 'react';
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
  Bell
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard', permission: 'all' },
    { path: '/products', icon: Package, label: 'Products', permission: 'inventory' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales', permission: 'sales' },
    { path: '/suppliers', icon: Truck, label: 'Suppliers', permission: 'suppliers' },
    { path: '/customers', icon: Users, label: 'Customers', permission: 'customers' },
    { path: '/purchase-orders', icon: FileText, label: 'Purchase Orders', permission: 'inventory' },
    { path: '/reports', icon: BarChart3, label: 'Reports', permission: 'reports' },
    { path: '/users', icon: UserCheck, label: 'Users', permission: 'admin' },
    { path: '/settings', icon: Settings, label: 'Settings', permission: 'all' }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black bg-opacity-90 backdrop-blur-sm transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600">
          <h1 className="text-xl font-bold text-black">PerfumeERP</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-black rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-50">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-300 hover:text-yellow-400 lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="ml-4 text-xl font-semibold text-white lg:ml-0">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-300 hover:text-yellow-400 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {user?.name?.charAt(0)}
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;