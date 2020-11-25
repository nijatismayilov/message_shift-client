import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";

import NotificationComponent from "components/Notification";

import { Notification } from "types/Notification";

import "./styles.scss";

interface Props {
	notifications: Notification[];
}

const NotificationsContainer: React.FC<Props> = (props) => {
	const { notifications } = props;

	return ReactDOM.createPortal(
		<ul className='notifications-container'>
			<AnimatePresence>
				{notifications.map((notification: Notification) => (
					<NotificationComponent
						key={notification.id}
						id={notification.id}
						message={notification.message}
						type={notification.type}
					/>
				))}
			</AnimatePresence>
		</ul>,
		document.getElementById("notifications-root")!
	);
};

export default NotificationsContainer;
