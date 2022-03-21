import React from 'react'

import { useMutation, useQuery } from '@apollo/client';
import { ALL_TASKS_QUERY } from '../../graphQl/queries/getTastks';
import 'antd/dist/antd.css';
import { Table, Tag, Space, Typography, Button } from 'antd';
import { PointEstimate, User } from '../../__generated__/graphql-types';
import Avatar from 'antd/lib/avatar/avatar';
import Text from 'antd/lib/typography/Text';
import { DELETE_TASK_QUERY } from '../../graphQl/mutations/deleteTasks';

interface IProps {
  progress: string
}

export default function ListTasks({ progress }: IProps) {
  const { data, loading, error } = useQuery(ALL_TASKS_QUERY, { variables: { input: { status: progress } } })
  const [deleteTask] = useMutation(DELETE_TASK_QUERY, { refetchQueries: [{ query: ALL_TASKS_QUERY, variables: { input: {} } }] });

  if (loading) {
    return <div className="Loading">Loading</div>
  }
  if (error) {
    return null //Error
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Text>{name}</Text>,
    },
    {
      title: 'Task Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any[]) => (
        <>
          {tags.map(tag => {
            let color = tag === "IOS" ? '#70B252' : tag === "ANDROID" ? '#E5B454' : tag === "NODE_JS" ? '#006d75' : tag === "RAILS" ? '#c41d7f' : '#cf1322';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Estimate',
      dataIndex: 'pointEstimate',
      key: 'pointEstimate',
      render: (pointEstimate: PointEstimate) =>
        <Text>{pointEstimate === "ONE" ? 1 : pointEstimate === "TWO" ? 2 : pointEstimate === "FOUR" ? 4 : pointEstimate === "EIGHT" ? 8 : 0} Points</Text>
    },
    {
      title: 'Task Assign Name',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee: User) =>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar size={35} style={{ marginRight: 10 }} src={assignee.avatar} />
          <Text>{assignee.fullName}</Text>
        </div>
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate: string) => {
        const today = new Date()
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        const date = new Date(dueDate)
        const formatDate = date.toLocaleString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })
        return (
          date.getDate() === today.getDate() ? <Text>Today</Text> : date.getDate() === yesterday.getDate() ? <Text style={{ color: "#E27D73" }}>Yesterday</Text> : <Text>{formatDate}</Text>
        )
      }
      ,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id: string) => (
        <Space>
          <Button title="Delete" onClick={() => { deleteTask({ variables: { input: { id: id } } }); window.location.reload(); }}>DELETE</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4} style={{ margin: 0 }}>{progress === "BACKLOG" ? "Backlog" : progress === "CANCELLED" ? "Cancelled" : progress === "DONE" ? "Completed" : progress === "IN_PROGRESS" ? "In Progress" : "To Do"} ({data.tasks.length})</Typography.Title>
      <Table columns={columns} dataSource={data.tasks} pagination={false} />
    </div>
  )
}
