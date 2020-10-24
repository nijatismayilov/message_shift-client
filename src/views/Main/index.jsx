import React from "react";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";

import { logout } from "store/user/actions";

import pageTransition from "animation/pageTransition";

import "./styles.scss";

const Main = (props) => {
	const { logout } = props;

	const fade = useSpring(pageTransition);

	return (
		<animated.div style={fade} className='app-main'>
			Main
			<button onClick={logout}>Sign Out</button>
		</animated.div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Main);
