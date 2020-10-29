export const getAccessToken = () => localStorage.getItem("access-token");
export const getRefreshToken = () => localStorage.getItem("refresh-token");
export const getStaySignedId = () => localStorage.getItem("stay-signed-in");

export const setAccessToken = (token) => localStorage.setItem("access-token", token);
export const setRefreshToken = (token) => localStorage.setItem("refresh-token", token);
export const setStaySignedIn = (status) => localStorage.setItem("stay-signed-in", status);

export const removeAccessToken = () => localStorage.removeItem("access-token");
export const removeRefreshToken = () => localStorage.removeItem("refresh-token");
export const removeStaySignedIn = () => localStorage.removeItem("stay-signed-in");
