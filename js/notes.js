document.addEventListener("DOMContentLoaded", function () {
  // check local storage for stored notes
  const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};

  // update notes
  const notes = document.getElementById("note-field");
  notes.textContent = storedNotes.noteText;
  const title = document.getElementById('noteTitle');
  title.textContent = storedNotes.noteTitle || "";

  // button to save
  const saveBtn = document.getElementById("save-notes");

  // hide button
  saveBtn.classList.add("hide-btn");

  // show button when someone is typing
  notes.addEventListener("keyup", function () {
    if (this.textContent.length) {
      saveBtn.classList.remove("hide-btn");
    }
  });

  const noteList = document.querySelector('.note-list');
  const addNote = document.querySelector('.add-note');

  addNote.addEventListener('click', () => {
    title.textContent = "Titel...";
    notes.textContent = "";
  });

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    let newNotes = {
      noteTitle: title.textContent, 
      noteText: notes.textContent
    }
    
    localStorage.setItem("notes", JSON.stringify(newNotes));
    saveBtn.classList.add("hide-btn");

    let newNote = `
      <li class="note-thumbnail">
        <h3>${title.textContent}</h3>
        <p>${notes.textContent}</p>
      </li>
    `;
    noteList.innerHTML += newNote;
  });
});

