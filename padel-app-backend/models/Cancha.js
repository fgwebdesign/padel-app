const mongoose = require('mongoose');

const canchaSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cancha', canchaSchema);
