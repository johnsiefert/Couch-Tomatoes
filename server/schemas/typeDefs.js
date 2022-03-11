const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    tvCount: Int
    savedTv: [Tv]
    friendList: [friends]
}

type Tv {
    tvId: ID!
    description: String
    image: String
    link: String
    title: String!
    year: String
}

type Auth {
    token: ID!
    user: User
}

input TvInput{
    description: String!
    tvId: String!
    image: String
    link: String
    title: String!
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTv(tvData: TvInput!): User
    removeTv(tvId: ID!): User
  }
`;

module.exports = typeDefs;