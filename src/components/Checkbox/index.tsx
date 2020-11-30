import React, { useRef } from "react";

import generateKey from "utils/generateKey";

import "./styles.scss";

interface Props {
	checkhed: boolean;
	name: string;
	label?: string;
	onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<Props> = (props) => {
	const { checkhed = false, name, label } = props;
	const { onChange } = props;

	const id = useRef(generateKey(name));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;

		onChange(checked);
	};

	return (
		<div className='checkbox'>
			<input
				type='checkbox'
				name={name}
				id={id.current}
				checked={checkhed}
				className='checkbox__input'
				onChange={handleChange}
			/>
			<label htmlFor={id.current} className='checkbox__label'>
				<span className='checkbox__label-indicator'></span>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
