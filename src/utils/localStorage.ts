export const getAccessToken = () => localStorage.getItem("access-token");
export const getRefreshToken = () => localStorage.getItem("refresh-token");

export const setAccessToken = (token: string) => localStorage.setItem("access-token", token);
export const setRefreshToken = (token: string) => localStorage.setItem("refresh-token", token);

export const removeAccessToken = () => localStorage.removeItem("access-token");
export const removeRefreshToken = () => localStorage.removeItem("refresh-token");
