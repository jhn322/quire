//variable for all icons in toolbar
const toolIcons = document.querySelectorAll('.tool-icon');

//variable for note field
const noteField = document.getElementById('note-field');

//variable to check if icon is already selected
let isBold = false;
let isItalic = false;
let isUnderline= false;

let markupText;

toolIcons.forEach(function(toolIcon){
    toolIcon.addEventListener('click', (event)=> {
        const { target } = event;
        console.log(target);
        const toolIconId = target.id; 
        console.log(toolIconId);

        event.preventDefault();
        
        switch(toolIconId) {
            case 'bold':
                applyBold();
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
noteField.addEventListener('mouseup', function(event) {
    event.preventDefault();
    checkSelectedText();
});
noteField.addEventListener('keyup', function(event) {
    if(event.shiftKey && event.key.includes('Arrow')) {
        event.preventDefault();
        checkSelectedText();
    }
});

//function to check and save selected text
function checkSelectedText() {
    // let selection = document.getSelection();
    
    // if (selection.toString().length > 0) {
    //     selectedText = selection.getRangeAt(0).toString();
    //     console.log('Markerad text: ' + selectedText);
    // } 
    // return selection;
    let selection = document.getSelection();
    
    if (selection.toString().length > 0) {
        let range = selection.getRangeAt(0);
        let startOffset = range.startOffset;
        let endOffset = range.endOffset;

        return {
            selectedText: selection.toString(),
            range: range,
            startOffset: startOffset,
            endOffset: endOffset,
            textBeforeSelection: noteField.textContent.substring(0, startOffset),
            textAfterSelection: noteField.textContent.substring(endOffset)
        };
    }
}

// function createSelectionInfo(selection, noteField) {

//     if(selection.toString().length > 0) {
//         let range = selection.getRangeAt(0);
//         let startOffset = range.startOffset;
//         let endOffset = range.endOffset;

//         return {
//             selectedText: selection.toString(),
//             range,
//             startOffset, 
//             endOffset,
//             textBeforeSelection: noteField.textContent.substring(0, startOffset),
//             textAfterSelection: noteField.textContent.substring(endOffset)
//         };
//     }
//     return null;
// };

//function to switch between bold and normal text
function applyBold() {
    // const boldBtn = document.getElementById('bold');

    let selectionInfo = checkSelectedText();
    console.log(selectionInfo);
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    // let range = selection.getRangeAt(0);
    // let startOffset = range.startOffset;
    // let endOffset = range.endOffset;

    // let selectedText = range.toString();

    // // markupText = noteField.textContent;

    // let textBeforeSelection = noteField.textContent.substring(0, startOffset);
    // let textAfterSelection = noteField.textContent.substring(endOffset);

    let selectedTextIndex = selectionInfo.range.startOffset;
    // console.log(selectedTextIndex);

    // console.log("innan:" + textBeforeSelection + ", markering:" + selectedText + ", efter:" + textAfterSelection);
    
    let regexPattern = new RegExp(`\\*\\*${selectionInfo.selectedText}\\*\\*`, "g");
    
    if(noteField.textContent.match(regexPattern)) {
        let matchIndex = noteField.textContent.search(regexPattern);

        if((matchIndex + 2) === selectedTextIndex) {
            console.log("Det finns stjärnor runt", selectionInfo.selectedText);
            noteField.textContent = `${selectionInfo.textBeforeSelection.slice(0, -2)} ${selectionInfo.selectedText} ${selectionInfo.textAfterSelection.slice(2)}`; 
        } else {
            console.log("Det finns inga stjärnor runt", selectionInfo.selectedText);
            noteField.textContent = `${selectionInfo.textBeforeSelection}**${selectionInfo.selectedText}**${selectionInfo.textAfterSelection}`;
        }  
    } else {
        console.log("Det finns inga stjärnor runt", selectionInfo.selectedText);
        noteField.textContent = `${selectionInfo.textBeforeSelection}**${selectionInfo.selectedText}**${selectionInfo.textAfterSelection}`;
    }

    // parseToText();
    }

    

    // if (selection.length < 1) {
    //     alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
    //     return;
    // }

    // //create a span element
    // const span = document.createElement('span');
    // console.log(span);

    // //check if bold is already applied
    // if(isBold) {
    //     span.style.fontWeight = "normal";
    //     boldBtn.classList.remove('tool-icon_active');
    // } else {
    //     span.style.fontWeight = "bold";
    //     boldBtn.classList.add('tool-icon_active');
    // }

    // //add the selected text to span element
    // span.innerHTML = selectedText;

    // //replace range content
    // range.deleteContents();
    // range.insertNode(span);

    // //toggle isBold
    // isBold = !isBold;
// }

function parseToText() {
    console.log("hej!", noteField.textContent);
    
    // Convert **text** to bold
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parsedText = noteField.textContent.replace(boldRegex, (_, content) => `<strong>${content}</strong>`);
    console.log(parsedText);
    noteField.innerHTML = parsedText;
    let selectionInfo = {};
    console.log("nu är selectionInfo:", selectionInfo);
    console.log("nu är selectedText:", selectionInfo.selectedText);
}

function parseToMarkup() {

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


