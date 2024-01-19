const newNotes = document.querySelector('.newNotes');
const addNote = document.querySelector('.add-note');
const noteBtn = document.getElementById('noteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const noteList = document.querySelector('.note-list');


addNote.addEventListener('click', (evt) => {
    newNotes.style.display = "flex";
});

noteBtn.addEventListener('click', () => {
    if(noteTitle.value != "" && noteContent.value != ""){
        let newNote = `
        <li class="note-thumbnail" id=${Date.now()}>
            <h3>${noteTitle.value}</h3>
            <p>
              ${noteContent.value}
            </p>
          </li>
        `;
        noteList.innerHTML += newNote;
        newNotes.style.display = "none";
    } else {
        alert('Fill all the feilds');
    }
});