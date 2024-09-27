import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    updateUser(id: ID!, name: String, email: String, password: String): User!
    deleteUser(id: ID!): User!
    login(email: String!, password: String!): User!
    logout: Boolean!
  }
`;

export default typeDefs;