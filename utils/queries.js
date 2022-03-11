import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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