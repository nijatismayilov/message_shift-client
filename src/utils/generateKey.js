const generateKey = (info = "info") => {
	return `${new Date().getTime().toString(16)}-${info}-${(Math.random() * 10).toString(16)}`;
};

export default generateKey;
