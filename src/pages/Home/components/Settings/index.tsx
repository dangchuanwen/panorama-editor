import { FC, useEffect, useState } from "react";
import { Switch, message, Input, Button, Form } from "antd";
import classes from "./style.module.css";
import { getSettings, Settings, updateSettings } from "../../services/index";

const SystemSetting: FC = () => {
  const [load, setLoad] = useState<number>(0);
  const [form] = Form.useForm();
  const handleSubmit = async (values: Settings) => {
    await updateSettings(values);
    message.success("更新成功！");
    setLoad(load + 1);
  };
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await getSettings();
      const data: Settings = res.data;
      form.setFieldsValue(data);
    };
    fetchSettings();
  }, [load, form]);

  return (
    <div className={classes.wrapper}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="分组已完成" name="grouped" valuePropName="checked">
          <Switch checkedChildren="已完成" unCheckedChildren="未完成" />
        </Form.Item>
        <Form.Item label="伙伴菜单" name="showFriends" valuePropName="checked">
          <Switch checkedChildren="显示" unCheckedChildren="不显示" />
        </Form.Item>
        <Form.Item
          label="作品广场菜单"
          name="showPlayground"
          valuePropName="checked"
        >
          <Switch checkedChildren="显示" unCheckedChildren="不显示" />
        </Form.Item>
        <Form.Item
          label="个人设置菜单"
          name="showSettings"
          valuePropName="checked"
        >
          <Switch checkedChildren="显示" unCheckedChildren="不显示" />
        </Form.Item>
        <Form.Item
          label="制作工作间菜单"
          name="showStudio"
          valuePropName="checked"
        >
          <Switch checkedChildren="显示" unCheckedChildren="不显示" />
        </Form.Item>
        <Form.Item label="七牛云图片前缀" name="qiniuFilePrefix">
          <Input />
        </Form.Item>
        <Form.Item label="客户端地址" name="clientHost">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SystemSetting;
