import { Modal, Input, Select, InputNumber, Button, message } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { machineEvents } from "../statecharts/machine";
const SaleForm = () => {
  const { Option } = Select;
  const { current, sendEvent } = useContext(AuthContext);

  const [serviceName, setServiceName] = useState("Form");
  const [price, setPrice] = useState(50);

  const handleSubmit = () => {
    setTimeout(() => {
      sendEvent(machineEvents.CLOSE_NEW_SALE);
    }, 2000);

    // if (!serviceName || !isNaN(price) || price < 1) {
    //   message.error("Enter correct value please!");
    //   return;
    // }
  };

  const { isCheckoutModalVisible } = current.context;

  const handleCancel = () => {
    sendEvent(machineEvents.CLOSE_NEW_SALE);
  };

  return (
    <Modal
      visible={isCheckoutModalVisible}
      title="Enter New Sale"
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Input.Group compact>
        <Select
          onChange={(value) => setServiceName(value)}
          defaultValue={serviceName}
          style={{ width: "40%" }}
        >
          <Option value="Form">Form Fillup</Option>
          <Option value="Printing">Printing</Option>
          <Option value="Type">Word Type</Option>
          <Option value="CV">CV/Biodata</Option>
          <Option value="Thesis">Thesis/Assignment</Option>
        </Select>

        <InputNumber
          style={{ width: "40%" }}
          defaultValue={price}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={(value) => setPrice(value)}
        />

        <Button
          onClick={handleSubmit}
          style={{ width: "20%" }}
          type="primary"
        >
          Submit
        </Button>
      </Input.Group>
    </Modal>
  );
};

export default SaleForm;
