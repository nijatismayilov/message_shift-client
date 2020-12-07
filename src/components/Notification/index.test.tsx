import React from "react";
import { render, screen } from "@testing-library/react";

import Notification from "./index";

describe("Notification component", () => {
	const mockId = "111111";
	const mockType = "success";
	const mockMessage = "Test Notification";

	it("should match snapshot", () => {
		const { baseElement } = render(
			<Notification id={mockId} type={mockType} message={mockMessage} />
		);

		expect(baseElement).toMatchSnapshot();
	});

	it("should display message correctly", () => {
		render(<Notification id={mockId} type={mockType} message={mockMessage} />);

		const Message = screen.getByTestId("notification-message");
		expect(Message).toBeInTheDocument();
		expect(Message).toHaveTextContent(mockMessage);
	});
});
