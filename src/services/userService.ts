import axios from "../axiosInstance";

class UserService {
	public async loadDetails() {
		return await await axios.get("users/loaddetails");
	}
}

export default new UserService();
