import React, { useRef } from "react";
import classnames from "classnames";

import generateKey from "utils/generateKey";

import { inputClassFunc, labelClassFunc, hintClassFunc } from "./classnames";

import "./styles.scss";

interface Props {
	type: string;
	name: string;
	value: string;
	label?: string;
	error?: string;
	onChange: (value: string) => void;
}

const TextField: React.FC<Props> = (props) => {
	const { type, name, value, label, error } = props;
	const { onChange } = props;

	const id = useRef(generateKey(name));

	const hasError = error ? true : false;
	const hasValue = value ? true : false;
	const isHintVisible = hasError;

	const inputClassName = classnames(inputClassFunc(hasError));
	const labelClassName = classnames(labelClassFunc(hasValue));
	const hintClassName = classnames(hintClassFunc(isHintVisible, hasError));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		onChange(value);
	};

	return (
		<div className='text-field'>
			<input
				type={type}
				name={name}
				id={id.current}
				autoComplete='new-password'
				className={inputClassName}
				value={value}
				onChange={handleChange}
			/>

			<label htmlFor={id.current} className={labelClassName}>
				{label}
			</label>

			<p className={hintClassName}>{error}</p>
		</div>
	);
};

export default TextField;
