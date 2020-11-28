import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { fetchUserStart, logoutUserStart } from "store/user/actions";

import fadeConfig from "animation/fade";

import "./styles.scss";

const Main: React.FC = () => {
	const dispatch = useDispatch();

	const fade = useSpring(fadeConfig);

	const handleMount = () => {
		dispatch(fetchUserStart());
	};

	const handleLogout = () => {
		dispatch(logoutUserStart());
	};

	useEffect(handleMount, []);

	return (
		<animated.div style={fade} className='app-main d-flex flex-column align-center justify-evenly'>
			<div className='d-flex'>
				Main
				<button onClick={handleLogout}>Sign Out</button>
			</div>
		</animated.div>
	);
};

export default Main;
