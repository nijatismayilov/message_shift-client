export const getToken = () => localStorage.getItem("access-token");

export const setToken = (token) => localStorage.setItem("access-token", token);

export const removeToken = () => localStorage.removeItem("access-token");
