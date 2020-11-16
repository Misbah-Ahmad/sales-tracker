import { authorizeUser, getIsLoggedIn, getLoggedInUser } from "../Data/repo";

const { Machine, assign } = require("xstate");

const getInitialState = () => {
  const state = getIsLoggedIn() === true ? "DASHBOARD" : "LOGIN_PAGE";
  console.log(state);
  return state;
};
const loginService = async (_context, event) => {
  const user = await authorizeUser(event.username, event.password);
  if (user) {
    return user;
  }
  throw Error("Invalid Login Attempt");
};

const appMachine = new Machine(
  {
    id: "app",
    context: {
      isLoggedIn: getIsLoggedIn(),
      loggedInUser: getLoggedInUser(),
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
        },
      },
    },
  },
  {
    actions: {},
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
};
