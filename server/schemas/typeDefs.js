const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    journals: [Journal]!
  }

  type Journal {
    _id: ID
    journalTitle: String
    journalAddress: String
    journalLatLng: LatLng
    journalText: String
    journalAuthor: String
    createdAt: String
  }

 type LatLng {
   lat: Float!
   lng: Float!
 }

 input InputLatLng {
  lat: Float!
  lng: Float!
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    journals(username: String): [Journal]
    journal(journalId: ID!): Journal
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJournal(journalTitle: String!, journalAddress: String!, journalLatLng: InputLatLng, journalText: String!): Journal
    removeJournal(journalId: ID!): Journal
  }
`;

module.exports = typeDefs;
