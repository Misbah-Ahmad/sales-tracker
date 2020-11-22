import { Card, Table } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { employeeSalesHistoryTableColumns } from "../Data/tableUtils";

const SaleHistory = () => {
  const { current } = useContext(AuthContext);
  const { segmentedSalesData } = current.context;

  const columns = employeeSalesHistoryTableColumns;
  const formatDateTime = (dateObject) =>
    `${dateObject.getDate()}/${
      dateObject.getMonth() + 1
    }/${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;

  const data = segmentedSalesData.map(({id, service, price, charge, datetime }) => {

    return {
      key: id,
      service,
      price,
      charge,
      datetime: formatDateTime(new Date(datetime)),
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Card
      style={{ margin: "20px auto" }}
      headStyle={{ fontWeight: 700 }}
      title="Sales History"
    >
      <Table bordered={true} columns={columns} dataSource={data} onChange={onChange} />
    </Card>
  );
};

export default SaleHistory;
