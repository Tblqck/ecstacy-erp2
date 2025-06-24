import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  AlertTriangle,
  Package,
  X
} from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    brand: '',
    sku: '',
    fragranceType: 'EDT',
    size: '',
    category: 'Designer',
    costPrice: '',
    sellingPrice: '',
    currentStock: '',
    minStockLevel: '',
    supplierId: '',
    description: ''
  });

  const { suppliers } = useInventory();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      currentStock: parseInt(formData.currentStock),
      minStockLevel: parseInt(formData.minStockLevel),
      supplierId: parseInt(formData.supplierId)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fragrance Type</label>
              <select
                value={formData.fragranceType}
                onChange={(e) => setFormData({...formData, fragranceType: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="EDT">EDT</option>
                <option value="EDP">EDP</option>
                <option value="Parfum">Parfum</option>
                <option value="EDC">EDC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="e.g., 100ml"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Luxury">Luxury</option>
                <option value="Designer">Designer</option>
                <option value="Niche">Niche</option>
                <option value="Celebrity">Celebrity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cost Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Selling Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Stock</label>
              <input
                type="number"
                value={formData.currentStock}
                onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Stock Level</label>
              <input
                type="number"
                value={formData.minStockLevel}
                onChange={(e) => setFormData({...formData, minStockLevel: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Supplier</label>
              <select
                value={formData.supplierId}
                onChange={(e) => setFormData({...formData, supplierId: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="3"
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
              {product ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct, suppliers } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      updateProduct({ ...productData, id: selectedProduct.id });
    } else {
      addProduct(productData);
    }
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const getStockStatus = (product) => {
    if (product.currentStock <= product.minStockLevel) {
      return 'Low Stock';
    } else if (product.currentStock <= product.minStockLevel * 2) {
      return 'Medium';
    }
    return 'Good';
  };

  const getStockColor = (product) => {
    if (product.currentStock <= product.minStockLevel) {
      return 'text-red-400';
    } else if (product.currentStock <= product.minStockLevel * 2) {
      return 'text-yellow-400';
    }
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400">Manage your perfume inventory</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setModalOpen(true);
          }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Categories</option>
            <option value="Luxury">Luxury</option>
            <option value="Designer">Designer</option>
            <option value="Niche">Niche</option>
            <option value="Celebrity">Celebrity</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              {/* Product Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.brand}</p>
                  <p className="text-xs text-gray-500">{product.sku}</p>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white">{product.fragranceType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white">{product.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{product.category}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Package size={16} className={getStockColor(product)} />
                  <span className={`text-sm font-medium ${getStockColor(product)}`}>
                    {product.currentStock} in stock
                  </span>
                </div>
                {product.currentStock <= product.minStockLevel && (
                  <AlertTriangle size={16} className="text-red-400" />
                )}
              </div>

              {/* Pricing */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Cost: ${product.costPrice}</p>
                  <p className="text-lg font-semibold text-green-400">${product.sellingPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Profit</p>
                  <p className="text-sm font-semibold text-yellow-400">
                    ${(product.sellingPrice - product.costPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-400">No products found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default Products;