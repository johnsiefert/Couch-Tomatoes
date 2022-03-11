import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!) {
    addComment(commentText: $commentText) {
      _id
      commentText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($commentId: ID!, $reactionBody: String!) {
    addReaction(commentId: $commentId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;


export const SAVE_TV = gql`
  mutation saveBook($tvData: TvInput!) {
    saveTv(tvData: $tvData) {
      _id
      username
      email
      savedTv {
        tvId
        year
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_TV = gql`
  mutation removeTv($tvId: ID!) {
    removeTv(tvId: $tvId) {
      _id
      username
      email
      savedTv {
        tvId
        year
        image
        description
        title
        link
      }
    }
  }
`;
