import axios from "../axiosInstance";

import { UserCredentials, UserInfo } from "types/User";

class AuthService {
	public async signIn(credentials: UserCredentials) {
		const res = await axios.post("/auth/signin", credentials);
		return res;
	}

	public async signUp(userData: UserInfo) {
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
