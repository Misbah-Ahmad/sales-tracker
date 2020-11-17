import {
  authorizeUser,
  getIsLoggedIn,
  getLoggedInUser,
  getSalesData,
  getServiceList,
  insertNewSale,
} from "../Data/repo";

const { Machine, assign } = require("xstate");

const getInitialState = () => {
  const state = getIsLoggedIn() === true ? "DASHBOARD" : "LOGIN_PAGE";
  return state;
};
const loginService = async (_context, event) => {
  const user = await authorizeUser(event.username, event.password);
  if (user) {
    return user;
  }
  throw Error("Invalid Login Attempt");
};

const insertNewSaleService = async (context, event) => {
  const newSale = await insertNewSale({
    ...event,
    userId: context.loggedInUser.id,
  });
  if (newSale && newSale.id) {
    return newSale;
  }
  throw Error("Could not insert new sale");
};

const newSaleMachine = {
  id: "newSale",
  src: insertNewSaleService,
  onDone: {
    target: "NEW_SALE_FORM",
    actions: [
      assign({
        salesData: (context, _event) => {
          return getSalesData(context.loggedInUser.id);
        },
        operationResult: {
          success: true,
          message: "Saved New Data Successfully!",
        },
      }),
    ],
  },
  onError: {
    target: "NEW_SALE_FORM",
    actions: assign({
      operationResult: { success: false, message: "Something Went Wrong!" },
    }),
  },
};

const appMachine = new Machine(
  {
    id: "app",
    context: {
      isLoggedIn: getIsLoggedIn(),
      loggedInUser: getLoggedInUser(),
      serviceList: getServiceList(),
      operationResult: null,
      salesData: {},
    },
    initial: getInitialState(),
    states: {
      LOGIN_PAGE: {
        on: {
          LOGIN: {
            target: "LOGGING_IN",
            cond: "isNotLoggedIn",
          },
          GOTO_LOGIN: "LOGIN_PAGE",
        },
      },
      LOGGING_IN: {
        invoke: {
          id: "loginService",
          src: loginService,
          onDone: {
            target: "DASHBOARD",
            actions: assign({
              isLoggedIn: true,
              loggedInUser: (_context, event) => event.data,
              salesData: (_context, event) => {
                return getSalesData(event.data.id);
              },
            }),
          },
          onError: {
            target: "LOGIN_PAGE",
          },
        },
      },
      DASHBOARD: {
        on: {
          LOGOUT: {
            target: "LOGIN_PAGE",
            cond: "isLoggedIn",
            actions: assign({ isLoggedIn: false, loggedInUser: null }),
          },
          GOTO_LOGIN: {},
          SEE_REPORT: {
            target: "REPORT",
          },
          ENTER_NEW_SALE: {
            target: "NEW_SALE_FORM",
          },
        },
      },
      REPORT: {
        on: {
          ENTER_NEW_SALE: {
            target: "NEW_SALE_FORM",
          },
          LOGOUT: {
            target: "LOGIN_PAGE",
            cond: "isLoggedIn",
            actions: assign({ isLoggedIn: false, loggedInUser: null }),
          },
          GOTO_DASHBOARD: {
            target: "DASHBOARD",
          },
        },
      },
      NEW_SALE_FORM: {
        on: {
          INSERT_NEW_SALE: {
            target: "INSERTING_NEW_SALE",
          },
          CLEAR_MESSAGE: {
            actions: "clearOperationMessage",
          },
          GOTO_DASHBOARD: "DASHBOARD",
          SEE_REPORT: "REPORT",
          LOGOUT: {
            target: "LOGIN_PAGE",
            cond: "isLoggedIn",
            actions: assign({ isLoggedIn: false, loggedInUser: null }),
          },
        },
      },
      INSERTING_NEW_SALE: {
        invoke: newSaleMachine,
      },
    },
  },
  {
    actions: {
      clearOperationMessage: assign({ operationResult: null }),
    },
    guards: {
      isNotLoggedIn: (context, _event) => context.isLoggedIn === false,
      isLoggedIn: (context, _event) => context.isLoggedIn === true,
    },
  }
);

export default appMachine;

export const machineEvents = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  GOTO_LOGIN: "GOTO_LOGIN",
  SEE_REPORT: "SEE_REPORT",
  ENTER_NEW_SALE: "ENTER_NEW_SALE",
  GOTO_DASHBOARD: "GOTO_DASHBOARD",
  INSERT_NEW_SALE: "INSERT_NEW_SALE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
};
