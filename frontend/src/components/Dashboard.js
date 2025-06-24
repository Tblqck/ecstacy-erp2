import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Plus
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp size={16} className="mr-1" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { dashboardData, products, orders, customers, suppliers, loading } = useInventory();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const lowStockProducts = products.filter(p => p.currentStock <= p.minStockLevel);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-6 text-black">
        <h1 className="text-3xl font-bold mb-2">Welcome to PerfumeERP</h1>
        <p className="text-lg opacity-90">Your comprehensive perfume retail management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          color="bg-blue-500"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          color="bg-green-500"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Customers"
          value={customers.length}
          icon={Users}
          color="bg-purple-500"
          trend="up"
          trendValue="+15%"
        />
        <StatCard
          title="Revenue"
          value={`$${dashboardData.totalRevenue?.toLocaleString() || '0'}`}
          icon={DollarSign}
          color="bg-yellow-500"
          trend="up"
          trendValue="+22%"
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center text-sm">
              <Eye size={16} className="mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{order.orderNumber}</p>
                  <p className="text-sm text-gray-400">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-400">${order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500 text-white' :
                    order.status === 'Shipped' ? 'bg-blue-500 text-white' :
                    order.status === 'Processing' ? 'bg-yellow-500 text-black' :
                    'bg-gray-500 text-white'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <AlertTriangle className="mr-2 text-red-400" size={20} />
              Low Stock Alerts
            </h3>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {lowStockProducts.length}
            </span>
          </div>
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-semibold">{product.currentStock} left</p>
                    <p className="text-xs text-gray-400">Min: {product.minStockLevel}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Package size={48} className="mx-auto mb-4 opacity-50" />
                <p>All products are well stocked!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Top Selling Products</h3>
          <button className="text-yellow-400 hover:text-yellow-300 flex items-center text-sm">
            <Plus size={16} className="mr-1" />
            View Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product, index) => (
            <div key={product.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">#{index + 1}</span>
              </div>
              <h4 className="font-medium text-white text-sm mb-1">{product.name}</h4>
              <p className="text-xs text-gray-400 mb-2">{product.brand}</p>
              <p className="text-green-400 font-semibold">${product.sellingPrice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl transition-all transform hover:scale-105">
          <Package size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">Add Product</span>
        </button>
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-xl transition-all transform hover:scale-105">
          <ShoppingCart size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">New Order</span>
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-xl transition-all transform hover:scale-105">
          <Users size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">Add Customer</span>
        </button>
        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black p-4 rounded-xl transition-all transform hover:scale-105">
          <TrendingUp size={24} className="mx-auto mb-2" />
          <span className="text-sm font-medium">View Reports</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;