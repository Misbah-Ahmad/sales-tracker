export const employeeSalesHistoryTableColumns = [
  {
    title: "Service/Product",
    dataIndex: "service",
    sorter: {
      compare: (a, b) => (a.service < b.service ? -1 : 1),
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: {
      compare: (a, b) => a.price - b.price,
    },
  },
  {
    title: "Charge",
    dataIndex: "charge",
    sorter: {
      compare: (a, b) => a.charge - b.charge,
    },
  },
  {
    title: "Date",
    dataIndex: "datetime",
    sorter: {
      compare: (a, b) => (a.datetime < b.datetime ? -1 : 1),
    },
  },
];
