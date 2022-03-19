import { gql } from "@apollo/client"

export const ALL_TASKS_QUERY = gql`
  query getTasks($input: FilterTaskInput!){
    tasks(input: $input) {      
      name
      tags
      pointEstimate
      position
      assignee {
        fullName
        avatar
      }
      dueDate
      id   
    }
  }
`