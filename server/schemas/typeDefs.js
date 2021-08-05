const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type start {
    _id: ID!
  }
  type Query {
    start: [XX]
    start(_id: ID!): XX
  }
  type Mutation {
   start(name: String!): XX
  }
`;

module.exports = typeDefs;