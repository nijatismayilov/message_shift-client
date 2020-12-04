import React, { useRef, memo } from "react";
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
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<Props> = (props) => {
	const { type, name, value, label, error } = props;
	const { onChange, onBlur } = props;

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
				data-testid='text-field-input'
				type={type}
				name={name}
				id={id.current}
				autoComplete='new-password'
				className={inputClassName}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>

			<label data-testid='text-field-label' htmlFor={id.current} className={labelClassName}>
				{label}
			</label>

			<p data-testid='text-field-error' className={hintClassName}>
				{error}
			</p>
		</div>
	);
};

export default memo(TextField);
