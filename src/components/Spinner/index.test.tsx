import React from "react";
import { render } from "@testing-library/react";

import Spinner from "./index";

describe("Spinner component", () => {
	it("should match the snaphot", () => {
		const { baseElement } = render(<Spinner />);

		expect(baseElement).toMatchSnapshot();
	});
});
