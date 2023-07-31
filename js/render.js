import {
	openEditNote,
	archiveNote,
	createNewNote,
	editNote,
	openEditArchive,
	undoNote,
	removeNotefromNotes,
	removeNotefromArchive,
} from "./actions.js";
import { notesData, archiveData } from "./actions.js";

export function renderNotesTable() {
	const notesTableBody = document.querySelector("#notesTable tbody");
	notesTableBody.innerHTML = "";

	notesData.forEach((note) => {
		const row = document.createElement("tr");
		const btn1 = document.createElement("button");
		const btn2 = document.createElement("button");
		const btn3 = document.createElement("button");

		const td1 = document.createElement("td");
		td1.innerHTML = `<img src=${note.img} style="width:30px;height:30px;" />`;
		const td2 = document.createElement("td");
		td2.innerHTML = `${note.name}`;

		const td3 = document.createElement("td");
		td3.innerHTML = `${note.createdAt.toLocaleDateString()}`;

		const td4 = document.createElement("td");
		td4.innerHTML = `${note.content}`;

		const td5 = document.createElement("td");
		td5.innerHTML = `${note.category}`;

		const td6 = document.createElement("td");
		td6.innerHTML = `${getDatesFromContent(note.content)}`;

		btn1.addEventListener("click", () => {
			openEditNote(note.id);
		});
		btn1.setAttribute("data-bs-toggle", "modal");
		btn1.setAttribute("data-bs-target", "#EditModal");
		btn1.innerText = "Edit";
		btn2.addEventListener("click", () => {
			archiveNote(note.id);
		});
		btn2.innerText = "Archive";

		btn3.addEventListener("click", () => {
			removeNotefromNotes(note.id);
		});
		btn3.innerText = "Remove";

		const td7 = document.createElement("td");
		td7.append(btn1);
		td7.append(btn2);
		td7.append(btn3);

		row.append(td1);
		row.append(td2);
		row.append(td3);
		row.append(td4);
		row.append(td5);
		row.append(td6);
		row.append(td7);

		notesTableBody.appendChild(row);
	});
}

export function renderArchiveTable() {
	const notesTableBody = document.querySelector("#archiveTable tbody");
	notesTableBody.innerHTML = "";

	archiveData.forEach((note) => {
		const row = document.createElement("tr");
		const btn1 = document.createElement("button");
		const btn2 = document.createElement("button");
		const btn3 = document.createElement("button");

		const td1 = document.createElement("td");
		td1.innerHTML = `<img src=${note.img} style="width:30px;height:30px;" />`;

		const td2 = document.createElement("td");
		td2.innerHTML = `${note.name}`;

		const td3 = document.createElement("td");
		td3.innerHTML = `${note.createdAt.toLocaleDateString()}`;

		const td4 = document.createElement("td");
		td4.innerHTML = `${note.content}`;

		const td5 = document.createElement("td");
		td5.innerHTML = `${note.category}`;

		const td6 = document.createElement("td");
		td6.innerHTML = `${getDatesFromContent(note.content)}`;

		btn1.addEventListener("click", () => {
			openEditNote(note.id);
		});
		btn1.innerText = "Edit";
		btn2.addEventListener("click", () => {
			undoNote(note.id);
		});
		btn2.innerText = "Archive";

		btn3.addEventListener("click", () => {
			removeNotefromArchive(note.id);
		});
		btn3.innerText = "Remove";

		const td7 = document.createElement("td");
		td7.append(btn1);
		td7.append(btn2);
		td7.append(btn3);

		row.append(td1);
		row.append(td2);
		row.append(td3);
		row.append(td4);
		row.append(td5);
		row.append(td6);
		row.append(td7);
		notesTableBody.appendChild(row);
	});
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
