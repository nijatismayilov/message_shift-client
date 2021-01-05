import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSpring, useTransition, animated, interpolate } from "react-spring";

import { fetchUserStart } from "store/user/actions";
import { logoutUserStart } from "store/auth/actions";

import ScrollBar from "components/Scrollbar";

import generateKey from "utils/generateKey";

import fadeConfig from "animation/fade";

import data, { Data } from "./data";
import chats, { Chat } from "./chats";

import "./styles.scss";

let interval: NodeJS.Timeout;

const Main: React.FC = () => {
	const [list, setList] = useState(data);
	const [chatsList, setChatsList] = useState(chats);
	const [theme, setTheme] = useState("light");

	const dispatch = useDispatch();

	const fade = useSpring(fadeConfig);

	const handleMount = () => {
		dispatch(fetchUserStart());

		interval = setInterval(() => {
			const newList = [...list].sort(() => Math.random() - 0.5);
			setList(newList);
		}, 2000);
	};

	const handleLogout = () => {
		dispatch(logoutUserStart());
	};

	const handleAddItem = () => {
		const newItem: Data = {
			name: generateKey(),
			description: "Test",
			background: "linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)",
			height: 50,
			width: 100,
		};

		const newChat: Chat = {
			id: generateKey(),
			height: 100,
			width: 300,
			text: `New Chat ${generateKey()}`,
			date: new Date(),
		};

		setList([newItem, ...list]);
		setChatsList([newChat, ...chatsList]);
	};

	const handleRefreshInterval = () => {
		clearInterval(interval);
		interval = setInterval(() => {
			const newList = [...list].sort(() => Math.random() - 0.5);
			setList(newList);
		}, 2000);
	};

	const handleMakeItemFirst = (id: string) => {
		const item = chatsList.find((c) => c.id === id) || {
			id: generateKey(),
			date: new Date(),
			height,
			width,
			text: "Chat 1",
		};

		const updatedItem: Chat = {
			...item,
			date: new Date(),
		};

		const newList = [updatedItem, ...chatsList.filter((c) => c.id !== id)];
		setChatsList(newList);
	};

	useEffect(handleMount, []);
	useEffect(handleRefreshInterval, [list]);

	const chatsListSorted = useMemo(() => {
		return chatsList.sort((c1, c2) => (c1.date > c2.date ? -1 : 1));
	}, [chatsList]);

	let height = 0;
	let width = 0;
	const transitions = useTransition(
		list.map((data, idx) => {
			width += data.width;
			height = data.height * Math.ceil((idx + 1) / 3);
			if (width >= 4 * 100) width = 100;

			return {
				...data,
				y: height - data.height,
				x: width - data.width,
			};
		}),
		(d) => d.name,
		{
			from: { height: 0, width: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, x, width, height }) => ({ y, x, width, height, opacity: 1 }),
			update: ({ y, x, width, height }) => ({ y, x, width, height }),
		}
	);

	let heightChats = 0;
	const chatTransitions = useTransition(
		chatsListSorted.map((chat) => ({ ...chat, y: (heightChats += chat.height) - chat.height })),
		(c) => c.id,
		{
			from: { height: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, height: heightChats, width }) => ({ y, height: heightChats, width, opacity: 1 }),
			update: ({ y, height: heightChats, width }) => ({ y, height: heightChats, width }),
		}
	);

	return (
		<animated.div style={fade} className='app-main d-flex flex-column align-center justify-start'>
			<button onClick={handleLogout}>Sign Out</button>
			<div
				className='test'
				style={{
					backgroundColor: theme === "light" ? "#fff" : "#433e3e",
					height: height + 30,
					width: 3 * 100 + 30,
				}}
			>
				{transitions.map(({ item, props, key }, index) => {
					// @ts-ignore
					const { x, y, ...rest } = props;

					return (
						<animated.div
							key={key}
							style={{
								position: "absolute",
								willChange: "transform, height, opacity",
								zIndex: data.length - index,
								transform: interpolate([y, x], (y, x) => {
									return `translate3d(${x}px, ${y}px, 0)`;
								}),
								...rest,
							}}
						>
							<div
								style={{
									position: "relative",
									width: "100%",
									height: "100%",
									overflow: "hidden",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<div className='test-item' style={{ backgroundImage: item.background }} />
							</div>
						</animated.div>
					);
				})}

				<button
					className='toggle'
					onClick={() => {
						if (theme === "light") setTheme("dark");
						else setTheme("light");
					}}
				>
					Toggle
				</button>

				<button className='toggle' onClick={handleAddItem} style={{ top: "30%" }}>
					Add
				</button>
			</div>
			<div
				className='test'
				style={{
					backgroundColor: theme === "light" ? "#fff" : "#433e3e",
					height: 100 * 5 + 30,
					width: 300 + 30,
					left: "75%",
					padding: 0,
				}}
			>
				<ScrollBar>
					<div style={{ padding: 15 }}>
						{chatTransitions.map(({ item, props, key }, index) => {
							// @ts-ignore
							const { y, ...rest } = props;

							return (
								<animated.div
									key={key}
									style={{
										position: "absolute",
										willChange: "transform, height, opacity",
										zIndex: data.length - index,
										transform: interpolate([y], (y) => {
											return `translate3d(0, ${y}px, 0)`;
										}),
										...rest,
									}}
								>
									<div
										style={{
											position: "relative",
											width: "100%",
											height: "100%",
											overflow: "hidden",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div
											style={{
												height: "95%",
												width: "100%",
												borderRadius: "10px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												boxShadow: "0px 10px 25px -10px rgba(0, 0, 0, 0.2)",
												background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
												cursor: "pointer",
											}}
											onClick={() => handleMakeItemFirst(item.id)}
										>
											{item.text}
										</div>
									</div>
								</animated.div>
							);
						})}
					</div>
				</ScrollBar>
			</div>
		</animated.div>
	);
};

export default Main;
