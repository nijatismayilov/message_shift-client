import React from "react";

import { Notification } from "types/Notification";

type AppState = {
	notifications: Notification[];
};

enum ActionTypes {
	ADD_NOTIFICATION = "ADD_NOTIFICATION",
	REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
}

interface AddNotification {
	type: ActionTypes.ADD_NOTIFICATION;
	payload: Notification;
}

interface RemoveNotification {
	type: ActionTypes.REMOVE_NOTIFICATION;
	payload: string;
}

type Action = AddNotification | RemoveNotification;

const addNotification = (newNotification: Notification): Action => ({
	type: ActionTypes.ADD_NOTIFICATION,
	payload: newNotification,
});

const removeNotification = (id: string): Action => ({
	type: ActionTypes.REMOVE_NOTIFICATION,
	payload: id,
});

export const actions = {
	addNotification,
	removeNotification,
};

export const initialState: AppState = {
	notifications: [],
};

export const reducer: React.Reducer<AppState, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.ADD_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications, action.payload],
			};

		case ActionTypes.REMOVE_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.filter(
					(notification) => notification.id !== action.payload
				),
			};

		default:
			return state;
	}
};
