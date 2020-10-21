export const getToken = () => sessionStorage.getItem("access-token");

export const setToken = (token) => sessionStorage.setItem("access-token", token);

export const removeToken = () => sessionStorage.removeItem("access-token");
