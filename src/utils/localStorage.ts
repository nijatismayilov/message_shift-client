export const getAccessToken = (): string | null => localStorage.getItem("access-token");
export const getRefreshToken = (): string | null => localStorage.getItem("refresh-token");
export const getStaySignedId = (): string | null => localStorage.getItem("stay-signed-in");

export const setAccessToken = (token: string): void => localStorage.setItem("access-token", token);
export const setRefreshToken = (token: string): void =>
	localStorage.setItem("refresh-token", token);
export const setStaySignedIn = (status: boolean): void =>
	localStorage.setItem("stay-signed-in", JSON.stringify(status));

export const removeAccessToken = (): void => localStorage.removeItem("access-token");
export const removeRefreshToken = (): void => localStorage.removeItem("refresh-token");
export const removeStaySignedIn = (): void => localStorage.removeItem("stay-signed-in");
