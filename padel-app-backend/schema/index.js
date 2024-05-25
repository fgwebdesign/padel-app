const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Cancha {
    id: ID!
    name: String!
    location: String!
    price: Float!
    ownerId: ID!
  }

  type Reservation {
    id: ID!
    canchaId: ID!
    userId: ID!
    startTime: String!
    endTime: String!
    status: String!
  }

  type Query {
    users: [User]
    canchas: [Cancha]
    reservations: [Reservation]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    createCancha(name: String!, location: String!, price: Float!): Cancha
    createReservation(canchaId: ID!, startTime: String!, endTime: String!): Reservation
  }
`;

module.exports = typeDefs;
