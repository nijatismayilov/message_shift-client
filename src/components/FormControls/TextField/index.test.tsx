import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import TextField from "./index";

const mockHandleChange = jest.fn();
const mockHandleBlur = jest.fn();

describe("TextField", () => {
	it("should render properly", () => {
		const { baseElement } = render(
			<TextField
				type='text'
				name='text'
				value='test'
				label='text'
				error='error'
				onChange={mockHandleChange}
				onBlur={mockHandleBlur}
			/>
		);

		expect(baseElement).toMatchSnapshot();
	});

	it("should have an input type, name, label, error and value", () => {
		const mockType = "email";
		const mockName = "email";
		const mockLabel = "Test Label";
		const mockError = "Test Error";
		const mockValue = "Test Value";

		render(
			<TextField
				type={mockType}
				name={mockName}
				value={mockValue}
				label={mockLabel}
				error={mockError}
				onChange={mockHandleChange}
				onBlur={mockHandleBlur}
			/>
		);

		const Input = screen.getByTestId("text-field-input");
		expect(Input).toHaveProperty("type", mockType);
		expect(Input).toHaveProperty("name", mockName);
		expect(Input).toHaveValue(mockValue);

		const Label = screen.getByTestId("text-field-label");
		expect(Label).toHaveTextContent(mockLabel);

		const Error = screen.getByTestId("text-field-error");
		expect(Error).toHaveTextContent(mockError);
	});

	it("should call handleChange", () => {
		render(
			<TextField
				type='text'
				name='text'
				value=''
				onChange={mockHandleChange}
				onBlur={mockHandleBlur}
			/>
		);

		const Input = screen.getByTestId("text-field-input");
		user.type(Input, "test@gmail.com");
		expect(mockHandleChange).toHaveBeenCalled();
		expect(mockHandleChange).toHaveBeenCalledTimes(14);
	});
});
