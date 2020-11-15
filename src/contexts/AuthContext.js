import { createContext, useEffect, useState } from "react";
import { getIsLoggedIn, getLoggedInUser, saveIsLoggedIn, saveLoggedInUserInfo } from "../Data/repo";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());
    useEffect(() => {
        saveIsLoggedIn(isLoggedIn);
        if (!isLoggedIn) {
            setLoggedInUser(null);
        }
    }, [ isLoggedIn ]);

    const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser());
    useEffect(() => {
        saveLoggedInUserInfo(loggedInUser);
    }, [loggedInUser])

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;