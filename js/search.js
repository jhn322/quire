// start searching whenever you type something
document.getElementById("search-field").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  filterNotes(searchTerm);
});
filterNotes("");

// function for filtering notes
function filterNotes(searchTerm) {
  // retrieve notes from local storage
  const allStoredNotes = JSON.parse(localStorage.getItem("allNotes")) || [];

  // empty the note list
  const noteList = document.querySelector("#note-list");
  noteList.innerHTML = "";

  allStoredNotes.forEach(function (note) {
    const title = (note.title || "").toLowerCase(); // check if note.title is defined
    const content = (note.content || "").toLowerCase(); // check if note.text is defined

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      // display matching notes
      createTumbnail(note);
    }
  });
}

//Eventlistenter on notes in sidebar on click to index
document.getElementById("note-list").addEventListener("click", (e) => {
  let test = parseInt(e.target.id);
  if(e.target.className == "note-thumbnail")
  redirectToIndex(test);
});

//function that redirects to the correct note on index page
function redirectToIndex(id) {
  const allStoredNotes = JSON.parse(localStorage.getItem("allNotes"));
  allStoredNotes.forEach((note) => {
    if (note.id == id) {
      localStorage.setItem("notes", JSON.stringify(note));
      localStorage.updateNote = true;
      window.location.href = "/index.html";
    }
  });
}
