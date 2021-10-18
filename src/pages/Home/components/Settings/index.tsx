import { FC, useEffect, useState } from "react";
import { Row, Col, Switch, message } from "antd";
import classes from "./style.module.css";
import { getSettings, Settings, updateSettings } from "../../services/index";
type SettingName =
  | "showFriends"
  | "showPlayground"
  | "showSettings"
  | "showStudio";
const SystemSetting: FC = () => {
  const [load, setLoad] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>();

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await getSettings();
      const data: Settings = res.data;
      setSettings({
        showFriends: data.showFriends,
        showPlayground: data.showPlayground,
        showSettings: data.showSettings,
        showStudio: data.showStudio,
      });
    };
    fetchSettings();
  }, [load]);

  const handleSwitchChange = async (key: SettingName, show: boolean) => {
    if (settings) {
      await updateSettings({ ...settings, [key]: show });
      message.success("更新成功！");
      setLoad(load + 1);
    }
  };

  const renderSwitches = () => {
    if (!settings) return null;
    return Object.keys(settings).map((item) => {
      return (
        <Row className={classes.row} key={item}>
          <Col>
            <strong>{item}: </strong>
            <Switch
              onChange={(checked: boolean) =>
                handleSwitchChange(item as SettingName, checked)
              }
              checkedChildren="显示"
              unCheckedChildren="不显示"
              checked={settings[item as SettingName]}
            />
          </Col>
        </Row>
      );
    });
  };
  return <div className={classes.wrapper}>{settings && renderSwitches()}</div>;
};

export default SystemSetting;
