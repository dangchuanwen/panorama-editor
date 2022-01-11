/* eslint-disable react/jsx-no-target-blank */
import React, { FC, useEffect, useState } from "react";
import {
  Country,
  CultureTheme,
  Gender,
  getAllUserPreferCultureThemes,
  getCultureThemes,
  removeUser,
  updateUserGroup,
  updateUserIntroTextLink,
  updateUserIntroVideoLink,
  updateUserParticipateStatus,
  updateUserPassword,
  User,
} from "../../services";
import {
  TableColumnsType,
  Table,
  Avatar,
  Tag,
  Button,
  Space,
  Modal,
  Input,
  message,
  Select,
  Switch,
} from "antd";
import styles from "./style.module.css";

const GenderMap: Map<Gender, string> = new Map();
GenderMap.set(Gender.Female, "女");
GenderMap.set(Gender.Male, "男");

const CountryMap: Map<Country, string> = new Map();
CountryMap.set(Country.China, "中国");
CountryMap.set(Country.Indonesia, "印度尼西亚");
CountryMap.set(Country.Uzbekistan, "乌兹别克斯坦");

const columns: TableColumnsType<User> = [
  {
    title: "头像",
    dataIndex: "avatarUrl",
    key: "avatarUrl",
    render: (text, record) => {
      return <Avatar src={record.avatarUrl} />;
    },
  },
  { title: "用户名", dataIndex: "userName", key: "userName" },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    render: (text, record) => {
      return GenderMap.get(record.gender);
    },
  },
  {
    title: "国家",
    dataIndex: "country",
    key: "country",
    render: (text, record) => {
      return CountryMap.get(record.country);
    },
  },
  {
    title: "组别",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "自我介绍连接",
    dataIndex: "introductionVideoLink",
    key: "introductionVideoLink",
    render: (text, record) => {
      return (
        <div>
          <a href={record.introductionVideoLink} target="_blank">
            <Button type="link">VIDEO LINK</Button>
          </a>
          <br />
          <a href={record.introductionTextLink} target="_blank">
            <Button type="link">Text LINK</Button>
          </a>
        </div>
      );
    },
  },
  {
    title: "喜欢的文化主题",
    dataIndex: "preferCultureThemes",
    key: "preferCultureThemes",
    render: (text, record) => {
      return record.preferCultureThemes.map((item) => {
        return <Tag>{item.name}</Tag>;
      });
    },
  },
  {
    title: "创建时间",
    dataIndex: "createdTime",
    key: "createdTime",
    render: (text, record) => {
      return new Date(record.createdTime).toLocaleDateString();
    },
  },
];

const Grouping: FC = () => {
  const [load, setLoad] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [cultureThemes, setCultureThemes] = useState<CultureTheme[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUserPreferCultureThemes();
      const data: User[] = res.data;

      setUsers(data);
    };
    fetchUsers();
  }, [load]);
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
  }, []);

  const handleConfirmUpdatePassword = async (id: string, password: string) => {
    await updateUserPassword(id, password);
    message.success("修改成功，记得告诉用户！");
  };
  const handleClickDelete = async (userID: string) => {
    Modal.confirm({
      title: "确认删除该用户？",
      onOk: async () => {
        await removeUser(userID);
        message.success("删除成功！");
        setLoad(load + 1);
      },
    });
  };
  const handleClickUpdatePassword = async (userID: string) => {
    let input: string = "";
    Modal.info({
      title: "输入一个新密码",
      content: (
        <div>
          <Input
            onChange={(e) => {
              input = e.target.value;
            }}
            placeholder="在此输入新密码"
          />
        </div>
      ),
      onOk: () => {
        handleConfirmUpdatePassword(userID, input.trim());
      },
    });
  };
  const handleConfirmUpdateGroup = async (userID: string, group: string) => {
    await updateUserGroup(userID, group);
    message.success("修改成功！");
    setLoad(load + 1);
  };
  const handleClickUpdateGroup = async (userID: string) => {
    let group: string = "";
    Modal.info({
      title: "选择文化主题",
      content: (
        <div>
          <Select
            style={{ width: "200px" }}
            onChange={(val) => {
              group = val as string;
            }}
          >
            <Select.Option key="none" value={""}>
              无主题
            </Select.Option>
            {cultureThemes.map((item) => {
              return (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      ),
      closable: true,
      onOk: () => {
        handleConfirmUpdateGroup(userID, group);
      },
    });
  };

  const handleClickUpdateIntroTextLink = (user: User) => {
    let link = "";
    Modal.info({
      title: "设置自我介绍文本链接",
      content: (
        <div>
          <Input
            defaultValue={user.introductionTextLink}
            type="text"
            onChange={(e) => {
              link = e.target.value;
            }}
          />
        </div>
      ),
      onOk: async () => {
        await updateUserIntroTextLink(user._id, link);
        message.success("更新成功！");
        setLoad(load + 1);
      },
      closable: true,
    });
  };

  const handleClickUpdateIntroVideoLink = (user: User) => {
    let link = "";
    Modal.info({
      title: "设置自我介绍视频链接",
      content: (
        <div>
          <Input
            defaultValue={user.introductionVideoLink}
            type="text"
            onChange={(e) => {
              link = e.target.value;
            }}
          />
        </div>
      ),
      onOk: async () => {
        await updateUserIntroVideoLink(user._id, link);
        message.success("更新成功！");
        setLoad(load + 1);
      },
      closable: true,
    });
  };

  const handleChangeParticipateStatus = async (user: User, status: boolean) => {
    await updateUserParticipateStatus(user._id, status);
    message.success("更新成功!");
    setLoad(load + 1);
  };

  const tableColumns: TableColumnsType<User> = [
    ...columns,
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Switch
              checkedChildren="参加"
              unCheckedChildren="不参加"
              checked={record.participate}
              onChange={(checked: boolean) =>
                handleChangeParticipateStatus(record, checked)
              }
            />
            <Button
              type="primary"
              onClick={() => handleClickUpdateIntroTextLink(record)}
            >
              设置自我介绍文本
            </Button>
            <Button
              type="primary"
              onClick={() => handleClickUpdateIntroVideoLink(record)}
            >
              设置自我介绍视频
            </Button>
            <Button
              type="primary"
              onClick={() => handleClickUpdateGroup(record._id)}
            >
              设置组别
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleClickDelete(record._id)}
            >
              删除
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleClickUpdatePassword(record._id)}
            >
              修改密码
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          columns={tableColumns}
          rowKey={(record) => record._id}
          dataSource={users}
          pagination={false}
        />
      </Space>
    </div>
  );
};

export default Grouping;
