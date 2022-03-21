import { gql } from "@apollo/client"

export const ALL_USERS_QUERY = gql`
  query GetUsers{
    users {
      id
      fullName
      email
      avatar
      createdAt
      type
    }
  }
`