import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { productAPI } from '../services/api.js';

const ProductContext = createContext();

const initialState = {
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
};

// Action types
const ActionTypes = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_CURRENT_PRODUCT: 'SET_CURRENT_PRODUCT',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_CURRENT_PRODUCT: 'CLEAR_CURRENT_PRODUCT',
};

const productReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null,
        currentProduct: action.payload?.productId ? state.currentProduct : null 
      };
    
    case ActionTypes.FETCH_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        products: action.payload || []
      };
    
    case ActionTypes.FETCH_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload || 'Something went wrong'
      };
    
    case ActionTypes.SET_CURRENT_PRODUCT:
      return { 
        ...state, 
        currentProduct: action.payload,
        loading: false,
        error: null
      };
    
    case ActionTypes.CLEAR_CURRENT_PRODUCT:
      return { 
        ...state, 
        currentProduct: null 
      };
    
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: Array.isArray(action.payload) 
          ? action.payload 
          : [action.payload, ...state.products],
        loading: false,
        error: null
      };
    
    case ActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product?._id === action.payload?._id ? action.payload : product
        ),
        currentProduct: null,
        loading: false,
        error: null
      };
    
    case ActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => 
          product?._id !== action.payload
        ),
        loading: false,
        error: null
      };
    
    case ActionTypes.CLEAR_ERROR:
      return { 
        ...state, 
        error: null 
      };
    
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// Helper function for safe API calls
const safeAPICall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    
    if (!response) {
      throw new Error('No response from server');
    }
    
    if (response.status >= 400) {
      throw new Error(response.data?.message || 'Server error');
    }
    
    return {
      success: true,
      data: response.data?.data || response.data,
      message: response.data?.message
    };
  } catch (error) {
    console.error('API Error:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || 
             error.message || 
             'Network error. Please check your connection.',
      status: error.response?.status
    };
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Safe dispatch wrapper
  const safeDispatch = (action) => {
    try {
      dispatch(action);
    } catch (error) {
      console.error('Dispatch error:', error);
      dispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: 'State update failed' 
      });
    }
  };

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    safeDispatch({ type: ActionTypes.FETCH_REQUEST });
    
    const result = await safeAPICall(productAPI.getAll);
    
    if (result.success) {
      safeDispatch({ 
        type: ActionTypes.FETCH_SUCCESS, 
        payload: Array.isArray(result.data) ? result.data : [] 
      });
    } else {
      safeDispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: result.error 
      });
    }
  }, []);

  // Get single product
  const getProductById = useCallback(async (id) => {
    if (!id || typeof id !== 'string') {
      safeDispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: 'Invalid product ID' 
      });
      return { success: false, error: 'Invalid product ID' };
    }
    
    safeDispatch({ 
      type: ActionTypes.FETCH_REQUEST,
      payload: { productId: id }
    });
    
    const result = await safeAPICall(productAPI.getById, id);
    
    if (result.success) {
      safeDispatch({ 
        type: ActionTypes.SET_CURRENT_PRODUCT, 
        payload: result.data 
      });
      return { success: true, data: result.data };
    } else {
      safeDispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: result.error 
      });
      return { success: false, error: result.error };
    }
  }, []);

  // Create product
  const createProduct = useCallback(async (productData) => {
    if (!productData || typeof productData !== 'object') {
      return { success: false, error: 'Invalid product data' };
    }
    
    safeDispatch({ type: ActionTypes.FETCH_REQUEST });
    
    const result = await safeAPICall(productAPI.create, productData);
    
    if (result.success) {
      safeDispatch({ 
        type: ActionTypes.ADD_PRODUCT, 
        payload: result.data 
      });
      return { 
        success: true, 
        data: result.data,
        message: 'Product created successfully'
      };
    } else {
      safeDispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: result.error 
      });
      return { success: false, error: result.error };
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (id, productData) => {
    if (!id || !productData) {
      return { success: false, error: 'Invalid input data' };
    }
    
    safeDispatch({ type: ActionTypes.FETCH_REQUEST });
    
    const result = await safeAPICall(productAPI.update, id, productData);
    
    if (result.success) {
      safeDispatch({ 
        type: ActionTypes.UPDATE_PRODUCT, 
        payload: result.data 
      });
      return { 
        success: true, 
        data: result.data,
        message: 'Product updated successfully'
      };
    } else {
      safeDispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: result.error 
      });
      return { success: false, error: result.error };
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (id) => {
    if (!id) {
      return { success: false, error: 'Invalid product ID' };
    }
    
    safeDispatch({ type: ActionTypes.FETCH_REQUEST });
    
    const result = await safeAPICall(productAPI.delete, id);
    
    if (result.success) {
      safeDispatch({ 
        type: ActionTypes.DELETE_PRODUCT, 
        payload: id 
      });
      return { 
        success: true, 
        message: 'Product deleted successfully' 
      };
    } else {
      safeDispatch({ 
        type: ActionTypes.FETCH_FAILURE, 
        payload: result.error 
      });
      return { success: false, error: result.error };
    }
  }, []);

  // Clear current product
  const clearCurrentProduct = useCallback(() => {
    safeDispatch({ type: ActionTypes.CLEAR_CURRENT_PRODUCT });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    safeDispatch({ type: ActionTypes.CLEAR_ERROR });
  }, []);

  // Initialize
  useEffect(() => {
    let mounted = true;
    
    const initialize = async () => {
      if (mounted) {
        await fetchProducts();
      }
    };
    
    initialize();
    
    return () => {
      mounted = false;
    };
  }, [fetchProducts]);

  const value = {
    products: Array.isArray(state.products) ? state.products : [],
    loading: Boolean(state.loading),
    error: state.error,
    currentProduct: state.currentProduct,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearCurrentProduct,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook with safety checks
export const useProduct = () => {
  const context = useContext(ProductContext);
  
  if (!context) {
    console.error('useProduct must be used within ProductProvider');
    return {
      products: [],
      loading: false,
      error: 'Context not available',
      currentProduct: null,
      fetchProducts: () => {},
      getProductById: () => ({ success: false, error: 'Context not available' }),
      createProduct: () => ({ success: false, error: 'Context not available' }),
      updateProduct: () => ({ success: false, error: 'Context not available' }),
      deleteProduct: () => ({ success: false, error: 'Context not available' }),
      clearCurrentProduct: () => {},
      clearError: () => {},
    };
  }
  
  return context;
};