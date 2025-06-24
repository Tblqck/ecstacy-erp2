import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Plus, Search, Edit, Trash2, UserCheck, Shield, User, Calendar } from 'lucide-react';

const Users = () => {
  const { users } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-500 bg-opacity-20 text-red-400';
      case 'Manager': return 'bg-yellow-500 bg-opacity-20 text-yellow-400';
      case 'Staff': return 'bg-blue-500 bg-opacity-20 text-blue-400';
      default: return 'bg-gray-500 bg-opacity-20 text-gray-400';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return Shield;
      case 'Manager': return UserCheck;
      case 'Staff': return User;
      default: return User;
    }
  };

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400">Manage system users and permissions</p>
        </div>
        <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center space-x-2">
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <User className="text-blue-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <Shield className="text-red-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Admins</p>
              <p className="text-xl font-bold text-white">
                {users.filter(u => u.role === 'Admin').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <UserCheck className="text-yellow-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Managers</p>
              <p className="text-xl font-bold text-white">
                {users.filter(u => u.role === 'Manager').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <User className="text-green-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-xl font-bold text-white">
                {users.filter(u => u.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const RoleIcon = getRoleIcon(user.role);
          return (
            <div key={user.id} className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Role & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <RoleIcon size={16} className="text-gray-400" />
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-500 bg-opacity-20 text-green-400' 
                      : 'bg-red-500 bg-opacity-20 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </div>

                {/* Permissions */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.includes('all') ? (
                      <span className="px-2 py-1 bg-red-500 bg-opacity-20 text-red-400 text-xs rounded-full">
                        All Access
                      </span>
                    ) : (
                      user.permissions.slice(0, 3).map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-400 text-xs rounded-full capitalize">
                          {permission}
                        </span>
                      ))
                    )}
                    {!user.permissions.includes('all') && user.permissions.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500 bg-opacity-20 text-gray-400 text-xs rounded-full">
                        +{user.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Last Login */}
                <div className="flex items-center text-xs text-gray-400 pt-4 border-t border-gray-700">
                  <Calendar size={14} className="mr-1" />
                  Last login: {formatLastLogin(user.lastLogin)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-400">No users found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Users;