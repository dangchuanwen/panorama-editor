import { FC, useContext } from "react";
import { Row, Col, Typography, Form, Input, Button, message } from "antd";

import classes from "./style.module.css";
import { AuthContext } from "../../auth";

type FormDto = {
  username: string;
  password: string;
}

const SignIn: FC = () => {
  const { login } = useContext(AuthContext)
  const onFinish = async (values: FormDto) => {
    await login(values.username, values.password);
    message.success("登录成功！")
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row justify="center" className={classes.title}>
        <Col>
          <Typography.Title>管理员登录</Typography.Title>
        </Col>
      </Row>
      <Row justify="center">
      <Col>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
