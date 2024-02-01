class Note {
  constructor(
    title,
    content,
    savedDate = "",
    editedDate = "",
    id = Date.now(),
    isFavorite = false,
    img = []
  ) {
    (this.title = title),
      (this.content = content),
      (this.isFavorite = isFavorite),
      (this.savedDate = savedDate),
      (this.editedDate = editedDate),
      (this.id = id),
      (this.img = img);
  }
}

//list of months
let monthsList = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];


let noteArray = [];
let activeNote = new Note("", "");
renderAllTumbnails();
let isNewNote = false;

document.addEventListener("DOMContentLoaded", function () {
  // check local storage for stored notes
  activeNote = JSON.parse(localStorage.getItem("notes")) || new Note("", "");
  // update notes
  const noteField = document.getElementById("note-field");
  const title = document.getElementById("title");
  const noteDtae = document.querySelector('#noteDate');


  noteField.innerHTML = activeNote.content;
  title.value = activeNote.title;
  noteDtae.innerHTML = getDate();

  // button to save
  const saveBtn = document.getElementById("save-notes");

  // hide button
  saveBtn.classList.add("hide-btn");


  const addNote = document.querySelector(".add-note");

  addNote.addEventListener("click", () => {
    const toolbar = document.getElementById("toolbar");
    toolbar.classList.remove("toolbar-hidden");
    isNewNote = true;
    title.value = "";
    noteField.textContent = "";
    activeNote = new Note(title.value, noteField.value);
    console.log(activeNote);
  });

  // save to local storage when pressing button
  saveBtn.addEventListener("click", function () {
    let image = noteField.getElementsByTagName('img');
    let imageArray = [];
    for(let i = 0; i < image.length; i++)
      imageArray.push(image[i].src);
    if(isEditingNote == false){
      activeNote.img = imageArray;
      activeNote.title = title.value;
      activeNote.content = noteField.innerHTML;
      activeNote.savedDate = noteDtae.innerHTML;
      activeNote.editedDate = noteDtae.innerHTML;
      localStorage.setItem("notes", JSON.stringify(activeNote));
      saveBtn.classList.add("hide-btn");

      saveAllNotes(activeNote);
    } else {
      saveChanges();
    }
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
  const newDate = document.createElement('div');
  const favorite = document.createElement("p");
  const deletebtn = document.createElement("p");

  newListItem.id = noteObject.id + "Wrapper";
  newListItem.classList.add("note-thumbnail");
  newListItem.isFavorite = noteObject.isFavorite;

  newListItem.noteTitle = noteObject.title;
  newListItem.content = noteObject.content;
  newListItem.savedDate = noteObject.savedDate;
  newListItem.idAddress = noteObject.id;
  newListItem.images = noteObject.img;

  newTitle.textContent = noteObject.title;
  newTitle.className = 'noteTitle';
  newContent.innerHTML = noteObject.content;
  newContent.className = 'noteContent';

  favorite.innerHTML = '<i class="fas fa-star"></i>';
  newDate.className = 'thumbnailDate';
  const savedDate = document.createElement("span");
  savedDate.textContent = `skapat ${noteObject.savedDate}`;
  const editDate = document.createElement("span");
  editDate.textContent = `senaste ändring ${noteObject.editedDate}`;
  newDate.appendChild(savedDate);
  newDate.appendChild(editDate);

  favorite.id = noteObject.id;
  favorite.className = "star greyStar";
  if (noteObject.isFavorite == false) favorite.className = "star greyStar";
  else favorite.className = "star";

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
  newListItem.appendChild(newDate);
  noteList.appendChild(newListItem);

  noteArray = JSON.parse(localStorage.getItem("allNotes"));
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

let currentNoteStarId = "";
document.addEventListener("click", (evt) => {
  if (evt.target.className.slice(0, 4) == "star") {
    currentNoteStarId = evt.target.id;
    let noteId = document.getElementById(currentNoteStarId + "Wrapper");
    if (noteId.isFavorite == false) {
      noteId.isFavorite = true;
      document.getElementById(currentNoteStarId).classList.remove("greyStar");
      searchInNote(currentNoteStarId, true);
    } else {
      noteId.isFavorite = false;
      document.getElementById(currentNoteStarId).classList.add("greyStar");
      searchInNote(currentNoteStarId, false);
    }
  } else if (evt.target.className == "menu-icon fa-solid fa-star")
    window.location.href = "favorite.html";
});

function searchInNote(n, isFav) {
  noteArray.find((note) => {
    if (note.id == n) {
      note.isFavorite = isFav;
      localStorage.setItem("allNotes", JSON.stringify(noteArray));
    }
  });
}


//get the date for notes
function getDate(){
  const date = new Date()
  //return `${date.getFullYear()}-${((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '') + date.getDate()}`
  return `${monthsList[date.getMonth()]} ${(date.getDate() < 10 ? '0' : '') + date.getDate()}, ${date.getFullYear()}`

}

console.log(getDate())

let editedNote = JSON.parse(localStorage.getItem("notes")) || '';
let currentNote = editedNote.id;
let newNoteArray = [];

let isEditingNote = false;
document.addEventListener('click', (evt) => {
  if(evt.target.className == 'note-thumbnail'){
    currentNote = evt.target.idAddress;
    title.value = evt.target.noteTitle;
    noteField.innerHTML = evt.target.content;
    setNewObject();
    isNewNote = false;
  }
  else if(evt.target.parentNode.id == 'note-field'
  || evt.target.id == 'note-field'
  || evt.target.id == 'title'
  || evt.target.id == 'toolbar'
  || evt.target.parentNode.id == 'toolbar'){
    addOrEditMode();
    if(isNewNote == false)
    isEditingNote = true;
  } else {
    noteField.classList.remove('updateModeBorder');
    noteField.setAttribute("contenteditable", false);
    title.style.border = 'none';
    document.getElementById('save-notes').classList.add("hide-btn");
    document.querySelector('.toolbar').classList.remove('showToolbar');
    isEditingNote = false;
  }
  if(evt.target.className == 'add-note')
    addOrEditMode();
});

function addOrEditMode(){
  noteField.setAttribute("contenteditable", true);
  noteField.classList.add('updateModeBorder');
  title.style.border = 'solid 2px #aaa';
  document.getElementById('save-notes').classList.remove("hide-btn");
  document.querySelector('.toolbar').classList.add('showToolbar');
}

function setNewObject(){
  let thisNote = document.getElementById(currentNote + 'Wrapper');
  let image = noteField.getElementsByTagName('img');
  let imageArray = [];
  for(let i = 0; i < image.length; i++)
    imageArray.push(image[i].src);
  let newObj = {
    id: thisNote.idAddress,
    isFavorite: thisNote.isFavorite,
    title: title.value,
    content: noteField.innerHTML,
    savedDate: thisNote.savedDate,
    img: imageArray,
    editedDate: getDate()
  }
  editedNote = newObj;
}

document.addEventListener('input', (evt) => {
  if(isEditingNote == true)
  if(evt.target.id == 'title' || evt.target.id == 'note-field'){
    setNewObject();
  }
});

function saveChanges(){
  let thisNote = document.getElementById(currentNote + 'Wrapper');
  thisNote.getElementsByTagName('h3')[0].textContent = editedNote.title;
  thisNote.getElementsByTagName('p')[0].innerHTML = editedNote.content;
  thisNote.getElementsByTagName('p')[0].innerHTML = editedNote.content;
  let images = thisNote.querySelector('.imageWrapper');
  while(images.lastElementChild)
  images.removeChild(images.lastElementChild);
  editedNote.img.forEach((img) => {
    const image = document.createElement('img');
    image.src = img;
    images.appendChild(image);
  });

  newNoteArray = [];
  noteArray = JSON.parse(localStorage.getItem("allNotes"));
  localStorage.setItem("notes", JSON.stringify(editedNote));

  noteArray.forEach(notes => {
    if(notes.id !== currentNote)
      newNoteArray.push(notes);
    else
      newNoteArray.push(editedNote);
  });
  localStorage.setItem("allNotes", JSON.stringify(newNoteArray));
}