import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query verifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      avatar
      email
      firstname
      lastname
      posts {
        id
        content
        owner {
          avatar
          firstname
          lastname
        }
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstname
      lastname
      avatar
      posts {
        content
        id
        owner {
          id
          avatar
          firstname
          lastname
        }
      }
    }
  }
`);
