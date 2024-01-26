document.getElementById("search-field").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  filterNotes(searchTerm);
});

function filterNotes(searchTerm) {
  // retrieve notes from local storage
  const allStoredNotes = JSON.parse(localStorage.getItem("allNotes")) || [];

  const notesColumn = document.getElementById("notes-column");
  //   notesColumn.innerHTML = "";

  allStoredNotes.forEach(function (note) {
    const title = note.title.toLowerCase();
    const text = note.text.toLowerCase();

    if (title.includes(searchTerm) || text.includes(searchTerm)) {
      // display matching notes
      const searchedNote = createNoteElement(note.title, note.text);
      notesColumn.appendChild(noteElement);
    }
  });
}

function createNoteElement(title, text) {
  const searchedNote = document.createElement("div");
  searchedNote.classList.add("note-thumbnail");

  const titleElement = document.createElement("h3");
  titleElement.innerText = title;

  const textElement = document.createElement("p");
  textElement.innerText = text;

  searchedNote.appendChild(titleElement);
  searchedNote.appendChild(textElement);

  return searchedNote;
}
