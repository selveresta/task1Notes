import { openEditNote, archiveNote, undoNote, removeNote } from "./actions.js";
import { notesData } from "./data.js";

export function renderNotesTable() {
	const notesTableBody = document.querySelector("#notesTable tbody");
	notesTableBody.innerHTML = "";
	const notes = notesData.filter((value) => {
		return value.archived === false;
	});
	notes.forEach((note) => {
		const row = createRow(note, false);
		notesTableBody.appendChild(row);
	});
}

export function renderArchiveTable() {
	const notesTableBody = document.querySelector("#archiveTable tbody");
	notesTableBody.innerHTML = "";
	const archive = notesData.filter((value) => {
		return value.archived === true;
	});
	archive.forEach((note) => {
		const row = createRow(note, true);
		notesTableBody.appendChild(row);
	});
}

function createRow(note, isArchive) {
	const row = document.createElement("tr");

	const btnEdit = document.createElement("button");
	const btnArchive = document.createElement("button");
	const btnRemove = document.createElement("button");

	btnEdit.addEventListener("click", () => {
		openEditNote(note.id);
	});
	btnEdit.setAttribute("data-bs-toggle", "modal");
	btnEdit.setAttribute("data-bs-target", "#EditModal");
	btnEdit.innerText = "Edit";

	btnArchive.addEventListener("click", () => {
		if (isArchive) {
			undoNote(note.id);
		} else {
			archiveNote(note.id);
		}
	});
	btnArchive.innerText = isArchive ? "Undo" : "Archive";

	btnRemove.addEventListener("click", () => {
		removeNote(note.id);
	});
	btnRemove.innerText = "Remove";

	row.innerHTML = `
    <td><img src=${note.img} style="width:30px;height:30px;"/></td>
    <td>${note.name}</td>
    <td>${note.createdAt.toLocaleDateString()}</td>
    <td>${note.content}</td>
    <td>${note.category}</td>
    <td>${getDatesFromContent(note.content)}</td>`;

	const tdBtn = document.createElement("td");

	tdBtn.append(btnEdit);
	tdBtn.append(btnArchive);
	tdBtn.append(btnRemove);

	row.append(tdBtn);
	return row;
}

// export Function to get dates mentioned in the note content
export function getDatesFromContent(content) {
	const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
	const datesArray = content.match(dateRegex);
	return datesArray ? datesArray.join(", ") : "";
}

// export Function to render the summary table
export function renderSummaryTable() {
	const summaryTableBody = document.querySelector("#summaryTable tbody");
	summaryTableBody.innerHTML = "";

	const categories = [
		{ category: "Task", img: "./icons/task.png" },
		{ category: "Random Thought", img: "./icons/RT.png" },
		{ category: "Idea", img: "./icons/idea.png" },
	];

	categories.forEach((category) => {
		const activeNotesCount = notesData.filter((note) => note.category === category.category && note.archived === false).length;
		const archivedNotesCount = notesData.filter((note) => note.category === category.category && note.archived).length;

		const row = document.createElement("tr");
		row.innerHTML = `
        <td><img src=${category.img} style="width:30px;height:30px; padding:5px;" />${category.category}</td>
        <td>${activeNotesCount}</td>
        <td>${archivedNotesCount}</td>
      `;
		summaryTableBody.appendChild(row);
	});
}
