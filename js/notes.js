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
    const selectTextType = document.getElementById("text-type");
    
    //function to set all tools in toolbar to default values
    resetToolbar();
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

// ---- function to reset toolbar when starting new note ----
function resetToolbar(){
  const selectTextType = document.getElementById("text-type");
  selectTextType.selectedIndex = 6;
  const selectFontFamily = document.getElementById("font-family");
  selectFontFamily.selectedIndex = 1;
  const selectFontSize = document.getElementById("font-size");
  selectFontSize.selectedIndex = 2;

  const toolButtons = document.querySelectorAll(".tool-icon");
  toolButtons.forEach(function (toolButton) {
    toolButton.classList.remove("tool-btn-highlight")
  });
};

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


function renderAllTumbnails() {
  const allNotes = JSON.parse(localStorage.getItem("allNotes")) || "";
  noteArray = allNotes;

  if (allNotes != "") {
    allNotes.forEach((noteObject) => {
      createTumbnail(noteObject, document.querySelector(".note-list"));
    });
  }
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
    viewItem();
    isEditingNote = false;
  }
  else if(evt.target.id == 'note-field'
  || evt.target.id == 'title'
  || evt.target.parentNode.id == 'note-field'){
    addOrEditMode();
    if(isNewNote == false)
    isEditingNote = true;
  }
  else if(evt.target.id == 'save-notes'){
    viewItem();
    isEditingNote = false;
  }
  if(evt.target.className == 'add-note')
    addOrEditMode();
});

function viewItem(){
  document.getElementById("note-field").classList.remove('updateModeBorder');
  document.getElementById("note-field").setAttribute("contenteditable", false);
  title.style.border = 'none';
  document.getElementById('save-notes').classList.add("hide-btn");
  document.querySelector('.toolbar').classList.remove('showToolbar');
}

if(localStorage.updateNote != undefined)
  setTimeout(() => { addOrEditMode() }, 100);
delete localStorage.updateNote;

function addOrEditMode(){
  document.getElementById("note-field").setAttribute("contenteditable", true);
  document.getElementById("note-field").classList.add('updateModeBorder');
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