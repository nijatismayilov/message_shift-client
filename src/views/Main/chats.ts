import generateKey from "../../utils/generateKey";

const height = 100;
const width = 300;

export interface Chat {
	height: number;
	width: number;
	id: string;
	date: Date;
	text: string;
}

const chats: Chat[] = [
	{
		id: generateKey(),
		date: new Date(),
		height,
		width,
		text: "Chat 1",
	},
	{
		id: generateKey(),
		date: new Date(),
		height,
		width,
		text: "Chat 2",
	},
	{
		id: generateKey(),
		date: new Date(),
		height,
		width,
		text: "Chat 3",
	},
	{
		id: generateKey(),
		date: new Date(),
		height,
		width,
		text: "Chat 4",
	},
	{
		id: generateKey(),
		date: new Date(),
		height,
		width,
		text: "Chat 5",
	},
];

export default chats;
