import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import { CREATE_TASK_QUERY } from '../../graphQl/mutations/createTask';
import { ALL_TASKS_QUERY } from '../../graphQl/queries/getTastks';
import { ALL_USERS_QUERY } from '../../graphQl/queries/getUsers';
import Swal from 'sweetalert2'

interface IPropsModal {
  openModal: boolean
  setIsModalVisible: any
}

const { Option } = Select;

export default function ModalAddTask(props: IPropsModal) {
  const [state, setState] = useState("TODO")
  const { openModal, setIsModalVisible } = props
  const [addTask, { data, loading, error }] = useMutation(CREATE_TASK_QUERY, { refetchQueries: [{ query: ALL_TASKS_QUERY, variables: { input: { status: state } } }] });
  const [form] = Form.useForm();
  const allUsers = useQuery(ALL_USERS_QUERY)

  if (loading) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  if (error) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops',
      showConfirmButton: false,
      timer: 1500
    })
  }

  function handleChange(value: any) {
    setState(value)
  }

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false)
  };

  const onFinish = (values: any) => {
    const date = new Date(values.dueDate)
    const valuesInput = {
      assigneeId: values.assignee,
      name: values.name,
      tags: values.tags,
      status: values.status,
      pointEstimate: values.pointEstimate, dueDate: date
    }
    addTask({ variables: { input: valuesInput } });
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      visible={openModal}
      title="Title"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>
      ]}
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Task Title' }]}
        >
          <Input placeholder='Task Title' />
        </Form.Item>

        <Form.Item name="pointEstimate" rules={[{ required: true }]}>
          <Select
            placeholder="Estimate"
            allowClear
          >
            <Option value="ZERO">0 Points</Option>
            <Option value="ONE">1 Point</Option>
            <Option value="TWO">2 Points</Option>
            <Option value="FOUR">4 Points</Option>
            <Option value="EIGHT">5 Points</Option>
          </Select>
        </Form.Item>
        {
          allUsers.data && (
            <Form.Item name="assignee" rules={[{ required: true }]}>
              <Select
                placeholder="Assignee"
                allowClear
              >
                {allUsers.data.users.map((item: any) => <Option value={item.id} key={item.id}>{item.fullName}</Option>)}
              </Select>
            </Form.Item>

          )
        }
        <Form.Item name="tags" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select Tags"
          >
            <Option value="ANDROID">ANDROID</Option>
            <Option value="IOS">IOS</Option>
            <Option value="NODE_JS">NODE_JS</Option>
            <Option value="RAILS">RAILS</Option>
            <Option value="REACT">REACT</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" rules={[{ required: true }]}>
          <Select
            placeholder="Please select Status"
            allowClear onChange={handleChange}
          >
            <Option value="BACKLOG">BACKLOG</Option>
            <Option value="TODO">TO DO</Option>
            <Option value="IN_PROGRESS">IN PROGRESS</Option>
            <Option value="DONE">DONE</Option>
            <Option value="CANCELLED">CANCELLED</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
