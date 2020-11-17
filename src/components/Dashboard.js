import { Card, Col, Row } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashCard from "./DashCard";
const Dashboard = () => {
  const { current } = useContext(AuthContext);

  const { loggedInUser } = current.context;

  return (
    <Card
      headStyle={{ fontWeight: 700, fontSize: "18px" }}
      style={{ margin: '20px auto' }}
      title={`Hello ${loggedInUser.username}`}
    >
      <Row justify="space-around" style={{marginBottom: '16px'}}>
      <Col span={8}>
          <DashCard
            title="Today"
            earned="500"
            commission="250"
            paid="0"
          />
        </Col>

        <Col span={8}>
          <DashCard
            title="This Month"
            earned="5000"
            commission="2500"
            paid="2000"
          />
        </Col>

        <Col span={8}>
          <DashCard
            title="Total"
            earned="20000"
            commission="10000"
            paid="8000"
          />
        </Col>
      </Row>


    </Card>
  );
};

export default Dashboard;
