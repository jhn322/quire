const demo = document.getElementById('demo');
const demoTitle = document.getElementById('demoTitle');
const demoText = document.getElementById('demoText');
const note = document.getElementsByClassName('note');
const noteList = document.getElementById('noteList');
const navButton = document.getElementById('navButton');
let navClicked = false;
let noteArray = [];
const allNotes = localStorage.getItem("allNotes");
let getFirstNote = false;

if(allNotes !== null){
    noteArray = JSON.parse(allNotes);
    noteArray.forEach((note) => {
        if(note.isFavorite == true){
            let noteAge = getNoteAge(note.savedDate);
            if(getFirstNote == false){
                demoTitle.textContent = note.title;
                demoText.innerHTML = note.content;
                demo.dataset.content = `${noteAge}, Skapat ${note.savedDate}, Senaste ändring ${note.editedDate}`;
                getFirstNote = true;
            }
            let newNote = `
            <div class="note" id="${note.id}">
                <b class='star' onclick='favToggle(${note.id})'><i class="fas fa-star"></i></b>
                <a class='deleteNote' onclick='deleteNote(${note.id})'><i class="fas fa-trash-alt"></i></a>
                <h3>${note.title}</h3>
                <p class='content' id="${note.id}Text">${note.content}</p>
                <p class='noteDate'>${noteAge}<br>Skapat ${note.savedDate}<br>Senaste ändring ${note.editedDate}</p>
            </div>
            `;
            noteList.innerHTML += newNote;

            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'imageWrapper';
            note.img.forEach((img) => {
              const image = document.createElement('img');
              image.src = img;
              imageWrapper.appendChild(image);
            });
            document.getElementById(note.id).appendChild(imageWrapper);
        }
    });
}

for(let i = 0; i < note.length; i++){
    note[i].noteTitle = note[i].getElementsByTagName('h3')[0].textContent;
    note[i].text = note[i].getElementsByTagName('p')[0].innerHTML;
    note[i].date = note[i].getElementsByTagName('p')[1].innerHTML.replaceAll('<br>', ', ');
    note[i].isFavorite = true;
}

let currentNote; 
if(note.length != 0){
   selectedItem(note[0].id);
   currentNote = note[0].id;
}


document.addEventListener('click', (evt) => {
    if(evt.target.className == 'note'){
        currentNote = evt.target.id;
        demoTitle.textContent = document.getElementById(evt.target.id).noteTitle;
        demoText.innerHTML = document.getElementById(evt.target.id).text;
        demo.scrollTop = 0;
        demo.dataset.content = document.getElementById(evt.target.id).date;
        selectedItem(evt.target.id);
    }
    else if(evt.target.className == 'content'){
        let wrapperName = evt.target.id.slice(0, evt.target.id.length - 4);
        currentNote = wrapperName;
        demoTitle.textContent = document.getElementById(wrapperName).noteTitle;
        demoText.innerHTML = document.getElementById(wrapperName).text;
        selectedItem(wrapperName);
    }
    else if(evt.target.id == 'navButton'){
        if (navClicked === false){
            document.querySelector('.side').style.display = 'flex';
            navClicked = true;
            navButtonShape('translate(10%, 100%) rotate(45deg)', 'none', 'translate(10%, -100%) rotate(-45deg)', 'white');
        } else {
            document.querySelector('.side').style.display = 'none';
            navClicked = false;
            navButtonShape('rotate(0deg) translate(0%, 0%)', 'block', 'rotate(0deg) translate(0%, 0%)', 'black');
        }
    }
    else if(evt.target.id == 'demo'){
        noteArray.find(note => {
            if(note.id == currentNote){
                localStorage.setItem("notes", JSON.stringify(note));
                location.href = 'index.html';
                localStorage.updateNote = true;
            }
        });
    }
});

function navButtonShape(f, s, t, color){
    let div = navButton.getElementsByTagName('div');
    div[0].style.transform = f;
    div[1].style.display = s;
    div[2].style.transform = t;
    for(let i = 0; i < div.length; i++)
        div[i].style.background = color;
}

function deleteNote(note){
    document.getElementById(note).classList.add('noteDeleted');
    setTimeout(() => {
      document.getElementById(note).remove();
    }, 300);
    let tempArray = noteArray;
    noteArray = tempArray.filter((n) => n.id != note);
    localStorage.setItem("allNotes", JSON.stringify(noteArray));
}

function favToggle(note){
    let currentNote = document.getElementById(note);
    if(currentNote.isFavorite === true){
        currentNote.isFavorite = false;
        currentNote.getElementsByClassName('star')[0].classList.add('greyStar')
    } else {
        currentNote.isFavorite = true;
        currentNote.getElementsByClassName('star')[0].classList.remove('greyStar')
    }
    noteArray.find(notes => {
        if(notes.id == note){
            notes.isFavorite = currentNote.isFavorite;
            localStorage.setItem("allNotes", JSON.stringify(noteArray));
        }
    });
}

function selectedItem(n){
    for(let i = 0; i < note.length; i++)
        note[i].classList.remove('selectedNote');
    document.getElementById(n).classList.add('selectedNote');
}


function getNoteAge(noteDate){
    let monthsList = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

    let noteDayTemp = noteDate.split(',')[0];
    let noteDay = noteDayTemp.split(' ')[1]; // ex. 1

    let noteMonthName = noteDate.split(' ')[0]; // ex. juni
    let noteMonth = monthsList.indexOf(noteMonthName) + 1; // ex. 6

    let noteYear = noteDate.split(' ')[2]; // ex. 2024

    let nowDay = new Date().getDate();
    let nowMonth = new Date().getMonth() + 1;
    let nowYear = new Date().getFullYear();

    let nmOfDays = ((nowDay - noteDay) + ((nowMonth - noteMonth)*30) + ((nowYear - noteYear)*365));

    if (nmOfDays >= 365)
        nmOfDays = Math.floor(nmOfDays/365) + ' year old note';
    else if (nmOfDays >= 30)
        nmOfDays = Math.floor(nmOfDays/30) + ' month old note';
    else if (nmOfDays < 30 && nmOfDays > 0)
        nmOfDays = nmOfDays + ' day old note';
    else if(nmOfDays == 0)
        nmOfDays = 'Note is created today';
    else
        nmOfDays = 'Note is created in the future, ' + nmOfDays*-1 + ' days from now';

    return nmOfDays;
}
console.log(getNoteAge('februari 10, 2024'));