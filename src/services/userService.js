import axios from "../axios";

const loadDetails = async () => await axios.get("users/loaddetails");

export default {
	loadDetails,
};
