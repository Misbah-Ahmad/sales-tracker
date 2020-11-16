export const getIsLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
export const saveIsLoggedIn = isLoggedIn => localStorage.setItem("isLoggedIn", isLoggedIn);

export const saveLoggedInUserInfo = (user) => {

    const users = JSON.parse(localStorage.getItem("users"));
    const loggedInUser = user?.username && users ? users.find(currentUser => currentUser.username === user.username) : null;
    
    if (loggedInUser && loggedInUser.username) {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        saveIsLoggedIn(true);
    } else {
        localStorage.setItem("loggedInUser", null);
        saveIsLoggedIn(false);            
    }

}


export const getLoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    return getIsLoggedIn() && user?.username ? user : null;
}

export const authorizeUser = async (username, password) => {
    console.log('before sleep');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('after sleep');
    const users = JSON.parse(localStorage.getItem("users"));
    const isSuccess = users && users.find(user => user.username === username && user.password === password);
    return isSuccess?.username ? isSuccess : null;
}
