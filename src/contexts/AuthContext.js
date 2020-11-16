import { useMachine } from "@xstate/react";
import { createContext, useEffect } from "react";
import { saveIsLoggedIn, saveLoggedInUserInfo } from "../Data/repo";
import appMachine from "../statecharts/machine";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [current, sendEvent] = useMachine(appMachine);

    const {isLoggedIn, loggedInUser } = current.context;
    console.log(current);
    useEffect(() => {
        saveIsLoggedIn(isLoggedIn);
    }, [ isLoggedIn ]);

    useEffect(() => {
        saveLoggedInUserInfo(loggedInUser);
    }, [loggedInUser])


    return (
        <AuthContext.Provider value={{ current, sendEvent }}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;