const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  canchaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancha' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: Date,
  endTime: Date,
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

module.exports = mongoose.model('Reservation', reservationSchema);
