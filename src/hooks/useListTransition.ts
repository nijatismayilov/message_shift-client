import { useTransition, SpringConfig } from "react-spring";

const useListTransition = (list: any[], itemPerRow: number, config?: SpringConfig) => {
	let height = 0;
	let width = 0;

	const transitions = useTransition(
		list.map((data, idx) => {
			width += data.width;
			height = data.height * Math.ceil((idx + 1) / itemPerRow);
			if (width >= (itemPerRow + 1) * data.width) width = data.width;

			return {
				...data,
				y: height - data.height,
				x: width - data.width,
			};
		}),
		(d) => d.id,
		{
			from: { opacity: 0, scale: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, x, width, height }) => ({ y, x, width, height, opacity: 1, scale: 1 }),
			update: ({ y, x, width, height }) => ({ y, x, width, height }),
			config,
		}
	);

	return {
		transitions,
		height,
		width,
	};
};

export default useListTransition;
