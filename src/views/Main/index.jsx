import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { fetchUserStart, logoutUserStart } from "store/user/actions";

import pageTransition from "animations/pageTransition";

import "./styles.scss";

const Main = () => {
	const dispatch = useDispatch();

	const fade = useSpring(pageTransition);

	const handleFetchUser = () => dispatch(fetchUserStart());
	const handleLogout = () => dispatch(logoutUserStart());

	const onMount = () => {
		handleFetchUser();
	};

	useEffect(onMount, []);

	return (
		<animated.div style={fade} className='app-main'>
			Main
			<button onClick={handleLogout}>Sign Out</button>
		</animated.div>
	);
};

export default Main;
