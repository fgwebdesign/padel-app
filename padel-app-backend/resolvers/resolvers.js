// resolvers.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Cancha = require('./models/Cancha');
const Reservation = require('./models/Reservation');

const resolvers = {
  Query: {
    users: () => User.find(),
    canchas: () => Cancha.find(),
    reservations: () => Reservation.find()
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role: 'user' });
      await user.save();
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, 'your-secret-key');
      return token;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, 'your-secret-key');
      return token;
    },
    createCancha: (_, { name, location, price }, { user }) => {
      if (user.role !== 'owner') {
        throw new Error('Not authorized');
      }
      const cancha = new Cancha({ name, location, price, ownerId: user.userId });
      return cancha.save();
    },
    createReservation: (_, { canchaId, startTime, endTime }, { user }) => {
      if (user.role !== 'user') {
        throw new Error('Not authorized');
      }
      const reservation = new Reservation({ canchaId, userId: user.userId, startTime, endTime, status: 'confirmed' });
      return reservation.save();
    }
  }
};

module.exports = resolvers;
