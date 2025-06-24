import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const ReportCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-400 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <div className="text-right">
          <div className="flex items-center text-green-400">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        </div>
      )}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const Reports = () => {
  const { products, orders, customers, suppliers, dashboardData } = useInventory();
  const [dateRange, setDateRange] = useState('thisMonth');
  const [reportType, setReportType] = useState('overview');

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const topProducts = products.slice(0, 5);
  const lowStockProducts = products.filter(p => p.currentStock <= p.minStockLevel);

  // Sales by month (mock data for demo)
  const salesData = [
    { month: 'Jan', sales: 12500, orders: 45 },
    { month: 'Feb', sales: 15200, orders: 52 },
    { month: 'Mar', sales: 18800, orders: 67 },
    { month: 'Apr', sales: 22100, orders: 74 },
    { month: 'May', sales: 25600, orders: 89 },
    { month: 'Jun', sales: 28900, orders: 95 }
  ];

  const customersByType = {
    VIP: customers.filter(c => c.customerType === 'VIP').length,
    Premium: customers.filter(c => c.customerType === 'Premium').length,
    Regular: customers.filter(c => c.customerType === 'Regular').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400">Business insights and performance metrics</p>
        </div>
        
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
          
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="Across all sales"
          icon={DollarSign}
          color="bg-green-500"
          trend="+15.3%"
        />
        <ReportCard
          title="Total Orders"
          value={orders.length}
          subtitle={`Avg: $${avgOrderValue.toFixed(2)}`}
          icon={BarChart3}
          color="bg-blue-500"
          trend="+8.2%"
        />
        <ReportCard
          title="Active Customers"
          value={customers.filter(c => c.status === 'Active').length}
          subtitle={`Total: ${customers.length}`}
          icon={Users}
          color="bg-purple-500"
          trend="+12.1%"
        />
        <ReportCard
          title="Products in Stock"
          value={products.length - lowStockProducts.length}
          subtitle={`${lowStockProducts.length} low stock`}
          icon={Package}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Sales Trend</h3>
            <div className="flex items-center text-green-400">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm">+18.5%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 w-8">{data.month}</span>
                  <div className="flex-1">
                    <div className="bg-gray-700 rounded-full h-3 w-32">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.sales / 30000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${data.sales.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{data.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Distribution */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">Customer Distribution</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">VIP Customers</span>
              </div>
              <div className="text-right">
                <span className="text-white font-semibold">{customersByType.VIP}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {((customersByType.VIP / customers.length) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Premium</span>
              </div>
              <div className="text-right">
                <span className="text-white font-semibold">{customersByType.Premium}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {((customersByType.Premium / customers.length) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Regular</span>
              </div>
              <div className="text-right">
                <span className="text-white font-semibold">{customersByType.Regular}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {((customersByType.Regular / customers.length) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{customers.length}</p>
              <p className="text-gray-400 text-sm">Total Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">Top Selling Products</h3>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.brand}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">${product.sellingPrice}</p>
                  <p className="text-xs text-gray-400">{product.currentStock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Package className="mr-2 text-red-400" size={20} />
            Low Stock Alert
          </h3>
          
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
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

      {/* Supplier Performance */}
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6">Supplier Performance</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left text-gray-400 font-medium py-3">Supplier</th>
                <th className="text-left text-gray-400 font-medium py-3">Total Orders</th>
                <th className="text-left text-gray-400 font-medium py-3">Total Value</th>
                <th className="text-left text-gray-400 font-medium py-3">Rating</th>
                <th className="text-left text-gray-400 font-medium py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-white">{supplier.name}</p>
                      <p className="text-sm text-gray-400">{supplier.contactPerson}</p>
                    </div>
                  </td>
                  <td className="py-4 text-white">{supplier.totalOrders}</td>
                  <td className="py-4 text-green-400 font-semibold">${supplier.totalValue.toLocaleString()}</td>
                  <td className="py-4 text-yellow-400">{supplier.rating}/5</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      supplier.status === 'Active' 
                        ? 'bg-green-500 bg-opacity-20 text-green-400' 
                        : 'bg-red-500 bg-opacity-20 text-red-400'
                    }`}>
                      {supplier.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;