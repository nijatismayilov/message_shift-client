import React, { useRef } from "react";

import generateKey from "utils/generateKey";

import "./styles.scss";

interface Props {
	checkhed: boolean;
	name: string;
	label?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<Props> = (props) => {
	const { checkhed = false, name, label } = props;
	const { onChange, onBlur } = props;

	const id = useRef(generateKey(name));

	return (
		<div className='checkbox'>
			<input
				data-testid='checkbox-input'
				type='checkbox'
				name={name}
				id={id.current}
				checked={checkhed}
				className='checkbox__input'
				onChange={onChange}
				onBlur={onBlur}
			/>
			<label htmlFor={id.current} className='checkbox__label'>
				<span className='checkbox__label-indicator'></span>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
