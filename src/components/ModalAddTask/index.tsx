import { useQuery, useMutation } from '@apollo/client';
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { CREATE_TASK_QUERY } from '../../graphQl/mutations/createTask';
import { ALL_TASKS_QUERY } from '../../graphQl/queries/getTastks';
import { ALL_USERS_QUERY } from '../../graphQl/queries/getUsers';
interface IPropsModal {
  openModal: boolean
  setIsModalVisible: any
}
const { Option } = Select;

export default function ModalAddTask(props: IPropsModal) {
  const [loadingbBtn, setLoadingBtn] = useState(false)
  const { openModal, setIsModalVisible } = props
  const [addTask, { data, loading, error }] = useMutation(CREATE_TASK_QUERY, {refetchQueries: [ {query: ALL_TASKS_QUERY, variables: { input: {} }}]});
  const [form] = Form.useForm();
  const allUsers = useQuery(ALL_USERS_QUERY)

  const handleOk = () => {
    setLoadingBtn(true)
    setTimeout(() => {
      setIsModalVisible(false)
      setLoadingBtn(false)
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false)
  };
  const onFinish = (values: any) => {
    const date = new Date(values.dueDate)
    console.log('Success:', values);
    addTask({ variables: { input: { assigneeId: values.assignee, name: values.name, tags: values.tags, status: values.status, pointEstimate: values.pointEstimate, dueDate: date } } });
    form.resetFields();
    setIsModalVisible(false)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Modal
      visible={openModal}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>
      ]}
    >
      <Form
        name="basic"
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
                {allUsers.data.users.map((item: any) => <Option value={item.id}>{item.fullName}</Option>)}
              </Select>
            </Form.Item>

          )
        }
        <Form.Item name="tags" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={["REACT"]}
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
            placeholder="Status"
            allowClear
          >
            <Option value="BACKLOG">BACKLOG</Option>
            <Option value="CANCELLED">CANCELLED</Option>
            <Option value="DONE">DONE</Option>
            <Option value="IN_PROGRESS">IN PROGRESS</Option>
            <Option value="TODO">TO DO</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="DatePicker">
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
