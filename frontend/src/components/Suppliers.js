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
  Star,
  Truck,
  DollarSign
} from 'lucide-react';

const SupplierModal = ({ supplier, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(supplier || {
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    paymentTerms: 'Net 30',
    brands: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      brands: formData.brands.split(',').map(brand => brand.trim()).filter(brand => brand)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {supplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Supplier Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contact Person</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Payment Terms</label>
              <select
                value={formData.paymentTerms}
                onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
                <option value="COD">COD</option>
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Brands (comma separated)</label>
            <input
              type="text"
              value={Array.isArray(formData.brands) ? formData.brands.join(', ') : formData.brands}
              onChange={(e) => setFormData({...formData, brands: e.target.value})}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., Chanel, Dior, Tom Ford"
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
              {supplier ? 'Update' : 'Add'} Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Suppliers = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.brands.some(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSaveSupplier = (supplierData) => {
    if (selectedSupplier) {
      updateSupplier({ ...supplierData, id: selectedSupplier.id });
    } else {
      addSupplier(supplierData);
    }
    setSelectedSupplier(null);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  const handleDeleteSupplier = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      deleteSupplier(supplierId);
    }
  };

  const getRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Suppliers</h1>
          <p className="text-gray-400">Manage your supplier relationships</p>
        </div>
        <button
          onClick={() => {
            setSelectedSupplier(null);
            setModalOpen(true);
          }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Supplier</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              {/* Supplier Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{supplier.name}</h3>
                  <p className="text-sm text-gray-400">{supplier.contactPerson}</p>
                  <div className="flex items-center mt-1">
                    {getRatingStars(supplier.rating)}
                    <span className="ml-2 text-sm text-gray-400">({supplier.rating})</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditSupplier(supplier)}
                    className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
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
                  {supplier.email}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-start text-sm text-gray-300">
                  <MapPin size={16} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{supplier.address}</span>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Brands:</p>
                <div className="flex flex-wrap gap-2">
                  {supplier.brands.slice(0, 3).map((brand, index) => (
                    <span key={index} className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-400 text-xs rounded-full">
                      {brand}
                    </span>
                  ))}
                  {supplier.brands.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500 bg-opacity-20 text-gray-400 text-xs rounded-full">
                      +{supplier.brands.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <Truck size={16} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Orders</p>
                    <p className="text-sm font-semibold text-white">{supplier.totalOrders}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Total Value</p>
                    <p className="text-sm font-semibold text-white">${supplier.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Status & Payment Terms */}
              <div className="flex justify-between items-center mt-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  supplier.status === 'Active' 
                    ? 'bg-green-500 bg-opacity-20 text-green-400' 
                    : 'bg-red-500 bg-opacity-20 text-red-400'
                }`}>
                  {supplier.status}
                </span>
                <span className="text-xs text-gray-400">
                  {supplier.paymentTerms}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <Truck size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-400">No suppliers found</p>
          <p className="text-gray-500">Try adjusting your search or add a new supplier</p>
        </div>
      )}

      {/* Supplier Modal */}
      <SupplierModal
        supplier={selectedSupplier}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedSupplier(null);
        }}
        onSave={handleSaveSupplier}
      />
    </div>
  );
};

export default Suppliers;