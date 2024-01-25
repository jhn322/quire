class Note {
  constructor(
    title,
    content,
    date = Date.now(),
    id = Date.now(),
    isFavorite = false,
    img = []
  ) {
    (this.title = title),
      (this.content = content),
      (this.isFavorite = isFavorite),
      (this.date = date),
      (this.id = id),
      (this.img = img);
  }
}

let activeNote = new Note("", "");
console.log(activeNote);
renderAllTumbnails();
document.addEventListener("DOMContentLoaded", function () {
  // check local storage for stored notes
  // const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
  activeNote = JSON.parse(localStorage.getItem("notes")) || {};
  // update notes
  const notes = document.getElementById("note-field");
  notes.textContent = activeNote.content;
  // notes.textContent = storedNotes.noteText;
  const title = document.getElementById("noteTitle");
  // title.value = storedNotes.noteTitle || "";
  title.value = activeNote.title;

  // button to save
  const saveBtn = document.getElementById("save-notes");

  // hide button
  saveBtn.classList.add("hide-btn");

  // show button when someone is typing
  notes.addEventListener("keyup", function () {
    if (this.value.length) {
      console.log(this.value.length);
      saveBtn.classList.remove("hide-btn");
    }
  });

  const noteTitle = document.getElementById("noteTitle");
  const noteField = document.getElementById("note-field");
  const noteList = document.querySelector(".note-list");
  const addNote = document.querySelector(".add-note");

  addNote.addEventListener("click", () => {
    noteTitle.value = "";
    noteField.value = "";
    activeNote = new Note(noteTitle.value, noteField.value);
    console.log(activeNote);
  });

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    let newNotes = {
      noteTitle: title.value,
      noteText: notes.value,
      noteId: activeNote.date,
    };

    activeNote.title = title.value;
    activeNote.content = notes.value;
    console.log(activeNote);
    localStorage.setItem("notes", JSON.stringify(activeNote));
    saveBtn.classList.add("hide-btn");

    // let newNote = `
    //   <li class="note-thumbnail">
    //     <h3>${noteTitle.value}</h3>
    //     <p>${noteField.value}</p>
    //   </li>
    // `;
    // noteList.innerHTML += newNote;
    //check om id alrdy present
    //localStorage.getItem("notes")
    //setItem("allNotes")
    saveAllNotes(activeNote);
  });
});

function saveAllNotes(noteObject) {
  //get localstorage
  let allNotes = localStorage.getItem("allNotes") || "[]";
  allNotes = JSON.parse(allNotes);

  //Checks if the current note exists, if not adds it to "allnotes" local storage;
  let checkNote = [];
  checkNote = allNotes.filter((e) => noteObject.id === e.id);
  if (checkNote.length === 0) {
    allNotes.push(activeNote);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
    createTumbnail(activeNote);
  } else {
    updateNote(noteObject, allNotes);
    renderAllTumbnails();
  }
}

//If there's no new note the existing note's updated with the new content
function updateNote(noteObject, allNotes) {
  allNotes.forEach((note) => {
    if (note.id === noteObject.id) {
      note.content = noteObject.content;
      note.title = noteObject.title;
    }
  });
  localStorage.setItem("allNotes", JSON.stringify(allNotes));
}

function createTumbnail(noteObject) {
  const noteList = document.querySelector(".note-list");
  const newListItem = document.createElement("li");
  const newTitle = document.createElement("h3");
  const newContent = document.createElement("p");
  const favorite = document.createElement("button");
  const deletebtn = document.createElement("button");

  newListItem.id = noteObject.date;
  newListItem.classList.add("note-thumbnail");

  newTitle.textContent = noteObject.title;
  newContent.textContent = noteObject.content;

  favorite.textContent = "favorite-star here";
  favorite.addEventListener("click", () => {
    console.log("now it is a favorite!");
  });

  deletebtn.textContent = "delete";
  deletebtn.addEventListener("click", () => {
    console.log("it is deleted");
  });

  newListItem.appendChild(newTitle);
  newListItem.appendChild(newContent);
  newListItem.appendChild(favorite);
  newListItem.appendChild(deletebtn);
  noteList.appendChild(newListItem);
}

function renderAllTumbnails() {
  const allNotes = JSON.parse(localStorage.getItem("allNotes")) || "";
  const noteList = document.querySelector(".note-list");
  noteList.innerHTML = "";
  if (allNotes != "") {
    allNotes.forEach((noteObject) => {
      createTumbnail(noteObject);
    });
  }
}
