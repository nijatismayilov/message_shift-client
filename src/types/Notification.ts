export interface NotificationIcons {
	successIcon: string;
	infoIcon: string;
	warningIcon: string;
	errorIcon: string;
}

export enum NotificationTypes {
	SUCCESS = "SUCCESS",
	INFO = "INFO",
	WARNING = "WARNING",
	ERROR = "ERROR",
}

export interface Notification {
	id: string;
	type: NotificationTypes;
	message: string;
}
