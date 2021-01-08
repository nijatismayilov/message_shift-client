import { v4 as getUUID } from "uuid";

const generateKey = (): string => {
	const key = getUUID();

	return key;
};

export default generateKey;
