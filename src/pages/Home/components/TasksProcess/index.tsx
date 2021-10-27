import {
  Button,
  Space,
  TableColumnsType,
  Table,
  Modal,
  Form,
  Input,
  message,
  Badge,
  Switch,
} from "antd";

import { FC, useEffect, useState } from "react";
import {
  createTaskProcessStep,
  getTasksProcess,
  removeTaskProcessStep,
  TaskProcessStep,
  updateTaskProcessStep,
} from "../../services";
import styles from "./styles.module.css";
const columns: TableColumnsType<TaskProcessStep> = [
  { title: "任务序号", dataIndex: "order", key: "order" },
  { title: "任务名称", dataIndex: "name", key: "name" },
  { title: "任务描述", dataIndex: "description", key: "description" },
  {
    title: "是否完成",
    dataIndex: "done",
    key: "done",
    render: (text, record) => {
      return record.done ? (
        <Badge status="success" text="已完成" />
      ) : (
        <Badge status="error" text="未完成" />
      );
    },
  },
];
const TasksProcess: FC = () => {
  const [loadData, setLoadData] = useState(0);
  const [selectedTaskStep, setSelectedTaskStep] = useState<TaskProcessStep>();
  const [taskProcessSteps, setTaskProcessSteps] = useState<TaskProcessStep[]>(
    []
  );
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    const fetchTasksProcess = async () => {
      const res = await getTasksProcess();
      setTaskProcessSteps(res.data);
    };
    fetchTasksProcess();
  }, [loadData]);

  const handleConfirmCreate = async (newTaskProcessStep: TaskProcessStep) => {
    try {
      if (!selectedTaskStep) {
        await createTaskProcessStep(newTaskProcessStep);
        message.success("创建成功");
        setLoadData(loadData + 1);
      } else {
        await updateTaskProcessStep(selectedTaskStep._id, {
          name: newTaskProcessStep.name,
          description: newTaskProcessStep.description,
          done: newTaskProcessStep.done,
        } as TaskProcessStep);
        message.success("修改成功");
        setLoadData(loadData + 1);
      }

      setShowAddModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEdit = (record: TaskProcessStep) => {
    setSelectedTaskStep(record);
    setShowAddModal(true);
  };

  const handleClickDelete = (record: TaskProcessStep) => {
    Modal.confirm({
      title: "确认删除？",
      onOk: async () => {
        await removeTaskProcessStep(record._id);
        message.success("删除成功");
        setLoadData(loadData + 1);
      },
    });
  };

  const tableColumns: TableColumnsType<TaskProcessStep> = [
    ...columns,
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleClickEdit(record);
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleClickDelete(record)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button
          type="primary"
          onClick={() => {
            setSelectedTaskStep(null as unknown as TaskProcessStep);
            setShowAddModal(true);
          }}
        >
          创建
        </Button>
        <Table
          columns={tableColumns}
          dataSource={taskProcessSteps}
          rowKey="_id"
        />
      </Space>
      <Modal
        title="编辑任务"
        visible={showAddModal}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setShowAddModal(false)}
      >
        <Form onFinish={handleConfirmCreate} initialValues={selectedTaskStep}>
          <Form.Item label="任务序号" name="order" required>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="任务名称" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item label="任务描述" name="description" required>
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item
            label="是否完成"
            name="done"
            required
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TasksProcess;
