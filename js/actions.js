import { renderArchiveTable, renderNotesTable, renderSummaryTable } from "./render.js";
import { icons, notesData, setNotes } from "./data.js";

export function createNewNote(event) {
	event.preventDefault();
	let index;
	if (notesData[notesData.length - 1]) {
		index = notesData[notesData.length - 1].id + 1;
	} else {
		index = 0;
	}
	const { name, type, content } = getAddModalSelectors();

	let typeStr = type.options[type.selectedIndex].text;
	const typeval = type.value;

	if (name.value && type.value && content.value) {
		const noteElement = {
			id: index,
			createdAt: new Date(Date.now()),
			name: name.value,
			content: content.value,
			category: typeStr,
			archived: false,
			img:
				typeStr === "Task"
					? icons.get("Task")
					: typeStr === "Idea"
					? icons.get("Idea")
					: (typeStr = "Random Thought" ? icons.get("RT") : icons.get("RT")),
		};
		notesData.push(noteElement);
	}

	renderNotesTable();
	renderSummaryTable();
	type.value = typeval;
}

export function editNote(event) {
	event.preventDefault();
	const { name, type, content, editIdDiv } = getEditModalSelectors();

	const noteId = Number(editIdDiv.innerText);
	let typeStr = type.options[type.selectedIndex].text;

	let note = notesData.filter((value) => {
		return value.id === noteId;
	})[0];

	note.name = name.value;
	note.category = typeStr;
	note.content = content.value;
	note.img =
		typeStr === "Task"
			? icons.get("Task")
			: typeStr === "Idea"
			? icons.get("Idea")
			: (typeStr = "Random Thought" ? icons.get("RT") : icons.get("RT"));

	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}

export function openEditNote(noteId) {
	const { name, type, content, editIdDiv } = getEditModalSelectors();

	editIdDiv.innerText = String(noteId);
	const note = notesData.filter((value) => {
		return value.id === noteId;
	})[0];
	name.value = note.name;
	type.value = note.category;
	content.value = note.content;
}

//   export Function to archive a note
export const archiveNote = (noteId) => {
	const note = notesData.filter((val) => {
		return val.id === noteId;
	})[0];
	note.archived = true;
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
};

export function undoNote(noteId) {
	const note = notesData.filter((val) => {
		return val.id === noteId;
	})[0];
	note.archived = false;

	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}

export function removeNote(noteId) {
	setNotes(
		notesData.filter((value) => {
			return value.id !== noteId;
		})
	);
	renderNotesTable();
	renderSummaryTable();
	renderArchiveTable();
}

function getEditModalSelectors() {
	const name = document.getElementById("EditInputName");
	const type = document.getElementById("EditSelectType");
	const content = document.getElementById("EditContent");
	const editIdDiv = document.getElementById("editId");
	return { name, type, content, editIdDiv };
}

function getAddModalSelectors() {
	const name = document.getElementById("inputName");
	const type = document.getElementById("selectType");

	const content = document.getElementById("content");
	return { name, type, content };
}
