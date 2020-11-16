import { Card, Typography } from "antd";

const DashCard = ({title, earned, commission, paid}) => {
  const { Text } = Typography;
  const subCardHeadStyle = { fontWeight: 600, fontSize: "14px" };

  return (
    <Card headStyle={subCardHeadStyle} title={title}>
      <p>
        <Text strong>Earned:</Text> {earned}
      </p>
      <p>
        <Text strong>Commission:</Text> {commission}
      </p>
      <p>
        <Text strong>Paid:</Text> {paid}
      </p>
    </Card>
  );
};

export default DashCard;
