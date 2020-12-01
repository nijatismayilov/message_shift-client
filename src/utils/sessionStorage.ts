export const getAccessToken = () => sessionStorage.getItem("access-token");
export const getRefreshToken = () => sessionStorage.getItem("refresh-token");

export const setAccessToken = (token: string) => sessionStorage.setItem("access-token", token);
export const setRefreshToken = (token: string) => sessionStorage.setItem("refresh-token", token);

export const removeAccessToken = () => sessionStorage.removeItem("access-token");
export const removeRefreshToken = () => sessionStorage.removeItem("refresh-token");
