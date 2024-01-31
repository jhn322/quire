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

let noteArray = [];
let activeNote = new Note("", "");
renderAllTumbnails();
document.addEventListener("DOMContentLoaded", function () {
  // check local storage for stored notes
  activeNote = JSON.parse(localStorage.getItem("notes")) || new Note("","");
  // update notes
  const noteField = document.getElementById("note-field");
  const title = document.getElementById("title");

    noteField.innerHTML = activeNote.content;
  title.value = activeNote.title;

  

  // button to save
  const saveBtn = document.getElementById("save-notes");

  // hide button
  saveBtn.classList.add("hide-btn");

  // show button when someone is typing
  noteField.addEventListener("keyup", function () {
    if (this.textContent.length) {
      saveBtn.classList.remove("hide-btn");
    }
  });

  const addNote = document.querySelector(".add-note");

  addNote.addEventListener("click", () => {
    const toolbar = document.getElementById('toolbar');
    toolbar.classList.remove('toolbar-hidden');

    title.value = "";
    noteField.textContent = "";
    activeNote = new Note(title.value, noteField.value);
  });

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    let image = noteField.getElementsByTagName('img');
    let imageArray = [];
    for(let i = 0; i < image.length; i++)
      imageArray.push(image[i].src);
    activeNote.img = imageArray;
    activeNote.title = title.value;
    activeNote.content = noteField.innerHTML;
    localStorage.setItem("notes", JSON.stringify(activeNote));
    saveBtn.classList.add("hide-btn");

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
  const favorite = document.createElement("b");
  const deletebtn = document.createElement("b");

  newListItem.id = noteObject.id + 'Wrapper';
  newListItem.classList.add("note-thumbnail");
  newListItem.isFavorite = noteObject.isFavorite;

  newTitle.textContent = noteObject.title;
  newContent.innerHTML = noteObject.content;

  favorite.innerHTML = '<i class="fas fa-star"></i>';
  favorite.id = noteObject.id;
  favorite.className = 'star greyStar';
  if(noteObject.isFavorite == false)
    favorite.className = 'star greyStar';
  else
    favorite.className = 'star';

  deletebtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deletebtn.className = 'deleteNote';
  // Delete notes
  deletebtn.onclick = () => {
    document.getElementById(newListItem.id).classList.add('noteDeleted');
    setTimeout(() => {
      document.getElementById(newListItem.id).remove();
    }, 300);
    let tempArray = noteArray;
    noteArray = tempArray.filter((n) => n.id != noteObject.id);
    localStorage.setItem("allNotes", JSON.stringify(noteArray));
  }

  // Put images in container
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'imageWrapper';
  noteObject.img.forEach((img) => {
    const image = document.createElement('img');
    image.src = img;
    imageWrapper.appendChild(image);
  });


  newListItem.appendChild(newTitle);
  newListItem.appendChild(newContent);
  newListItem.appendChild(favorite);
  newListItem.appendChild(deletebtn);
  newListItem.appendChild(imageWrapper);
  noteList.appendChild(newListItem);

  noteArray= JSON.parse(localStorage.getItem("allNotes"))
}

function renderAllTumbnails() {
  const allNotes = JSON.parse(localStorage.getItem("allNotes")) || "";
console.log(allNotes);
  noteArray = allNotes;

  const noteList = document.querySelector(".note-list");
  noteList.innerHTML = "";

  if (allNotes != "") {
    allNotes.forEach((noteObject) => {
      createTumbnail(noteObject);
    });
  }
}


let currentNoteStarId = '';
document.addEventListener('click', (evt) => {
  if(evt.target.className.slice(0, 4) == 'star'){
    currentNoteStarId = evt.target.id;
    let noteId = document.getElementById(currentNoteStarId + 'Wrapper');
    if(noteId.isFavorite == false){
      noteId.isFavorite = true;
      document.getElementById(currentNoteStarId).classList.remove('greyStar');
      searchInNote(currentNoteStarId, true);
    } else {
      noteId.isFavorite = false;
      document.getElementById(currentNoteStarId).classList.add('greyStar');
      searchInNote(currentNoteStarId, false);
    }
  }
  else if(evt.target.className == 'menu-icon fa-solid fa-star')
    window.location.href = 'favorite.html';
});

function searchInNote(n, isFav){
  noteArray.find(note => {
    if(note.id == n){
      note.isFavorite = isFav;
      localStorage.setItem("allNotes", JSON.stringify(noteArray));
    }
  });
}