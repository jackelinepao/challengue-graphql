import { ApolloClient, InMemoryCache, } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI,
  cache: new InMemoryCache(),
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoibmVyZGVyeSIsInByb2plY3RJZCI6IjA3YzRjNzdhLTRlODUtNDJmYi1iMGExLTI3ODU0NDg4MGZiYiIsImZ1bGxOYW1lIjoiSmFja2VsaW5lIFF1aXNwZSIsImVtYWlsIjoiamFja2VsaW5lcXVpc3BlQHJhdm4uY28iLCJpYXQiOjE2NDc1MjcxNDd9.UFsHml9PqF0dLImRKQ2bPC9BXEsSoaMVdhsMrWQLe3Y'
  }
})