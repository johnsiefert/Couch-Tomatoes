const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    tvCount: Int
    savedTv: [Tv]
    comments: [Comment]
}

type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
  }

type Tv {
    tvId: String
    description: String
    image: String
    link: String
    title: String
    year: String
    comments: [Comment]
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
    year: String
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    addComment(commentText: String!): Comment
  }
`;

module.exports = typeDefs;