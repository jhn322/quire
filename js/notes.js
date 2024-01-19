document.addEventListener("DOMContentLoaded", function () {
  // check local storage for stored notes
  const storedNotes = localStorage.getItem("notes");

  // update notes
  const notes = document.getElementById("note-field");
  notes.textContent = storedNotes;

  // button to save
  const saveBtn = document.getElementById("save-notes");

  // hide button
  saveBtn.classList.add("hide-btn");

  // show button when someone is typing
  notes.addEventListener("keyup", function () {
    if (this.value.length) {
      saveBtn.classList.remove("hide-btn");
    }
  });

  const noteTitle = document.getElementById('noteTitle');
  const noteField = document.getElementById('note-field');
  const noteList = document.querySelector('.note-list');

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    const newNotes = notes.value;

    localStorage.setItem("notes", newNotes);
    saveBtn.classList.add("hide-btn");

    let newNote = `
      <li class="note-thumbnail">
        <h3>${noteTitle.value}</h3>
        <p>${noteField.value}</p>
      </li>
    `;
    noteList.innerHTML += newNote;
  });
});
