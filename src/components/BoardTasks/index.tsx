import React, { useState } from 'react'

import ListTasks from '../ListTasks';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalAddTask from '../ModalAddTask';

export default function BoardTasks() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true)
  };

  return (
    <>
      <div>
        <Tooltip title="search">
          <Button onClick={() => showModal()} shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
        <div>
          <ListTasks progress="BACKLOG" />
          <ListTasks progress="TODO" />
          <ListTasks progress="IN_PROGRESS" />
          <ListTasks progress="DONE" />
          <ListTasks progress="CANCELLED" />
        </div>
      </div>
      <ModalAddTask openModal={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  )
}
