import React, { useState, useRef, memo } from "react";
import classnames from "classnames";

import generateKey from "utils/generateKey";

import { inputClassFunc, labelClassFunc, hintClassFunc } from "./classnames";

import "./styles.scss";

interface Props {
	type: string;
	name: string;
	value: string;
	label?: string;
	placeholder?: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<Props> = (props) => {
	const { type, name, value, label, placeholder, error } = props;
	const { onChange } = props;

	const [isFocused, setIsFocused] = useState(false);

	const id = useRef(generateKey(name));

	const hasError = error ? true : false;
	const hasValue = value ? true : false;
	const isHintVisible = hasError;

	const inputClassName = classnames(inputClassFunc(hasError));
	const labelClassName = classnames(labelClassFunc(hasValue));
	const hintClassName = classnames(hintClassFunc(isHintVisible, hasError));

	return (
		<div className='text-field'>
			<input
				type={type}
				name={name}
				placeholder={(isFocused && placeholder) || undefined}
				id={id.current}
				autoComplete='new-password'
				className={inputClassName}
				value={value}
				onChange={onChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>

			<label htmlFor={id.current} className={labelClassName}>
				{label}
			</label>

			<p className={hintClassName}>{error}</p>
		</div>
	);
};

export default memo(TextField);
