import { Card, Col, Row } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
const Dashboard = () => {
  
    const { loggedInUser } = useContext(AuthContext);
  
    return (
    <Card title={`Hello ${loggedInUser.username}`}>
        <Row gutter={16}>
        <Col span={8}>
            <Card title="Total Earned">
            5000
            </Card>
        </Col>
        <Col span={8}>
            <Card title="This Month">
            2000
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Today">
            300
            </Card>
        </Col>
        </Row>
    </Card>
  );
};

export default Dashboard;
