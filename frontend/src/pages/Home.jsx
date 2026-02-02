import { useEffect } from 'react';
import ProductList from '../components/products/ProductList.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useProduct } from '../context/ProductContext.jsx';

const Home = () => {
  const { products, loading, error, fetchProducts, clearError } = useProduct();

  // Handle retry
  const handleRetry = () => {
    clearError();
    fetchProducts();
  };

  // Auto-clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Product Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your products efficiently with CRUD operations
        </p>
      </div>

      <ErrorMessage 
        error={error} 
        onRetry={handleRetry}
        onClose={clearError}
      />

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            All Products ({Array.isArray(products) ? products.length : 0})
          </h2>
        </div>
        <div className="text-sm text-gray-500">
          {loading ? 'Loading...' : `${products.length} items`}
        </div>
      </div>

      <ProductList products={products} loading={loading} />
    </div>
  );
};

export default Home;