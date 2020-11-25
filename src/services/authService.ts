import axios from "../axiosInstance";

import { UserCredentialsType, UserInfoType } from "types";

class AuthService {
	public async signIn(credentials: UserCredentialsType) {
		return await axios.post("/auth/signin", credentials);
	}

	public async signUp(userData: UserInfoType) {
		return await axios.post("/auth/signup", userData);
	}

	public async refreshToken(refreshToken: string) {
		return await axios.post("/auth/refreshtoken", { refreshToken });
	}

	public async signOut(refreshToken: string) {
		return await axios.delete(`/auth/signout/${refreshToken}`);
	}
}

export default new AuthService();
