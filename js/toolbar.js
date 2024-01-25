//variable for all icons in toolbar
const toolIcons = document.querySelectorAll('.tool-icon');

//variable for note field
const noteField = document.getElementById('note-field');

//get notes from localStorage
// const notes = JSON.parse(localStorage.getItem('notes')) || {};

//variable to check if icon is already selected
let isBoldActive = false;
let isItalicActive = false;
let isUnderlineActive = false;

toolIcons.forEach(function(toolIcon){
    toolIcon.addEventListener('click', (event)=> {
        const { target } = event;
        console.log(target);
        const toolIconId = target.id; 
        console.log(toolIconId);
        
        switch(toolIconId) {
            case 'bold':
                isBoldActive = !isBoldActive;
                console.log(isBoldActive);
                if(isBoldActive) {
                    console.log("Nu ska texten bli fet");
                    makeTextBold();
                } else {
                    removeBold();
                }
                break;
            case 'italic':
                isItalicActive = !isItalicActive;
                console.log("Nu ska texten bli kursiv");
                break;
            case 'underline':
                isUnderlineActive = !isUnderlineActive;
                console.log("Nu ska texten bli understruken");
                break;
            case 'ul-list':
                console.log("Nu ska vi skapa en ul-list");
                break;
            case 'ol-list':
                console.log("Nu ska vi skapa en ol-list");
                break;
            case 'add-image':
                console.log("Nu ska vi lägga till en bild");
                break;
        }
        toolIcon.classList.toggle('tool-icon_active');
    })
})

function makeTextBold() {
    //code to get selected text
    const selectedText = window.getSelection().toString();
    console.log(selectedText);
    console.log(typeof selectedText);

    const formattedText = `<strong>${selectedText}</strong>`;
    console.log(formattedText);

    let text = noteField.innerHTML;
    noteField.innerHTML = text.replace(selectedText, formattedText); 
}


function removeBold() {
    //code to get selected text
    const selectedText = window.getSelection().toString();
    console.log(selectedText);
    console.log(typeof selectedText);

    console.log("Nu ska den feta stilen bort!");
}


