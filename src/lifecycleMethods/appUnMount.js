import eventBus from "eventBus";

const appUnMount = (newNotificationAction, removeNotificationAction, handleUserLogout) => {
	eventBus.remove("new-notification", newNotificationAction);
	eventBus.remove("remove-notification", removeNotificationAction);

	handleUserLogout();
};

export default appUnMount;
