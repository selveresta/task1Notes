let notesData = [
	{
		id: 1,
		createdAt: new Date("2023-07-25"),
		name: "Name1",
		content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
		category: "Task",
		img: "./icons/task.png",
	},
	{
		id: 2,
		createdAt: new Date("2023-07-25"),
		name: "Name2",
		content: "from  7/10/2022, I moved it from 8/10/2022",
		category: "Task",
		img: "./icons/task.png",
	},
	{
		id: 3,
		createdAt: new Date("2023-07-25"),
		name: "Name3",
		content: "on the 3/5/2021, I moved",
		category: "Idea",
		img: "./icons/idea.png",
	},
	{
		id: 4,
		createdAt: new Date("2023-07-26"),
		name: "Name4",
		content: "This is a random thought.",
		category: "Random Thought",
		img: "./icons/RT.png",
	},
	{
		id: 5,
		createdAt: new Date("2023-07-26"),
		name: "Name5",
		content: "This is a random thought.",
		category: "Random Thought",
		img: "./icons/RT.png",
	},

	{
		id: 6,
		createdAt: new Date("2023-07-26"),
		name: "Name61",
		content: "This is a random thought.",
		category: "Random Thought",
		img: "./icons/RT.png",
	},
	{
		id: 7,
		createdAt: new Date("2023-07-27"),
		name: "Name16",
		content: "I have a great idea!",
		category: "Idea",
		img: "./icons/idea.png",
	},
	// Add more sample notes as needed
];

let archiveData = [];

function renderNotesTable() {
	const notesTableBody = document.querySelector("#notesTable tbody");
	notesTableBody.innerHTML = "";

	notesData.forEach((note) => {
		const row = document.createElement("tr");
		row.innerHTML = `
        <td><img src=${note.img} style="width:30px;height:30px;" /></td>
        <td>${note.name}</td>
        <td>${note.createdAt.toLocaleDateString()}</td>
        <td>${note.content}</td>
        <td>${note.category}</td>
        <td>${getDatesFromContent(note.content)}</td>
        <td>
          <button data-bs-toggle="modal" data-bs-target="#EditModal" onclick="openEditNote(${note.id})">Edit</button>
          <button onclick="archiveNote(${note.id})">Archive</button>
          <button onclick="removeNotefromNotes(${note.id})">Remove</button>
        </td>
      `;
		notesTableBody.appendChild(row);
	});
}

function renderArchiveTable() {
	const notesTableBody = document.querySelector("#archiveTable tbody");
	notesTableBody.innerHTML = "";

	archiveData.forEach((note) => {
		const row = document.createElement("tr");
		row.innerHTML = `
        <td><img src=${note.img} style="width:30px;height:30px;" /></td>
        <td>${note.name}</td>
        <td>${note.createdAt.toLocaleDateString()}</td>
        <td>${note.content}</td>
        <td>${note.category}</td>
        <td>${getDatesFromContent(note.content)}</td>
        <td>
          <button data-bs-toggle="modal" data-bs-target="#EditModal" onclick="openEditArchive(${note.id})">Edit</button>
          <button onclick="undoNote(${note.id})">Undo</button>
          <button onclick="removeNotefromArchive(${note.id})">Remove</button>
        </td>
      `;
		notesTableBody.appendChild(row);
	});
}

// Function to get dates mentioned in the note content
function getDatesFromContent(content) {
	const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
	const datesArray = content.match(dateRegex);
	return datesArray ? datesArray.join(", ") : "";
}

// Function to render the summary table
function renderSummaryTable() {
	const summaryTableBody = document.querySelector("#summaryTable tbody");
	summaryTableBody.innerHTML = "";

	const categories = [
		{ category: "Task", img: "./icons/task.png" },
		{ category: "Random Thought", img: "./icons/RT.png" },
		{ category: "Idea", img: "./icons/idea.png" },
	];

	categories.forEach((category) => {
		const activeNotesCount = notesData.filter((note) => note.category === category.category).length;
		const archivedNotesCount = archiveData.filter((note) => note.category === category.category).length;

		const row = document.createElement("tr");
		row.innerHTML = `
        <td><img src=${category.img} style="width:30px;height:30px; padding:5px;" />${category.category}</td>
        <td>${activeNotesCount}</td>
        <td>${archivedNotesCount}</td>
      `;
		summaryTableBody.appendChild(row);
	});
}

function createNewNote(event) {
	event.preventDefault();
	let index;
	if (notesData[notesData.length - 1]) {
		index = notesData[notesData.length - 1].id + 1;
	} else {
		index = 0;
	}
	const name = document.getElementById("inputName");
	const type = document.getElementById("selectType");
	let typeStr = type.options[type.selectedIndex].text;

	const content = document.getElementById("content");
	const typeval = type.value;
	if (name.value && type.value && content.value) {
		const noteElement = {
			id: index,
			createdAt: new Date(Date.now()),
			name: name.value,
			content: content.value,
			category: typeStr,
			img:
				typeStr === "Task"
					? "./icons/task.png"
					: typeStr === "Idea"
					? "./icons/idea.png"
					: (typeStr = "Random Thought" ? "./icons/RT.png" : "./icons/idea.png"),
		};
		notesData.push(noteElement);
	}

	renderNotesTable();
	renderSummaryTable();
	type.value = typeval;
}

//   Function to edit a note
function editNote(event) {
	event.preventDefault();
	const name = document.getElementById("EditInputName");
	const type = document.getElementById("EditSelectType");
	const content = document.getElementById("EditContent");
	const editIdDiv = document.getElementById("editId");
	const noteId = Number(editIdDiv.innerText);
	let typeStr = type.options[type.selectedIndex].text;

	let note = notesData.filter((value) => {
		return value.id === noteId;
	})[0];

	if (!note) {
		note = archiveData.filter((value) => {
			return value.id === noteId;
		})[0];
	}

	note.name = name.value;
	note.category = typeStr;
	note.content = content.value;
	note.img =
		typeStr === "Task"
			? "./icons/task.png"
			: typeStr === "Idea"
			? "./icons/idea.png"
			: (typeStr = "Random Thought" ? "./icons/RT.png" : "./icons/idea.png");
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}

function openEditNote(noteId) {
	const name = document.getElementById("EditInputName");
	const type = document.getElementById("EditSelectType");
	const content = document.getElementById("EditContent");
	const editIdDiv = document.getElementById("editId");
	editIdDiv.innerText = String(noteId);
	const note = notesData.filter((value) => {
		return value.id === noteId;
	})[0];
	name.value = note.name;
	type.value = note.category;
	content.value = note.content;
}

function openEditArchive(noteId) {
	const name = document.getElementById("EditInputName");
	const type = document.getElementById("EditSelectType");
	const content = document.getElementById("EditContent");
	const editIdDiv = document.getElementById("editId");
	editIdDiv.innerText = String(noteId);
	const note = archiveData.filter((value) => {
		return value.id === noteId;
	})[0];
	name.value = note.name;
	type.value = note.category;
	content.value = note.content;
}

//   Function to archive a note
const archiveNote = (noteId) => {
	const note = notesData.filter((val) => {
		return val.id === noteId;
	})[0];
	notesData = notesData.filter((val) => {
		return val.id !== noteId;
	});
	archiveData.push(note);
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
};

function undoNote(noteId) {
	const note = archiveData.filter((val) => {
		return val.id === noteId;
	})[0];
	archiveData = archiveData.filter((val) => {
		return val.id !== noteId;
	});
	notesData.push(note);
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}

function removeNotefromNotes(noteId) {
	notesData = notesData.filter((value) => {
		return value.id !== noteId;
	});
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}
function removeNotefromArchive(noteId) {
	archiveData = archiveData.filter((value) => {
		return value.id !== noteId;
	});
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}

const addForm = document.getElementById("addForm");
addForm.addEventListener("submit", createNewNote);

const edirform = document.getElementById("editForm");

edirform.addEventListener("submit", editNote);

renderNotesTable();
renderSummaryTable();
renderArchiveTable();
