import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded">
            ${item.price}
          </span>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{item.description}</p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <Link
              to={`/items/edit/${item._id}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(item._id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </div>
          <span className="text-xs text-gray-400">
            Updated: {new Date(item.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;