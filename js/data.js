export const icons = new Map();

icons.set("Task", "./icons/task.png");
icons.set("Idea", "./icons/idea.png");
icons.set("RT", "./icons/RT.png");

export let notesData = [
	{
		id: 1,
		createdAt: new Date("2023-07-25"),
		name: "Name1",
		content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
		category: "Task",
		img: icons.get("Task"),
		archived: false,
	},
	{
		id: 2,
		createdAt: new Date("2023-07-25"),
		name: "Name2",
		content: "from  7/10/2022, I moved it from 8/10/2022",
		category: "Task",
		img: icons.get("Task"),
		archived: false,
	},
	{
		id: 3,
		createdAt: new Date("2023-07-25"),
		name: "Name3",
		content: "on the 3/5/2021, I moved",
		category: "Idea",
		img: icons.get("Idea"),
		archived: false,
	},
	{
		id: 4,
		createdAt: new Date("2023-07-26"),
		name: "Name4",
		content: "This is a random thought.",
		category: "Random Thought",
		img: icons.get("RT"),
		archived: false,
	},
	{
		id: 5,
		createdAt: new Date("2023-07-26"),
		name: "Name5",
		content: "This is a random thought.",
		category: "Random Thought",
		img: icons.get("RT"),
		archived: false,
	},

	{
		id: 6,
		createdAt: new Date("2023-07-26"),
		name: "Name61",
		content: "This is a random thought.",
		category: "Random Thought",
		img: icons.get("RT"),
		archived: false,
	},
	{
		id: 7,
		createdAt: new Date("2023-07-27"),
		name: "Name16",
		content: "I have a great idea!",
		category: "Idea",
		img: icons.get("Idea"),
		archived: false,
	},
	// Add more sample notes as needed
];

export function setNotes(notes) {
	if (Array.isArray(notes)) {
		notesData = notes;
	} else {
		return;
	}
}
