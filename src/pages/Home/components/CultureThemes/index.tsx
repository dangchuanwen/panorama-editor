import { FC, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Space,
  Table,
  TableColumnsType,
  Form,
  Input,
  message,
} from "antd";
import styles from "./style.module.css";
import {
  createCultureThemes,
  CultureTheme,
  getCultureThemes,
  removeCultureTheme,
  updateCultureTheme,
} from "../../services";

const columns: TableColumnsType<CultureTheme> = [
  { title: "主题名称", dataIndex: "name", key: "name" },
  { title: "描述", dataIndex: "description", key: "description" },
  { title: "规则", dataIndex: "rules", key: "rules" },
  { title: "更新日期", dataIndex: "createdTime", key: "createdTime" },
];

const CultureThemes: FC = () => {
  const [load, setLoad] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [cultureThemes, setCultureThemes] = useState<CultureTheme[]>([]);
  const [currentCultureTheme, setCurrentCultureTheme] =
    useState<CultureTheme>();
  useEffect(() => {
    const fetchCultureThemes = async () => {
      const res = await getCultureThemes();
      const data: CultureTheme[] = res.data.map((item) => {
        item.createdTime = new Date(item.createdTime).toLocaleString();
        return item;
      });
      setCultureThemes(data);
    };
    fetchCultureThemes();
  }, [load]);
  const handleSubmitForm = async (formData: CultureTheme) => {
    if (currentCultureTheme) {
      // 编辑
      await updateCultureTheme(currentCultureTheme._id, formData);
      message.success("修改成功！");
      setOpen(false);
      setLoad(load + 1);
    } else {
      // 创建
      await createCultureThemes(formData);
      message.success("创建成功！");
      setOpen(false);
      setLoad(load + 1);
    }
  };
  const handleClickRemove = async (id: string) => {
    await removeCultureTheme(id);
    message.success("删除成功！");
    setOpen(false);
    setLoad(load + 1);
  };
  const handleClickCreate = () => {
    setCurrentCultureTheme(undefined);
    setOpen(true);
  };
  const handleClickEdit = (cultureTheme: CultureTheme) => {
    setCurrentCultureTheme(cultureTheme);
    setOpen(true);
  };
  const tableColumns: TableColumnsType<CultureTheme> = [
    ...columns,
    {
      title: "操作",
      key: "action",
      render: (text: string, record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handleClickEdit(record)}>
              编辑
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleClickRemove(record._id)}
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
        <Row>
          <Button onClick={handleClickCreate} type="primary">
            创建
          </Button>
        </Row>
        <Table dataSource={cultureThemes} columns={tableColumns} />
      </Space>
      <Modal
        title="创建文化主题"
        visible={open}
        keyboard={true}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form onFinish={handleSubmitForm} initialValues={currentCultureTheme}>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: "不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="规则"
            name="rules"
            rules={[{ required: true, message: "不能为空" }]}
          >
            <Input />
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

export default CultureThemes;
