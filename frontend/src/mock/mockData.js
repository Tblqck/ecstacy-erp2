// Mock data for perfume retail ERP system

export const mockProducts = [
  {
    id: 1,
    name: "Chanel No. 5",
    brand: "Chanel",
    sku: "CHN-005-EDT-100",
    fragranceType: "EDT",
    size: "100ml",
    category: "Luxury",
    costPrice: 85.00,
    sellingPrice: 150.00,
    currentStock: 45,
    minStockLevel: 10,
    supplierId: 1,
    description: "The world's most iconic fragrance",
    image: "/api/placeholder/300/300",
    createdAt: "2024-01-15",
    updatedAt: "2024-06-01"
  },
  {
    id: 2,
    name: "Dior Sauvage",
    brand: "Dior",
    sku: "DOR-SAV-EDT-100",
    fragranceType: "EDT",
    size: "100ml",
    category: "Luxury",
    costPrice: 78.00,
    sellingPrice: 135.00,
    currentStock: 23,
    minStockLevel: 15,
    supplierId: 1,
    description: "Fresh and woody fragrance",
    image: "/api/placeholder/300/300",
    createdAt: "2024-02-10",
    updatedAt: "2024-06-01"
  },
  {
    id: 3,
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    sku: "TF-BO-EDP-50",
    fragranceType: "EDP",
    size: "50ml",
    category: "Luxury",
    costPrice: 95.00,
    sellingPrice: 165.00,
    currentStock: 8,
    minStockLevel: 12,
    supplierId: 2,
    description: "Luxurious and mysterious fragrance",
    image: "/api/placeholder/300/300",
    createdAt: "2024-03-05",
    updatedAt: "2024-06-01"
  },
  {
    id: 4,
    name: "Versace Eros",
    brand: "Versace",
    sku: "VER-ERO-EDT-100",
    fragranceType: "EDT",
    size: "100ml",
    category: "Designer",
    costPrice: 42.00,
    sellingPrice: 75.00,
    currentStock: 67,
    minStockLevel: 20,
    supplierId: 3,
    description: "Fresh and vibrant fragrance",
    image: "/api/placeholder/300/300",
    createdAt: "2024-01-20",
    updatedAt: "2024-06-01"
  },
  {
    id: 5,
    name: "Calvin Klein Eternity",
    brand: "Calvin Klein",
    sku: "CK-ETE-EDT-100",
    fragranceType: "EDT",
    size: "100ml",
    category: "Designer",
    costPrice: 28.00,
    sellingPrice: 55.00,
    currentStock: 34,
    minStockLevel: 15,
    supplierId: 3,
    description: "Timeless and elegant fragrance",
    image: "/api/placeholder/300/300",
    createdAt: "2024-02-15",
    updatedAt: "2024-06-01"
  }
];

export const mockSuppliers = [
  {
    id: 1,
    name: "Luxury Fragrances Ltd",
    email: "orders@luxuryfragrances.com",
    phone: "+1-555-0101",
    address: "123 Perfume Street, New York, NY 10001",
    contactPerson: "Sarah Johnson",
    paymentTerms: "Net 30",
    brands: ["Chanel", "Dior", "Tom Ford"],
    totalOrders: 45,
    totalValue: 125000,
    rating: 4.8,
    status: "Active"
  },
  {
    id: 2,
    name: "Premium Scents Inc",
    email: "supply@premiumscents.com",
    phone: "+1-555-0102",
    address: "456 Fragrance Ave, Los Angeles, CA 90210",
    contactPerson: "Michael Chen",
    paymentTerms: "Net 45",
    brands: ["Tom Ford", "Creed", "Maison Margiela"],
    totalOrders: 32,
    totalValue: 89000,
    rating: 4.6,
    status: "Active"
  },
  {
    id: 3,
    name: "Designer Fragrances Co",
    email: "orders@designerfragrances.com",
    phone: "+1-555-0103",
    address: "789 Scent Boulevard, Miami, FL 33101",
    contactPerson: "Emma Rodriguez",
    paymentTerms: "Net 15",
    brands: ["Versace", "Calvin Klein", "Hugo Boss"],
    totalOrders: 67,
    totalValue: 78000,
    rating: 4.7,
    status: "Active"
  }
];

export const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-1001",
    address: "123 Main St, Springfield, IL 62701",
    totalOrders: 12,
    totalSpent: 1250.00,
    lastOrder: "2024-05-28",
    customerType: "Premium",
    status: "Active"
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1-555-1002",
    address: "456 Oak Ave, Chicago, IL 60601",
    totalOrders: 8,
    totalSpent: 890.00,
    lastOrder: "2024-05-25",
    customerType: "Regular",
    status: "Active"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@email.com",
    phone: "+1-555-1003",
    address: "789 Pine St, Milwaukee, WI 53201",
    totalOrders: 15,
    totalSpent: 2100.00,
    lastOrder: "2024-05-30",
    customerType: "VIP",
    status: "Active"
  }
];

export const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerId: 1,
    customerName: "John Smith",
    orderDate: "2024-05-28",
    status: "Delivered",
    total: 285.00,
    items: [
      { productId: 1, productName: "Chanel No. 5", quantity: 1, price: 150.00 },
      { productId: 4, productName: "Versace Eros", quantity: 1, price: 75.00 },
      { productId: 5, productName: "Calvin Klein Eternity", quantity: 1, price: 55.00 }
    ],
    shippingAddress: "123 Main St, Springfield, IL 62701",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid"
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerId: 2,
    customerName: "Emily Davis",
    orderDate: "2024-05-25",
    status: "Processing",
    total: 210.00,
    items: [
      { productId: 2, productName: "Dior Sauvage", quantity: 1, price: 135.00 },
      { productId: 4, productName: "Versace Eros", quantity: 1, price: 75.00 }
    ],
    shippingAddress: "456 Oak Ave, Chicago, IL 60601",
    paymentMethod: "PayPal",
    paymentStatus: "Paid"
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerId: 3,
    customerName: "Michael Johnson",
    orderDate: "2024-05-30",
    status: "Shipped",
    total: 315.00,
    items: [
      { productId: 1, productName: "Chanel No. 5", quantity: 1, price: 150.00 },
      { productId: 3, productName: "Tom Ford Black Orchid", quantity: 1, price: 165.00 }
    ],
    shippingAddress: "789 Pine St, Milwaukee, WI 53201",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid"
  }
];

export const mockPurchaseOrders = [
  {
    id: 1,
    poNumber: "PO-2024-001",
    supplierId: 1,
    supplierName: "Luxury Fragrances Ltd",
    orderDate: "2024-05-20",
    expectedDelivery: "2024-06-05",
    status: "Pending",
    total: 1650.00,
    items: [
      { productId: 1, productName: "Chanel No. 5", quantity: 10, costPrice: 85.00 },
      { productId: 2, productName: "Dior Sauvage", quantity: 10, costPrice: 78.00 }
    ]
  },
  {
    id: 2,
    poNumber: "PO-2024-002",
    supplierId: 2,
    supplierName: "Premium Scents Inc",
    orderDate: "2024-05-22",
    expectedDelivery: "2024-06-08",
    status: "Received",
    total: 950.00,
    items: [
      { productId: 3, productName: "Tom Ford Black Orchid", quantity: 10, costPrice: 95.00 }
    ]
  }
];

export const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@perfumeshop.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-05-30T10:30:00Z",
    permissions: ["all"]
  },
  {
    id: 2,
    name: "Sales Manager",
    email: "sales@perfumeshop.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-05-30T09:15:00Z",
    permissions: ["sales", "customers", "orders"]
  },
  {
    id: 3,
    name: "Inventory Staff",
    email: "inventory@perfumeshop.com",
    role: "Staff",
    status: "Active",
    lastLogin: "2024-05-29T14:20:00Z",
    permissions: ["inventory", "products"]
  }
];

export const mockDashboardData = {
  totalProducts: 150,
  lowStockProducts: 12,
  totalOrders: 245,
  totalRevenue: 45250.00,
  totalCustomers: 89,
  totalSuppliers: 8,
  monthlySales: [
    { month: "Jan", sales: 12500 },
    { month: "Feb", sales: 15200 },
    { month: "Mar", sales: 18800 },
    { month: "Apr", sales: 22100 },
    { month: "May", sales: 25600 },
    { month: "Jun", sales: 28900 }
  ],
  topProducts: [
    { name: "Chanel No. 5", sales: 45 },
    { name: "Dior Sauvage", sales: 38 },
    { name: "Versace Eros", sales: 32 },
    { name: "Tom Ford Black Orchid", sales: 28 },
    { name: "Calvin Klein Eternity", sales: 22 }
  ],
  recentOrders: mockOrders.slice(0, 3),
  lowStockAlerts: [
    { id: 3, name: "Tom Ford Black Orchid", currentStock: 8, minStock: 12 },
    { id: 2, name: "Dior Sauvage", currentStock: 23, minStock: 15 }
  ]
};

// User authentication mock
export const mockAuth = {
  currentUser: {
    id: 1,
    name: "Admin User",
    email: "admin@perfumeshop.com",
    role: "Admin",
    permissions: ["all"]
  },
  isAuthenticated: true
};

export const categories = ["Luxury", "Designer", "Niche", "Celebrity"];
export const fragranceTypes = ["EDT", "EDP", "Parfum", "EDC"];
export const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
export const customerTypes = ["Regular", "Premium", "VIP"];
export const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Cash"];
export const userRoles = ["Admin", "Manager", "Staff"];