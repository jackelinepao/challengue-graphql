import { gql } from "@apollo/client"

export const DELETE_TASK_QUERY = gql`
  mutation deleteTask($input: DeleteTaskInput!){
  deleteTask(input: $input) {
    id
  }
}
`