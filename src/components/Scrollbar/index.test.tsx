import React from "react";
import { render } from "@testing-library/react";

import Scrollbar from "./index";

describe("Scrollbar component", () => {
	it("should match the snapshot", () => {
		const { baseElement } = render(<Scrollbar />);

		expect(baseElement).toMatchSnapshot();
	});
});
