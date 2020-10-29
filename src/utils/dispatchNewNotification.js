import eventBus from "eventBus";

import generateKey from "./generateKey";

const dispatchCustomEvent = (info, type, message) => {
	const newNotification = {
		id: generateKey(info),
		type,
		message,
	};

	eventBus.dispatch("new-notification", newNotification);
};

export default dispatchCustomEvent;
