import { NotificationIcons, NotificationTypes } from "types/Notification";

const renderIcon = (type: string, icons: NotificationIcons): string => {
	switch (type) {
		case NotificationTypes.SUCCESS:
			return icons.successIcon;

		case NotificationTypes.INFO:
			return icons.infoIcon;

		case NotificationTypes.WARNING:
			return icons.warningIcon;

		case NotificationTypes.ERROR:
			return icons.errorIcon;

		default:
			return "";
	}
};

export default renderIcon;
