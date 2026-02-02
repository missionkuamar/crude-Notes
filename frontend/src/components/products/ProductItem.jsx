import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';
import { useProduct } from '../../context/ProductContext.jsx';

const ProductItem = ({ product = {} }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const { deleteProduct, loading } = useProduct();

  // Validate product props
  if (!product || typeof product !== 'object') {
    console.error('Invalid product passed to ProductItem:', product);
    return (
      <div className="card border-red-300 bg-red-50">
        <p className="text-red-600">Invalid product data</p>
      </div>
    );
  }

  const {
    _id,
    name = 'Unnamed Product',
    description = 'No description',
    price = 0,
    category = 'Uncategorized',
    inStock = true
  } = product;

  if (!_id) {
    return (
      <div className="card border-yellow-300 bg-yellow-50">
        <p className="text-yellow-700">Product ID missing</p>
      </div>
    );
  }

  const handleDelete = async () => {
    setDeleteError(null);
    
    try {
      const { success, error } = await deleteProduct(_id);
      
      if (success) {
        setShowDeleteModal(false);
      } else {
        setDeleteError(error || 'Failed to delete product');
      }
    } catch (err) {
      setDeleteError('An unexpected error occurred');
      console.error('Delete error:', err);
    }
  };

  return (
    <>
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
              {String(name)}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-2">
              {String(description)}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-blue-600">
                  ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
                </span>
                <span className="ml-4 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {String(category)}
                </span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex space-x-2">
                <Link to={`/edit-product/${_id}`}>
                  <Button variant="secondary" className="text-sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                  className="text-sm"
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteError(null);
        }}
        title="Confirm Delete"
      >
        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete "{name}"? This action cannot be undone.
          </p>
          
          {deleteError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">{deleteError}</p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteError(null);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductItem;