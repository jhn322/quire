class Note {
  constructor(title, content, date = Date.now(), isFavorite = false, img = []) {
    (this.title = title),
      (this.content = content),
      (this.isFavorite = isFavorite),
      (this.date = date),
      (this.img = img);
  }
}

let activeNote = new Note("", "");
console.log(activeNote);

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

    let newNote = `
      <li class="note-thumbnail">
        <h3>${noteTitle.value}</h3>
        <p>${noteField.value}</p>
      </li>
    `;
    noteList.innerHTML += newNote;
    //check om id alrdy present
    //localStorage.getItem("notes")
    //setItem("allNotes")
    saveAllNotes(newNotes);
  });
});

function saveAllNotes(noteObject) {
  //get localstorage
  let allNotes = localStorage.getItem("allNotes") || "[]";
  allNotes = JSON.parse(allNotes);

  //make localstorage an array again
  //push new Object in

  //change to string and save in localstorage

  allNotes.push(activeNote);

  localStorage.setItem("allNotes", JSON.stringify(allNotes));

  console.log(allNotes);
}
