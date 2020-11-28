const getClass = (condition: boolean, classNameMain: string, classNameSecondary = ""): string => {
	if (condition) return classNameMain;
	else return classNameSecondary;
};

export default getClass;
