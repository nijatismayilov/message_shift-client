import axios from "../axios";

const signIn = async (credentials) => await axios.post("Users/SignIn", credentials);

const signUp = async (userData) => await axios.post("Users/SignUp", userData);

const loadDetails = async () => await axios.get("Users/LoadDetails");

export default {
	signIn,
	signUp,
	loadDetails,
};
