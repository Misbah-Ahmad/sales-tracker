import {v4 as uuid} from "uuid";
import { machineStates } from "../statecharts/states";

const storageKeys = {
  IS_LOGGED_IN: "isLoggedIn",
  USERS: "users",
  LOGGED_IN_USER: "loggedInUser",
  SERVICE_LIST: "serviceList",
  SALES: "sales",
  PREVIOUS_STATE: "previousState",
};

export const getIsLoggedIn = () =>
  localStorage.getItem("isLoggedIn") === "true";
export const saveIsLoggedIn = (isLoggedIn) =>
  localStorage.setItem("isLoggedIn", isLoggedIn);

export const saveLoggedInUserInfo = (user) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const loggedInUser =
    user?.username && users
      ? users.find((currentUser) => currentUser.username === user.username)
      : null;

  if (loggedInUser && loggedInUser.username) {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    saveIsLoggedIn(true);
  } else {
    localStorage.setItem("loggedInUser", null);
    saveIsLoggedIn(false);
  }
};

export const getLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return getIsLoggedIn() && user?.username ? user : null;
};

export const authorizeUser = async (username, password) => {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const users = JSON.parse(localStorage.getItem("users"));
  const isSuccess =
    users &&
    users.find(
      (user) => user.username === username && user.password === password
    );
  return isSuccess?.username ? isSuccess : null;
};

const serviceList = [
  { key: "Form", name: "Form Fillup" },
  { key: "Printing", name: "Printing" },
  { key: "Type", name: "Word Type" },
  { key: "CV", name: "CV/Biodata" },
  { key: "Thesis", name: "Thesis/Assignment" },
];

export const insertServices = () => {
  localStorage.setItem(storageKeys.SERVICE_LIST, JSON.stringify(serviceList));
  return serviceList;
};

export const getServiceList = () => {
  const services = JSON.parse(localStorage.getItem(storageKeys.SERVICE_LIST));
  return services ? services : insertServices();
};

export const insertNewSale = async ({service, price, userId}) => {

  await new Promise(resolve => setTimeout(resolve, 2000));

  const newSale = {
    id: uuid(),
    service,
    price,
    userId,
    datetime: new Date().getTime(),
  };

  let sales = JSON.parse(localStorage.getItem(storageKeys.SALES));

  if (sales && Array.isArray(sales)) {
    sales.push(newSale);
  } else {
    sales = [newSale];
  }

  localStorage.setItem(storageKeys.SALES, JSON.stringify(sales));
  return newSale;
}

export const getSalesData = (userId) => {
  let salesData = JSON.parse(localStorage.getItem(storageKeys.SALES));

  if (salesData && Array.isArray) {
    salesData = salesData.filter(data => data.userId === userId);
    salesData = {sales: salesData};
  } else {
    salesData = {sales: []};
  }

  return salesData;
}

export const getPreviousState = () => {
  let pState = localStorage.getItem(storageKeys.PREVIOUS_STATE);
  console.log(pState);
  return machineStates.includes(pState) ? pState : "DASHBOARD";
}

export const setPreviousState = state => localStorage.setItem(storageKeys.PREVIOUS_STATE, state);