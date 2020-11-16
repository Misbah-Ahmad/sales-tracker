import { Form, Input, Button, Checkbox, Card } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { machineEvents } from "../statecharts/machine";

const LoginForm = ({isLoading}) => {
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const { sendEvent } = useContext(AuthContext);

  const attemptLogin = ({ username, password }) => {
    
    sendEvent(machineEvents.LOGIN, {username, password})

  };

  return (
    <Card
      style={{
        margin: "20px auto 20px auto",
        minWidth: "200px",
        maxWidth: "500px",
      }}
      loading={isLoading}
      bodyStyle={{ padding: "30px" }}
      title="Login Form"
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={attemptLogin}
        onFinishFailed={() => {
          console.log("Failed");
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
