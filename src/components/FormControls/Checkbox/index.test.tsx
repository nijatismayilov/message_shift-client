import React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { NIL } from "uuid";

import Checkbox from "./index";

const handleChange = jest.fn();
const handleBlur = jest.fn();
const mockId = NIL;

describe("Checkbox component", () => {
	it("should render properly", () => {
		const { baseElement } = render(
			<Checkbox
				id={mockId}
				checkhed={false}
				name='checkbox'
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		);

		expect(baseElement).toMatchSnapshot();
	});

	it("should have correct name and checked value", () => {
		const mockChecked = true;
		const mockName = "Test Checkbox";

		const { getByTestId } = render(
			<Checkbox
				id={mockId}
				checkhed={mockChecked}
				name={mockName}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		);

		const CheckboxInput = getByTestId("checkbox-input");

		expect(CheckboxInput).toHaveProperty("checked", mockChecked);
		expect(CheckboxInput).toHaveProperty("name", mockName);
	});

	it("should call handleChange according to user interaction", () => {
		const mockChecked = true;
		const mockName = "Test Checkbox";

		const { getByTestId } = render(
			<Checkbox
				id={mockId}
				checkhed={mockChecked}
				name={mockName}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		);

		const CheckboxInput = getByTestId("checkbox-input");

		expect(CheckboxInput).toHaveProperty("checked", mockChecked);
		expect(CheckboxInput).toHaveProperty("name", mockName);
		user.click(CheckboxInput);
		user.click(CheckboxInput);

		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledTimes(2);
	});
});
