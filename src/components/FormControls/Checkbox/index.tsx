import React from "react";

import "./styles.scss";

interface Props {
	id: string;
	checkhed: boolean;
	name: string;
	label?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<Props> = (props) => {
	const { id, checkhed = false, name, label } = props;
	const { onChange, onBlur } = props;

	return (
		<div className='checkbox'>
			<input
				data-testid='checkbox-input'
				type='checkbox'
				name={name}
				id={id}
				checked={checkhed}
				className='checkbox__input'
				onChange={onChange}
				onBlur={onBlur}
			/>
			<label htmlFor={id} className='checkbox__label'>
				<span className='checkbox__label-indicator'></span>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
