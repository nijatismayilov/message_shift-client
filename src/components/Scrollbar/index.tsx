import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./styles.scss";

interface Props {
	hide?: boolean;
	renderHorizontal?: boolean;
}

const Scrollbar: React.FC<Props> = ({ hide = false, renderHorizontal = false, ...props }) => {
	return (
		<Scrollbars
			autoHide={hide}
			style={{
				height: "100%",
				width: "100%",
			}}
			renderThumbVertical={(props) => <div {...props} className='scrollbar-thumb-vertical' />}
			renderThumbHorizontal={(props) => <div {...props} className='scrollbar-thumb-horizontal' />}
			renderView={(props) =>
				renderHorizontal ? (
					<div {...props} className={`scrollbar-view-horizontal`} />
				) : (
					<div {...props} className={`scrollbar-view-vertical`} />
				)
			}
			hideTracksWhenNotNeeded={true}
		>
			{props.children}
		</Scrollbars>
	);
};

export default Scrollbar;
