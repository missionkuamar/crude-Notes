import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm.jsx';
import { useProduct } from '../context/ProductContext.jsx';

const AddProduct = () => {
  const { createProduct, loading, error, clearError } = useProduct();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    clearError(); // Clear any previous errors
    
    const result = await createProduct(productData);
    
    if (result.success) {
      setSuccessMessage(result.message || 'Product added successfully!');
      return result;
    } else {
      // Return the error to be handled by ProductForm
      return result;
    }
  };

  // Auto-navigate after success
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  // Auto-clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-600">
          Fill in the details below to add a new product to your inventory
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-600 font-medium">{successMessage}</p>
          </div>
          <p className="mt-1 text-sm text-green-500">
            Redirecting to products list...
          </p>
        </div>
      )}

      {/* Error Message from Context */}
      {error && !successMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-600 font-medium">Error</p>
          </div>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            onClick={clearError}
            className="mt-2 text-sm font-medium text-red-800 hover:text-red-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form Card */}
      <div className="card">
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* Help Text */}
      <div className="mt-6 text-sm text-gray-500">
        <p>All fields marked with <span className="text-red-500">*</span> are required.</p>
        <p className="mt-1">Make sure to provide accurate information for better product management.</p>
      </div>
    </div>
  );
};

export default AddProduct;