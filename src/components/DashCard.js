import { Statistic, Tag, Row, Col } from "antd";

const DashCard = ({ title, earned, commission, paid }) => {

//  const subCardHeadStyle = { fontWeight: 600, fontSize: "14px" };
  const statValueStyle = {fontSize: '20px', fontWeight: 600};
  return (
    <>
    <Row justify="start">
        <Col span={6}>
          <Tag color="#108ee9">{title}</Tag>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col span={8}>
          <Statistic valueStyle={statValueStyle} title="Earned" value={`৳ ${earned}`} />
        </Col>

        <Col span={8}>
          <Statistic valueStyle={statValueStyle} title="Commission" value={`৳ ${commission}`} />
        </Col>

        <Col span={8}>
          <Statistic valueStyle={statValueStyle} title="Paid" value={`৳ ${paid}`} />
        </Col>
      </Row>
      </>
  );
};

export default DashCard;
