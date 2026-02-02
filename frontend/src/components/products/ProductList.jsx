import ProductItem from './ProductItem.jsx';
import Loader from '../common/Loader.jsx';

const ProductList = ({ products = [], loading }) => {
  // Validate products array
  const safeProducts = Array.isArray(products) ? products : [];

  if (loading) {
    return <Loader />;
  }

  if (safeProducts.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">
          Start by adding your first product!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {safeProducts.map((product) => {
        // Validate product object
        if (!product || typeof product !== 'object' || !product._id) {
          console.warn('Invalid product item:', product);
          return null;
        }
        
        return (
          <ProductItem 
            key={product._id || Math.random().toString(36)} 
            product={product} 
          />
        );
      })}
    </div>
  );
};

export default ProductList;