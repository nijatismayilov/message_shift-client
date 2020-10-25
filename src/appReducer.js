export const init = {
	notifications: [],
};

export const actions = {
	addNotification: (newNotification) => ({
		type: "ADD_NOTIFICATION",
		payload: newNotification,
	}),
	removeNotification: (id) => ({
		type: "REMOVE_NOTIFICATION",
		payload: id,
	}),
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_NOTIFICATION":
			return {
				...state,
				notifications: [...state.notifications, action.payload],
			};

		case "REMOVE_NOTIFICATION":
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
