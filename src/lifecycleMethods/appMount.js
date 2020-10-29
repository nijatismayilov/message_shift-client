import eventBus from "eventBus";

const appMount = (newNotificationAction, removeNotificationAction) => {
	eventBus.on("new-notification", newNotificationAction);
	eventBus.on("remove-notification", removeNotificationAction);
};

export default appMount;
