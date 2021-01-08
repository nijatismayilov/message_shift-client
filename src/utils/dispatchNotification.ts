import eventBus from "eventBus";

import generateKey from "./generateKey";

import { Notification, NotificationTypes } from "types/Notification";

const dispatchNotification = (type: NotificationTypes, message: string) => {
	const notification: Notification = {
		id: generateKey(),
		type,
		message,
	};

	eventBus.dispatch("new-notification", notification);
};

export default dispatchNotification;
