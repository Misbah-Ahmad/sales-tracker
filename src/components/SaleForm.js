import { Card, Input, Select, InputNumber, Button, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { machineEvents } from "../statecharts/machine";

const SaleForm = ({isLoading}) => {

  const { Option } = Select;

  const { current, sendEvent } = useContext(AuthContext);
  const { serviceList, loggedInUser, operationResult } = current.context;

  const [selectedService, setselectedService] = useState(serviceList[0].key);
  const [price, setPrice] = useState(parseInt((Math.random() * 100) + 50));

  const handleSubmit = () => {
    if (!selectedService || typeof price != "number" || price < 1) {
      message.error("Enter correct value please!");
      return;
    }

    const { userId } = loggedInUser;
    sendEvent(machineEvents.INSERT_NEW_SALE, {
      service: selectedService,
      price,
      userId,
    });
  };

  useEffect(() => {
      const key = "key";
      const duration = 3;
      if (isLoading) {
        message.loading({content: "Saving New Data", key})
      } else if (!isLoading && operationResult && operationResult.message) {
        if (operationResult.success) {
          message.success({content: operationResult.message, key, duration});
        } else {
          message.error({content: operationResult.message, key, duration});
        }
        sendEvent(machineEvents.CLEAR_MESSAGE);
      }

  }, [operationResult, isLoading, sendEvent])


  return (
    <Card 
      style={{
        margin: "20px auto 20px auto",
        minWidth: "200px",
        maxWidth: "500px",
        zIndex: 1,
      }}
      loading={isLoading}
      bodyStyle={{ padding: "30px" }}
      title="Enter New Sale"
    >
      <Input.Group compact>
        <Select
          onChange={(value) => setselectedService(value)}
          defaultValue={selectedService}
          style={{ width: "40%" }}
        >
          {serviceList &&
            serviceList.map((service) => (
              <Option key={service.key} value={service.key}>
                {service.name}
              </Option>
            ))}
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

        <Button onClick={handleSubmit} style={{ width: "20%" }} type="primary">
          Submit
        </Button>
      </Input.Group>
    </Card>
  );
};

export default SaleForm;
