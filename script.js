// Sample data with prepopulated notes
let notesData = [
	{
		id: 1,
		createdAt: new Date("2023-07-25"),
		content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
		category: "Task",
		img: "./icons/task.png",
	},
	{
		id: 2,
		createdAt: new Date("2023-07-26"),
		content: "This is a random thought.",
		category: "Random Thought",
		img: "./icons/RT.png",
	},
	{
		id: 3,
		createdAt: new Date("2023-07-27"),
		content: "I have a great idea!",
		category: "Idea",
		img: "./icons/idea.png",
	},
	// Add more sample notes as needed
];

// Function to render the notes table
function renderNotesTable() {
	const notesTableBody = document.querySelector("#notesTable tbody");
	notesTableBody.innerHTML = "";

	notesData.forEach((note) => {
		const row = document.createElement("tr");
		row.innerHTML = `
        <td><img src=${note.img} style="width:30px;height:30px;" /></td>
        <td>${note.createdAt.toLocaleDateString()}</td>
        <td>${note.content}</td>
        <td>${note.category}</td>
        <td>${getDatesFromContent(note.content)}</td>
        <td>
          <button onclick="editNote(${note.id})">Edit</button>
          <button onclick="archiveNote(${note.id})">Archive</button>
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
		const activeNotesCount = notesData.filter((note) => note.category === category.category && !note.archived).length;
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

// Function to create a new note
function createNewNote(event) {
	event.preventDefault();
	console.log(event);
	console.log("asdasd");
	console.log("asdasd");
	console.log("asdasd");
	// Implement code to prompt the user for note content and category and add it to the notesData array
	// You can use window.prompt() or a form for user input
	// After adding the new note, call renderNotesTable() and renderSummaryTable() to update the tables
}

// Function to edit a note
function editNote(noteId) {
	// Implement code to find the note with the given ID and prompt the user for updated content and category
	// Update the note in the notesData array and call renderNotesTable() and renderSummaryTable() to update the tables
}

// Function to archive a note
function archiveNote(noteId) {
	// Implement code to find the note with the given ID and set its 'archived' property to true
	// Call renderNotesTable() and renderSummaryTable() to update the tables
}

// Initial rendering
renderNotesTable();
renderSummaryTable();
