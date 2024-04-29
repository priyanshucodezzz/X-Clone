import { graphql } from "@/gql";

export const getAllPostQuery = graphql(`
  #graphql

  query GetAllPosts {
    getAllPosts {
      id
      content
      imageUrl
      owner {
        id
        firstname
        lastname
        avatar
      }
    }
  }
`);
