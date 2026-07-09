const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// ==========================================
// 1. CREATE: Add a new menu item
// POST /api/menu
// ==========================================
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const newItem = new MenuItem({ name, description, price, category, imageUrl });
    
    await newItem.save();
    res.status(201).json({ message: 'Food item added successfully!', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
});

// ==========================================
// 2. READ: Get all menu items
// GET /api/menu
// ==========================================
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find(); // Fetches everything in the collection
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
});

// ==========================================
// 3. UPDATE: Change an existing menu item
// PUT /api/menu/:id
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    // Finds the item by its unique ID and updates it with the new data
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Returns the updated document instead of the old one
    );
    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});

// ==========================================
// 4. DELETE: Remove a menu item
// DELETE /api/menu/:id
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

module.exports = router;