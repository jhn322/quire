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

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    const newNotes = notes.value;

    localStorage.setItem("notes", newNotes);
    saveBtn.classList.add("hide-btn");
    saveAllNotes(notes);

  });
});

let savedNotes=[];
function saveAllNotes(notes){


let testNote = {
  title: "variable here" ,
  content : localStorage.getItem("notes")
}
savedNotes.push(testNote)

console.log(JSON.stringify(savedNotes))
let test = JSON.stringify(savedNotes);
console.log(JSON.parse(test));
}
