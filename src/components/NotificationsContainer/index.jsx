import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";

import Notification from "components/Notification";

import "./styles.scss";

const NotificationsContainer = (props) => {
	const { notifications } = props;

	return ReactDOM.createPortal(
		<ul className='notifications-container'>
			<AnimatePresence>
				{notifications.map((notification) => (
					<Notification
						key={notification.id}
						id={notification.id}
						message={notification.message}
						type={notification.type}
					/>
				))}
			</AnimatePresence>
		</ul>,
		document.getElementById("notifications-root")
	);
};

export default NotificationsContainer;
