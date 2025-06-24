import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  User,
  ShoppingBag,
  DollarSign,
  Calendar
} from 'lucide-react';

const CustomerModal = ({ customer, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(customer || {
    name: '',
    email: '',
    phone: '',
    address: '',
    customerType: 'Regular',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Customer Type</label>
              <select
                value={formData.customerType}
                onChange={(e) => setFormData({...formData, customerType: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="3"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all"
            >
              {customer ? 'Update' : 'Add'} Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Customers = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, orders } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCustomer = (customerData) => {
    if (selectedCustomer) {
      updateCustomer({ ...customerData, id: selectedCustomer.id });
    } else {
      addCustomer(customerData);
    }
    setSelectedCustomer(null);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(customerId);
    }
  };

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'VIP': return 'bg-purple-500 bg-opacity-20 text-purple-400';
      case 'Premium': return 'bg-yellow-500 bg-opacity-20 text-yellow-400';
      case 'Regular': return 'bg-blue-500 bg-opacity-20 text-blue-400';
      default: return 'bg-gray-500 bg-opacity-20 text-gray-400';
    }
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter(order => order.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="text-gray-400">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => {
            setSelectedCustomer(null);
            setModalOpen(true);
          }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <User className="text-blue-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-xl font-bold text-white">{customers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <User className="text-purple-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">VIP Customers</p>
              <p className="text-xl font-bold text-white">
                {customers.filter(c => c.customerType === 'VIP').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-2">
            <User className="text-yellow-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Premium</p>
              <p className="text-xl font-bold text-white">
                {customers.filter(c => c.customerType === 'Premium').length}
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
                {customers.filter(c => c.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const customerOrders = getCustomerOrders(customer.id);
          return (
            <div key={customer.id} className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                {/* Customer Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCustomerTypeColor(customer.customerType)}`}>
                        {customer.customerType}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    {customer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    {customer.phone}
                  </div>
                  <div className="flex items-start text-sm text-gray-300">
                    <MapPin size={16} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{customer.address}</span>
                  </div>
                </div>

                {/* Customer Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag size={16} className="text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Orders</p>
                      <p className="text-sm font-semibold text-white">{customer.totalOrders || customerOrders.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-green-400" />
                    <div>
                      <p className="text-xs text-gray-400">Total Spent</p>
                      <p className="text-sm font-semibold text-white">
                        ${customer.totalSpent ? customer.totalSpent.toFixed(2) : 
                          customerOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Order & Status */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    Last order: {customer.lastOrder || 'Never'}
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    customer.status === 'Active' 
                      ? 'bg-green-500 bg-opacity-20 text-green-400' 
                      : 'bg-red-500 bg-opacity-20 text-red-400'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-400">No customers found</p>
          <p className="text-gray-500">Try adjusting your search or add a new customer</p>
        </div>
      )}

      {/* Customer Modal */}
      <CustomerModal
        customer={selectedCustomer}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />
    </div>
  );
};

export default Customers;