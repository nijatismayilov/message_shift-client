import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { fetchUserStart, logoutUserStart } from "store/user/actions";

import "./styles.scss";

const Main = () => {
	const dispatch = useDispatch();

	const fade = useSpring({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	});

	const handleFetchUser = () => {
		dispatch(fetchUserStart());
	};

	const handleLogout = () => {
		dispatch(logoutUserStart());
	};

	useEffect(handleFetchUser, []);

	return (
		<animated.div style={fade} className='app-main flex flex-column align-center justify-evenly'>
			<div className='flex'>
				Main
				<button onClick={handleLogout}>Sign Out</button>
			</div>
		</animated.div>
	);
};

export default Main;
