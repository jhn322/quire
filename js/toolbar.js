//variable for all icons in toolbar
const toolIcons = document.querySelectorAll('.tool-icon');

//variable for note field
const noteField = document.getElementById('note-field');

//variable to check if icon is already selected
let isBold = false;
let isItalic = false;
let isUnderline= false;

let selectedText = null;
let range = null;

toolIcons.forEach(function(toolIcon){
    toolIcon.addEventListener('click', (event)=> {
        const { target } = event;
        console.log(target);
        const toolIconId = target.id; 
        console.log(toolIconId);
        
        switch(toolIconId) {
            case 'bold':
                toggleBold();
                break;
            case 'italic':
                toggleItalic();
                break;
            case 'underline':
                toggleUnderline();
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
    })
})

//eventlistener on mouse up and key combination of shift and arrow
noteField.addEventListener('mouseup', checkSelectedText);
noteField.addEventListener('keyup', function(event) {
    if(event.shiftKey && event.key.includes('Arrow')) {
        checkSelectedText();
    }
})

//function to check and save selected text
function checkSelectedText() {
    let selection = window.getSelection().toString();
    
    if (selection.length > 0) {
        selectedText = selection.toString();
        range = window.getSelection().getRangeAt(0);
        console.log('Markerad text: ' + selectedText);
    }
    return selection;
};

//function to switch between bold and normal text
function toggleBold() {
    const boldBtn = document.getElementById('bold');

    selection = checkSelectedText()

    if (selection.length < 1) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    //create a span element
    const span = document.createElement('span');
    console.log(span);

    //check if bold is already applied
    if(isBold) {
        span.style.fontWeight = "normal";
        boldBtn.classList.remove('tool-icon_active');
    } else {
        span.style.fontWeight = "bold";
        boldBtn.classList.add('tool-icon_active');
    }

    //add the selected text to span element
    span.innerHTML = selectedText;

    //replace range content
    range.deleteContents();
    range.insertNode(span);

    //toggle isBold
    isBold = !isBold;
}

//function to switch between italic and normal text
function toggleItalic() {
    const italicBtn = document.getElementById('italic');

    selection = checkSelectedText()

    if (selection.length < 1) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    //create a span element
    const span = document.createElement('span');
    console.log(span);

    //check if bold is already applied
    if(isItalic) {
        span.style.fontStyle = "normal";
        italicBtn.classList.remove('tool-icon_active');
    } else {
        span.style.fontStyle = "italic";
        italicBtn.classList.add('tool-icon_active');
    }

    //add the selected text to span element
    span.innerHTML = selectedText;

    //replace range content
    range.deleteContents();
    range.insertNode(span);

    //toggle isBold
    isItalic = !isItalic;
}

//function to switch between underlined and normal text
function toggleUnderline() {
    const underlineBtn = document.getElementById('underline');

    selection = checkSelectedText()

    if (selection.length < 1) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    //create a span element
    const span = document.createElement('span');
    console.log(span);

    //check if bold is already applied
    if(isUnderline) {
        span.style.textDecoration = "none";
        underlineBtn.classList.remove('tool-icon_active');
    } else {
        span.style.textDecoration = "underline";
        underlineBtn.classList.add('tool-icon_active');
    }

    //add the selected text to span element
    span.innerHTML = selectedText;

    //replace range content
    range.deleteContents();
    range.insertNode(span);

    //toggle isUnderlined
    isUnderline = !isUnderline;
}


