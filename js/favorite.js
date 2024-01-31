const demoTitle = document.getElementById('demoTitle');
const demoText = document.getElementById('demoText');
const note = document.getElementsByClassName('note');
const leftSide = document.getElementById('leftSide');
const navButton = document.getElementById('navButton');
let navClicked = false;
let noteArray = [];
const allNotes = localStorage.getItem("allNotes");
let getFirstNote = false;

if(allNotes !== null){
    noteArray = JSON.parse(allNotes);
    noteArray.forEach((note) => {
        if(note.isFavorite == true){
            if(getFirstNote == false){
                demoTitle.textContent = note.title;
                demoText.innerHTML = note.content;
                getFirstNote = true;
            }
            let newNote = `
            <div class="note" id="${note.id}">
                <b><i class="fas fa-star"></i></b>
                <h3>${note.title}</h3>
                <p class='content' id="${note.id}Text">${note.content}</p>
                <p class='noteDate'>${note.date}</p>
            </div>
            `;
            leftSide.innerHTML += newNote;
            document.getElementById(note.id).text = note.content;
            
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
}

document.addEventListener('click', (evt) => {
    if(evt.target.className == 'note'){
        demoTitle.textContent = document.getElementById(evt.target.id).noteTitle;
        demoText.innerHTML = document.getElementById(evt.target.id).text;
    }
    else if(evt.target.className == 'content'){
        let wrapperName = evt.target.id.slice(0, evt.target.id.length - 4);
        demoTitle.textContent = document.getElementById(wrapperName).noteTitle;
        demoText.innerHTML = document.getElementById(wrapperName).text;
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
});

function navButtonShape(f, s, t, color){
    let div = navButton.getElementsByTagName('div');
    div[0].style.transform = f;
    div[1].style.display = s;
    div[2].style.transform = t;
    for(let i = 0; i < div.length; i++)
        div[i].style.background = color;
}