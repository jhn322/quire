const demoTitle = document.getElementById('demoTitle');
const demoText = document.getElementById('demoText');
const note = document.getElementsByClassName('note');
const leftSide = document.getElementById('leftSide');
let noteArray = [];
const allNotes = localStorage.getItem("allNotes");
let getFirstNote = false;

if(allNotes !== null){
    noteArray = JSON.parse(allNotes);
    noteArray.forEach((note) => {
        if(note.isFavorite == true){
            if(getFirstNote == false){
                demoTitle.textContent = note.title;
                demoText.textContent = note.content;
                getFirstNote = true;
            }
            let newNote = `
            <div class="note" id="${note.id}">
                <b>⭐</b>
                <h3>${note.title}</h3>
                <p class='content'>${note.content}</p>
                <p class='noteDate'>${note.date}</p>
            </div>
            `;
            leftSide.innerHTML += newNote;
            document.getElementById(note.id).text = note.content;
        }
    });
} else {
    
}

for(let i = 0; i < note.length; i++){
    note[i].title = note[i].getElementsByTagName('h3')[0].textContent;
    note[i].text = note[i].getElementsByTagName('p')[0].textContent;
}

document.addEventListener('click', (evt) => {
    if(evt.target.className == 'note'){
        demoTitle.textContent = document.getElementById(evt.target.id).title;
        demoText.textContent = document.getElementById(evt.target.id).text;
    }
});