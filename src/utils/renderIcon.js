const renderIcon = (type, icons) => {
	const { successIcon, infoIcon, warningIcon, errorIcon } = icons;

	switch (type) {
		case "success":
			return successIcon;
		case "info":
			return infoIcon;
		case "warning":
			return warningIcon;
		case "error":
			return errorIcon;
		default:
			return "";
	}
};

export default renderIcon;
