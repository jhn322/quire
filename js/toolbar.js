//variable for all icons in toolbar
const toolIcons = document.querySelectorAll('.tool-icon');

//variable for note field
const noteField = document.getElementById('note-field');

toolIcons.forEach(function(toolIcon){
    toolIcon.addEventListener('click', (event)=> {
        const { target } = event;
        console.log(target);
        const toolIconId = target.id; 
        console.log(toolIconId);

        event.preventDefault();
        
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
    let selection = window.getSelection();
    
    if (selection && selection.toString().length > 0) {
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

//function to switch between bold and normal text
function toggleBold() {
    
    let selectionInfo = checkSelectedText();
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    const regexPatternBold= new RegExp(`<strong>(<u>|<i>)*${selectionInfo.selectedText}(<\/u>|<\/i>)*<\/strong>|<strong>${selectionInfo.selectedText}<\/strong>`, "gi");

    if(noteField.innerHTML.match(regexPatternBold)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternBold, (match) => {
            return match.replace(/<\/?strong>/g, '');
          }); 
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<strong>${selectionInfo.selectedText}</strong>`);
    }

    selectionInfo = {};
}

//function to switch between italic and normal text
function toggleItalic() {

    let selectionInfo = checkSelectedText();
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    const regexPatternItalic = new RegExp(`<i>(<strong>|<u>)*${selectionInfo.selectedText}(<\/strong>|<\/u>)*<\/i>|<i>${selectionInfo.selectedText}<\/i>`, "gi");
    
    if(noteField.innerHTML.match(regexPatternItalic)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternItalic, (match) => {
            return match.replace(/<\/?i>/g, '');
          });
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<i>${selectionInfo.selectedText}</i>`);
    }

    selectionInfo = {};
}

//function to switch between underlined and normal text
function toggleUnderline() {

    let selectionInfo = checkSelectedText();
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    const regexPatternUnderline = new RegExp(`<u>(<strong>|<i>)*${selectionInfo.selectedText}(<\/strong>|<\/i>)*<\/u>|<u>${selectionInfo.selectedText}<\/u>`, "gi");
    
    if(noteField.innerHTML.match(regexPatternUnderline)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternUnderline, (match) => {
            return match.replace(/<\/?u>/g, '');
          });
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<u>${selectionInfo.selectedText}</u>`);
    }

    selectionInfo = {};
}

// -----------------------------------------------------------------------------------
// ------   Type of Text Section -----------------------------------------------------
// -----------------------------------------------------------------------------------
const selectTextType = document.getElementById('text-type');

selectTextType.addEventListener('change', function(event){
    event.preventDefault();
    changeTextType(event);
});

function changeTextType(event) {

    let selectionInfo = checkSelectedText();

    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }
    
    let { target } = event;
    let { value } = target;

    const regexPatternTextType= new RegExp(`<(h[1-6]|p)>(<u>|<i>|<strong>)*${selectionInfo.selectedText}(<\/u>|<\/i>|<\/strong>)*<\/(h[1-6]|p)>|<(h[1-6]|p)>${selectionInfo.selectedText}<\/(h[1-6]|p)>`, "gi");
    
    if(noteField.innerHTML.match(regexPatternTextType)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternTextType, (match) => {
            return match.replace(/<\/?(h[1-6]|p)>/g, (tag) => {
                if (tag.startsWith('</')) {
                    return `</${value}>`;
                } else {
                    return `<${value}>`;
                }
            });
          }); 
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<${value}>${selectionInfo.selectedText}</${value}>`);
    }

    document.addEventListener('keyup', function(event){
        if(event.key === 'Enter') {
           //TODO - O.b.s! Koden nedan behövs när en ny anteckningen skapas!
           const indexToShow = 6;
           selectTextType.selectedIndex = indexToShow;
        }
    });
}

    
    //   selectElement.value = desiredValue;
//Lägga in listor
//eventlyssnare i funktionen som lyssnar på enter och lägger till en ny <li> då?
//om man vill byta punkter använd replace?