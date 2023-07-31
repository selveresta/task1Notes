import { createNewNote, editNote } from "./js/actions.js";
import { renderArchiveTable, renderNotesTable, renderSummaryTable } from "./js/render.js";

const addForm = document.getElementById("addForm");
addForm.addEventListener("submit", createNewNote);

const edirform = document.getElementById("editForm");

edirform.addEventListener("submit", editNote);

renderNotesTable();
renderSummaryTable();
renderArchiveTable();
