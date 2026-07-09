const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String,
    default: "https://via.placeholder.com/150" // A placeholder image just in case
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);