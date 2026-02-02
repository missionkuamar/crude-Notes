import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useProduct } from '../context/ProductContext.jsx';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getProductById, 
    currentProduct, 
    updateProduct, 
    loading, 
    error,
    clearError 
  } = useProduct();
  
  const [localError, setLocalError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!id) {
      setLocalError('No product ID provided');
      setIsFetching(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsFetching(true);
        setLocalError(null);
        const result = await getProductById(id);
        
        if (!result.success) {
          setLocalError(result.error || 'Failed to load product');
        }
      } catch (err) {
        setLocalError('An unexpected error occurred');
        console.error('Fetch product error:', err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleSubmit = async (productData) => {
    if (!id) {
      return { success: false, error: 'No product ID' };
    }

    try {
      setLocalError(null);
      const result = await updateProduct(id, productData);
      
      if (result.success) {
        setTimeout(() => navigate('/'), 500);
        return result;
      } else {
        setLocalError(result.error);
        return result;
      }
    } catch (err) {
      const errorMsg = 'Failed to update product';
      setLocalError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const handleRetry = () => {
    setLocalError(null);
    if (id) {
      getProductById(id);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (isFetching) {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  if (localError || (error && error.includes('not found'))) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">❌</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              {localError || error}
            </h3>
            <p className="text-gray-500 mb-6">
              The product you're trying to edit doesn't exist or cannot be loaded.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBack}
                className="btn btn-secondary"
              >
                Go Back
              </button>
              <button
                onClick={handleRetry}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Edit Product
        </h1>
        <p className="text-gray-600">
          Update the product details below
        </p>
      </div>

      <ErrorMessage 
        error={error || localError} 
        onClose={clearError}
      />

      <div className="card">
        {currentProduct ? (
          <ProductForm
            initialData={currentProduct}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No product data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;