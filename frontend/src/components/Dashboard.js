import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Plus,
  Star,
  ArrowUp,
  ArrowDown,
  Calendar,
  Target,
  Zap,
  Award,
  Activity,
  BarChart3
} from 'lucide-react';

const EnhancedStatCard = ({ title, value, icon: Icon, color, trend, trendValue, subtitle, isAnimated = true }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isAnimated && typeof value === 'number') {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = value / 50;
        const animate = () => {
          current += increment;
          if (current < value) {
            setDisplayValue(Math.floor(current));
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        };
        animate();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, isAnimated]);

  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-yellow-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-yellow-300 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={28} className="text-white drop-shadow-lg" />
          </div>
          {trend && (
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {trend === 'up' ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
            {isAnimated && typeof value === 'number' ? displayValue : value}
          </h3>
          <p className="text-gray-400 font-medium">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ title, icon: Icon, color, onClick, description }) => (
  <button 
    onClick={onClick}
    className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 text-left w-full"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      <div className={`p-3 rounded-xl ${color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className="text-white" />
      </div>
      <h4 className="text-white font-semibold mb-2 group-hover:text-yellow-400 transition-colors">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </button>
);

const ActivityFeed = ({ activities }) => (
  <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-white flex items-center">
        <Activity size={20} className="mr-2 text-yellow-400" />
        Recent Activity
      </h3>
      <button className="text-yellow-400 hover:text-yellow-300 text-sm">View All</button>
    </div>
    
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
          <div className="flex-1">
            <p className="text-white text-sm">{activity.action}</p>
            <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SalesChart = ({ data }) => (
  <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-white flex items-center">
        <BarChart3 size={20} className="mr-2 text-yellow-400" />
        Sales Performance
      </h3>
      <div className="flex items-center text-green-400">
        <TrendingUp size={16} className="mr-1" />
        <span className="text-sm">+24.5%</span>
      </div>
    </div>
    
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 w-8 text-sm">{item.month}</span>
            <div className="flex-1">
              <div className="bg-gray-700 rounded-full h-4 w-40 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(item.sales / Math.max(...data.map(d => d.sales))) * 100}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">${item.sales.toLocaleString()}</p>
            <p className="text-xs text-gray-400">{item.orders} orders</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const { dashboardData, products, orders, customers, suppliers, loading } = useInventory();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-yellow-600/20 border-b-yellow-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  }

  const lowStockProducts = products.filter(p => p.currentStock <= p.minStockLevel);
  const recentOrders = orders.slice(0, 5);
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  const salesData = [
    { month: 'Jan', sales: 12500, orders: 45 },
    { month: 'Feb', sales: 15200, orders: 52 },
    { month: 'Mar', sales: 18800, orders: 67 },
    { month: 'Apr', sales: 22100, orders: 74 },
    { month: 'May', sales: 25600, orders: 89 },
    { month: 'Jun', sales: 28900, orders: 95 }
  ];

  const recentActivities = [
    { action: "New order #ORD-2024-045 received", time: "2 minutes ago" },
    { action: "Low stock alert: Tom Ford Black Orchid", time: "15 minutes ago" },
    { action: "Customer John Smith updated profile", time: "1 hour ago" },
    { action: "Supplier payment processed: $2,500", time: "2 hours ago" },
    { action: "New product added: Armani Code", time: "3 hours ago" }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl p-8 border border-gray-800">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Welcome to <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">PerfumeERP</span>
              </h1>
              <p className="text-xl text-gray-400">Your comprehensive perfume retail management system</p>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">System Online</span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</p>
                <p className="text-gray-400 text-sm">Current Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EnhancedStatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="up"
          trendValue="+12%"
          subtitle="Active inventory items"
        />
        <EnhancedStatCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="up"
          trendValue="+8%"
          subtitle={`Avg: $${avgOrderValue.toFixed(2)}`}
        />
        <EnhancedStatCard
          title="Active Customers"
          value={customers.filter(c => c.status === 'Active').length}
          icon={Users}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="up"
          trendValue="+15%"
          subtitle={`Total: ${customers.length}`}
        />
        <EnhancedStatCard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          trend="up"
          trendValue="+22%"
          subtitle="This month"
          isAnimated={false}
        />
      </div>

      {/* Enhanced Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <ActivityFeed activities={recentActivities} />
      </div>

      {/* Recent Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Orders */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <ShoppingCart size={20} className="mr-2 text-yellow-400" />
              Recent Orders
            </h3>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center text-sm transition-colors">
              <Eye size={16} className="mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={order.id} className="group flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-yellow-400 transition-colors">{order.orderNumber}</p>
                    <p className="text-sm text-gray-400">{order.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-400">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Low Stock Alerts */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <AlertTriangle className="mr-2 text-red-400 animate-pulse" size={20} />
              Low Stock Alerts
            </h3>
            <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
              {lowStockProducts.length} Items
            </span>
          </div>
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.slice(0, 5).map((product, index) => (
                <div key={product.id} className="group flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <AlertTriangle size={20} className="text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-red-400 transition-colors">{product.name}</p>
                      <p className="text-sm text-gray-400">{product.brand}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-semibold">{product.currentStock} left</p>
                    <p className="text-xs text-gray-400">Min: {product.minStockLevel}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-green-400" />
                </div>
                <p className="text-green-400 font-semibold">All products are well stocked!</p>
                <p className="text-gray-400 text-sm mt-1">Great job managing inventory</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Zap size={20} className="mr-2 text-yellow-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionCard
            title="Add Product"
            icon={Package}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            description="Add new perfume to inventory"
            onClick={() => {}}
          />
          <QuickActionCard
            title="New Order"
            icon={ShoppingCart}
            color="bg-gradient-to-br from-green-500 to-green-600"
            description="Create customer order"
            onClick={() => {}}
          />
          <QuickActionCard
            title="Add Customer"
            icon={Users}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            description="Register new customer"
            onClick={() => {}}
          />
          <QuickActionCard
            title="View Reports"
            icon={TrendingUp}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            description="Business analytics"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Top Products Showcase */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Star size={20} className="mr-2 text-yellow-400" />
            Top Selling Products
          </h3>
          <button className="text-yellow-400 hover:text-yellow-300 flex items-center text-sm transition-colors">
            <Plus size={16} className="mr-1" />
            View Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product, index) => (
            <div key={product.id} className="group bg-gray-800/30 rounded-xl p-4 text-center hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-black font-bold text-lg">#{index + 1}</span>
              </div>
              <h4 className="font-medium text-white text-sm mb-2 group-hover:text-yellow-400 transition-colors">{product.name}</h4>
              <p className="text-xs text-gray-400 mb-3">{product.brand}</p>
              <div className="flex items-center justify-between">
                <p className="text-green-400 font-semibold text-sm">${product.sellingPrice}</p>
                <p className="text-xs text-gray-500">{product.currentStock} units</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;