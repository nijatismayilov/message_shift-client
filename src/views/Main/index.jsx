import React from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { logout } from "store/user/actions";

import pageTransition from "animations/pageTransition";

import "./styles.scss";

const Main = () => {
	const dispatch = useDispatch();

	const fade = useSpring(pageTransition);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<animated.div style={fade} className='app-main'>
			Main
			<button onClick={handleLogout}>Sign Out</button>
		</animated.div>
	);
};

export default Main;
