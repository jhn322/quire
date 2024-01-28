// start searching whenever you type something
document.getElementById("search-field").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  filterNotes(searchTerm);
});

// function for filtering notes
function filterNotes(searchTerm) {
  // retrieve notes from local storage
  const allStoredNotes = JSON.parse(localStorage.getItem("allNotes")) || [];

  // empty the note list
  const noteList = document.querySelector("#note-list");
  noteList.innerHTML = "";

  allStoredNotes.forEach(function (note) {
    const title = (note.title || "").toLowerCase(); // check if note.title is defined
    const text = (note.text || "").toLowerCase(); // check if note.text is defined

    if (title.includes(searchTerm) || text.includes(searchTerm)) {
      // display matching notes
      const searchedNote = createNoteElement(note.title, note.text);
      noteList.appendChild(searchedNote);
    }
  });
}

// create thumbnail in note list
function createNoteElement(title, text) {
  const searchedNoteDiv = document.createElement("div");
  searchedNoteDiv.classList.add("note-thumbnail");

  const titleElement = document.createElement("h3");
  titleElement.innerText = title;

  const textElement = document.createElement("p");
  textElement.innerText = text;

  searchedNoteDiv.appendChild(titleElement);
  searchedNoteDiv.appendChild(textElement);

  return searchedNoteDiv;
}
