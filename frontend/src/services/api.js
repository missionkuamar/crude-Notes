import axios from 'axios';

// Create axios instance with default config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please try again.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    } else if (error.response.status === 404) {
      error.message = 'Resource not found.';
    } else if (error.response.status === 500) {
      error.message = 'Server error. Please try again later.';
    }
    
    // Log error for debugging
    if (import.meta.env.DEV) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
    }
    
    return Promise.reject(error);
  }
);

// Product API calls with error handling
export const productAPI = {
  // Get all products
  getAll: async () => {
    try {
      return await API.get('/products');
    } catch (error) {
      console.error('Get all products error:', error);
      throw error;
    }
  },
  
  // Get single product
  getById: async (id) => {
    if (!id) throw new Error('Product ID is required');
    
    try {
      return await API.get(`/products/${id}`);
    } catch (error) {
      console.error(`Get product ${id} error:`, error);
      throw error;
    }
  },
  
  // Create product
  create: async (productData) => {
    if (!productData) throw new Error('Product data is required');
    
    try {
      return await API.post('/products', productData);
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  },
  
  // Update product
  update: async (id, productData) => {
    if (!id || !productData) {
      throw new Error('ID and product data are required');
    }
    
    try {
      return await API.put(`/products/${id}`, productData);
    } catch (error) {
      console.error(`Update product ${id} error:`, error);
      throw error;
    }
  },
  
  // Delete product
  delete: async (id) => {
    if (!id) throw new Error('Product ID is required');
    
    try {
      return await API.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Delete product ${id} error:`, error);
      throw error;
    }
  },
};

// Health check
export const checkAPIHealth = async () => {
  try {
    const response = await API.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};