import { useQuery } from '@apollo/client'
import React from 'react'
import BoardTasks from '../../components/BoardTasks'
import ListTasks from '../../components/ListTasks'
import { ALL_TASKS_QUERY } from '../../graphQl/queries/getTastks'

export default function HomePage() {

  return (
    <BoardTasks/>
    
  )
}
