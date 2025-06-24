import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  mockProducts, 
  mockSuppliers, 
  mockCustomers, 
  mockOrders, 
  mockPurchaseOrders,
  mockUsers,
  mockDashboardData 
} from '../mock/mockData';

const InventoryContext = createContext();

const initialState = {
  products: [],
  suppliers: [],
  customers: [],
  orders: [],
  purchaseOrders: [],
  users: [],
  dashboardData: {},
  loading: false,
  error: null
};

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOAD_DATA':
      return {
        ...state,
        products: action.payload.products,
        suppliers: action.payload.suppliers,
        customers: action.payload.customers,
        orders: action.payload.orders,
        purchaseOrders: action.payload.purchaseOrders,
        users: action.payload.users,
        dashboardData: action.payload.dashboardData,
        loading: false
      };
    
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    case 'ADD_SUPPLIER':
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload]
      };
    
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.map(supplier =>
          supplier.id === action.payload.id ? action.payload : supplier
        )
      };
    
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(supplier => supplier.id !== action.payload)
      };
    
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };
    
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === action.payload.id ? action.payload : customer
        )
      };
    
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload)
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    
    default:
      return state;
  }
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  useEffect(() => {
    // Load mock data on initialization
    const loadMockData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatch({
          type: 'LOAD_DATA',
          payload: {
            products: mockProducts,
            suppliers: mockSuppliers,
            customers: mockCustomers,
            orders: mockOrders,
            purchaseOrders: mockPurchaseOrders,
            users: mockUsers,
            dashboardData: mockDashboardData
          }
        });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    loadMockData();
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  const updateProduct = (product) => {
    const updatedProduct = {
      ...product,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
  };

  const deleteProduct = (productId) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
  };

  const addSupplier = (supplier) => {
    const newSupplier = {
      ...supplier,
      id: Date.now(),
      totalOrders: 0,
      totalValue: 0,
      rating: 0,
      status: 'Active'
    };
    dispatch({ type: 'ADD_SUPPLIER', payload: newSupplier });
  };

  const updateSupplier = (supplier) => {
    dispatch({ type: 'UPDATE_SUPPLIER', payload: supplier });
  };

  const deleteSupplier = (supplierId) => {
    dispatch({ type: 'DELETE_SUPPLIER', payload: supplierId });
  };

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: null,
      status: 'Active'
    };
    dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
  };

  const updateCustomer = (customer) => {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: customer });
  };

  const deleteCustomer = (customerId) => {
    dispatch({ type: 'DELETE_CUSTOMER', payload: customerId });
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      orderNumber: `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      paymentStatus: 'Pending'
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  const updateOrder = (order) => {
    dispatch({ type: 'UPDATE_ORDER', payload: order });
  };

  const value = {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addOrder,
    updateOrder
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};