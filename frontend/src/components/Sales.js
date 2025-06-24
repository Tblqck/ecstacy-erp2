import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  ShoppingCart,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const OrderModal = ({ order, isOpen, onClose, onSave }) => {
  const { customers, products } = useInventory();
  const [formData, setFormData] = useState(order || {
    customerId: '',
    customerName: '',
    items: [{ productId: '', productName: '', quantity: 1, price: 0 }],
    shippingAddress: '',
    paymentMethod: 'Credit Card',
    status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === parseInt(formData.customerId));
    const total = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    onSave({
      ...formData,
      customerName: customer?.name || '',
      total: total,
      customerId: parseInt(formData.customerId)
    });
    onClose();
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: '', productName: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        newItems[index].productName = product.name;
        newItems[index].price = product.sellingPrice;
      }
    }
    
    setFormData({ ...formData, items: newItems });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {order ? 'Edit Order' : 'Create New Order'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Customer</label>
              <select
                value={formData.customerId}
                onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Shipping Address</label>
            <textarea
              value={formData.shippingAddress}
              onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="3"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-300">Order Items</label>
              <button
                type="button"
                onClick={addItem}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors"
              >
                Add Item
              </button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center mb-4 p-4 bg-gray-800 rounded-lg">
                <div className="col-span-5">
                  <select
                    value={item.productId}
                    onChange={(e) => updateItem(index, 'productId', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name} - ${product.sellingPrice}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Qty"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-green-400 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="text-right mt-4">
              <span className="text-lg font-semibold text-white">
                Total: ${formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
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
              {order ? 'Update' : 'Create'} Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Sales = () => {
  const { orders, addOrder, updateOrder, customers, products } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveOrder = (orderData) => {
    if (selectedOrder) {
      updateOrder({ ...orderData, id: selectedOrder.id });
    } else {
      addOrder(orderData);
    }
    setSelectedOrder(null);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'Shipped': return 'bg-blue-500';
      case 'Processing': return 'bg-yellow-500';
      case 'Pending': return 'bg-orange-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Sales & Orders</h1>
          <p className="text-gray-400">Manage your sales orders and track performance</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
          <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="text-blue-400" size={20} />
              <div>
                <p className="text-sm text-gray-400">Total Orders</p>
                <p className="text-xl font-bold text-white">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-green-400" size={20} />
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-yellow-400" size={20} />
              <div>
                <p className="text-sm text-gray-400">Avg Order</p>
                <p className="text-xl font-bold text-white">${avgOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={() => {
            setSelectedOrder(null);
            setModalOpen(true);
          }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Order</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{order.orderNumber}</div>
                      <div className="text-sm text-gray-400">{order.items.length} items</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{order.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{order.orderDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-400">${order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditOrder(order)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-400">No orders found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Order Modal */}
      <OrderModal
        order={selectedOrder}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOrder(null);
        }}
        onSave={handleSaveOrder}
      />
    </div>
  );
};

export default Sales;