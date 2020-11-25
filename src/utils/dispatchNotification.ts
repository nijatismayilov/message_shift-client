import eventBus from "eventBus";

import generateKey from "./generateKey";

import { Notification, NotificationTypes } from "types/Notification";

const dispatchNotification = (info = "default", type: NotificationTypes, message: string) => {
	const notification: Notification = {
		id: generateKey(info),
		type,
		message,
	};

	eventBus.dispatch("new-notification", notification);
};

export default dispatchNotification;
