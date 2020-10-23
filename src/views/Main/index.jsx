import React from "react";
import { connect } from "react-redux";

import { logout } from "store/user/actions";

import "./styles.scss";

const Main = (props) => {
	const { logout } = props;

	return (
		<div className='app-main'>
			Main
			<button onClick={logout}>Sign Out</button>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Main);
