function getUserToken(){
    return localStorage.getItem("token");
};

function setUserToken(token){
    return localStorage.setItem("token", token);
};

function clearUserToken(){
    return localStorage.setItem("token", "");
};

export { getUserToken, setUserToken, clearUserToken };
