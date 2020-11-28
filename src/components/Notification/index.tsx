import React, { useEffect, memo } from "react";
import { motion } from "framer-motion";

import eventBus from "eventBus";

import renderIcon from "utils/renderIcon";

import successIcon from "assets/img/success.svg";
import infoIcon from "assets/img/info.svg";
import warningIcon from "assets/img/warning.svg";
import errorIcon from "assets/img/error.svg";
import dismissIcon from "assets/img/dismiss.svg";

import "./styles.scss";

const icons = {
	successIcon,
	infoIcon,
	warningIcon,
	errorIcon,
};

interface Props {
	id: string;
	type: string;
	message: string;
}

const Notification: React.FC<Props> = (props) => {
	const { message, type, id } = props;

	const handleRemoveNorification = (): void => {
		eventBus.dispatch("remove-notification", id);
	};

	const handleOnMount = () => {
		const id = setTimeout(() => {
			handleRemoveNorification();
		}, 3000);

		return () => {
			clearTimeout(id);
		};
	};

	useEffect(handleOnMount, []);

	return (
		<motion.li
			initial={{ opacity: 1, scale: 0 }}
			animate={{
				opacity: 1,
				scale: 1,
				transition: { ease: [0.18, 0.89, 0.43, 1.19], duration: 0.2 },
			}}
			exit={{ opacity: 0, transition: { duration: 0.2 } }}
			layoutTransition={{ duration: 0.2 }}
			className={`notification notification--${type}`}
		>
			<div className='row justify-between align-center'>
				<div className='col-10 d-flex align-center'>
					<img className='notification__icon' src={renderIcon(type, icons)} alt={type} />

					<div className='notification__text'>{message}</div>
				</div>

				<div className='col-2 d-flex justify-end'>
					<button className='notification__btn' onClick={handleRemoveNorification}>
						<img src={dismissIcon} alt='x' />
					</button>
				</div>
			</div>
		</motion.li>
	);
};

export default memo(Notification);
