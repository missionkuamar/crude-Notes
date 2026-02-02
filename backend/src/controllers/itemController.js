import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';

// @desc    Get all items for a user
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });
  res.status(200).json(items);
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Private
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(item);
});

// @desc    Create new item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const item = await Item.create({
    name,
    description,
    price,
    user: req.user.id,
  });

  res.status(201).json(item);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedItem);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
});

export {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};