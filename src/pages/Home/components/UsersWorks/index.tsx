/* eslint-disable react/jsx-no-target-blank */
import { Button, Table, TableColumnsType } from "antd";
import { FC, useEffect, useState, useContext } from "react";
import { SettingsContext } from "../../../../contexts/settings";
import {
  Country,
  Gender,
  getAllUsersWorks,
  UserWithWorks,
} from "../../services";
import styles from "./style.module.css";

const GenderMap: Map<Gender, string> = new Map();
GenderMap.set(Gender.Female, "女");
GenderMap.set(Gender.Male, "男");

const CountryMap: Map<Country, string> = new Map();
CountryMap.set(Country.China, "中国");
CountryMap.set(Country.Indonesia, "印度尼西亚");
CountryMap.set(Country.Uzbekistan, "乌兹别克斯坦");

const columns: TableColumnsType<UserWithWorks> = [
  {
    title: "用户名",
    dataIndex: "userName",
    key: "userName",
    render: function (_, record: UserWithWorks) {
      return record.user.userName;
    },
  },
  {
    title: "国家",
    dataIndex: "country",
    key: "country",
    render: function (text: any, record: UserWithWorks) {
      return CountryMap.get(text);
    },
  },
];
const UsersWorks: FC = () => {
  const { clientHost } = useContext(SettingsContext);
  const tableColumns = [
    ...columns,
    {
      title: "作品",
      dataIndex: "works",
      key: "works",
      render: function (text: any, record: UserWithWorks) {
        const userWorks = record.works;
        return userWorks.map((work) => {
          return (
            <div key={work._id}>
              <Button>
                <a href={`${clientHost}/play/${work._id}`} target="_blank">
                  {work.workName}
                </a>
              </Button>
            </div>
          );
        });
      },
    },
  ];
  const [usersWithWorks, setUsersWithWorks] = useState<UserWithWorks[]>([]);
  useEffect(() => {
    const fetchUsersWithWorks = async () => {
      const res = await getAllUsersWorks();
      if (res && res.data) {
        setUsersWithWorks(res.data);
      }
    };
    fetchUsersWithWorks();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Table dataSource={usersWithWorks} rowKey="_id" columns={tableColumns} />;
    </div>
  );
};

export default UsersWorks;
