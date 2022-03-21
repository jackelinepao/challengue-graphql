import { gql } from "@apollo/client"

export const CREATE_TASK_QUERY = gql`
  mutation createTask($input: CreateTaskInput!){
  createTask(input: $input){
    name
    tags
    pointEstimate
    position
    assignee {
      fullName
      avatar
    }
    dueDate
  }
}
`