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
      return CountryMap.get(record.user.country);
    },
  },
  {
    title: "作品复杂度",
    dataIndex: "worksComplexity",
    key: "worksComplexity",
    render: function (text: any, record: UserWithWorks) {
      const works = record.works;
      const renderScenes = (scenes: any) => {
        return Object.values(scenes).map((scene: any, index: number) => {
          return (
            <div key={index}>
              场景 {index + 1}, 热点数: {scene.hotSpots.length}
            </div>
          );
        });
      };
      const renderWorksComplexity = () => {
        return works.map((work: any, index: number) => {
          let scenes;
          scenes = work.panoramaTourConfig?.scenes;

          return (
            <div key={work._id}>
              作品: {work.workName}
              <div>{scenes && renderScenes(scenes)}</div>
            </div>
          );
        });
      };
      return <div>{renderWorksComplexity()}</div>;
    },
  },
];
const UsersWorks: FC = () => {
  const { clientHost } = useContext(SettingsContext);
  const tableColumns = [
    ...columns,
    {
      title: "作品链接",
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
        console.log(res.data);
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
