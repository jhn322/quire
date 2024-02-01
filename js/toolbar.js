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

        let selectionInfo = checkSelectedText();
        
        switch(toolIconId) {
            case 'bold':
                toggleBold(selectionInfo);
                break;
            case 'italic':
                toggleItalic(selectionInfo);
                break;
            case 'underline':
                toggleUnderline(selectionInfo);
                break;
            case 'ul-list':
                toggleUnorderedlist(selectionInfo);
                break;
            case 'ol-list':
                toggleOrderedlist(selectionInfo);
                break;
            case 'add-image':
                console.log("Nu ska vi lägga till en bild");
                break;
        }
    })
})

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
function toggleBold(selectionInfo) {
    
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

function replaceAt(originalString, rangeIndex, replacement) {
    return originalString.substr(0, rangeIndex) + replacement + originalString.substr(rangeIndex + replacement.length);
}

//function to switch between italic and normal text
function toggleItalic(selectionInfo) {
    
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
function toggleUnderline(selectionInfo) {
    
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

//* Alternativ med DOMParser
// function toggleUnderline(selectionInfo) {
//     if (!selectionInfo) {
//         alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
//         return;
//     }

//     const parser = new DOMParser();
//     const doc = parser.parseFromString(noteField.innerHTML, 'text/html');

//     const elementsToToggle = Array.from(doc.querySelectorAll('u')).filter((element) =>
//         element.textContent.includes(selectionInfo.selectedText)
//     );

//     if (elementsToToggle.length > 0) {
//         elementsToToggle.forEach((element) => {
//             const parent = element.parentNode;
//             parent.replaceChild(document.createTextNode(element.textContent), element);
//         });
//     } else {
//         const uElement = document.createElement('u');
//         uElement.appendChild(document.createTextNode(selectionInfo.selectedText));

//         console.log(uElement);
        
//         selectionInfo.range.deleteContents();
//         selectionInfo.range.insertNode(uElement);
//         console.log(noteField.innerHTML);

//         noteField.innerHTML = noteField.innerHTML;
//     }

//     selectionInfo = {};
// }


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

// -----------------------------------------------------------------------------------
// ------  List section -----------------------------------------------------
// -----------------------------------------------------------------------------------
const unorderedListButton = document.getElementById('ul-list');
const orderedListButton = document.getElementById('ol-list');

function toggleUnorderedlist (selectionInfo){
    const listStart = "<ul><li>";
    const listEnd = "</ul></li>"

    const range = selectionInfo.range || createRangeAtCursor();

    if (selectionInfo.selectedText) {
        const newList = listStart + selectionInfo.selectedText + listEnd
        insertTextAtCursor(newList, range);
    } else {
        insertTextAtCursor(listStart + '<br>' + listEnd, range)

    }
}

function toggleOrderedlist (selectionInfo){
    const listStart = "<ol><li>";
    const listEnd = "</ol></li>"

    const range = selectionInfo.range || createRangeAtCursor();
    

    if (selectionInfo.selectedText) {
        const newList = listStart + selectionInfo.selectedText + listEnd
        insertTextAtCursor(newList, range);
    } else {
        insertTextAtCursor(listStart + '<br>' + listEnd, range)

    }
}

function insertTextAtCursor (newText, range){
    const selection = window.getSelection();
    let currentRange = range || selection.getRangeAt(0);

    if (!currentRange) {
        currentRange = createRangeAtCursor();
    }

// Delete the selected text, if any
range.deleteContents();

// Insert the new text at the cursor position
const fragment = range.createContextualFragment(newText);
range.insertNode(fragment);

}

function createRangeAtCursor() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const currentOffset = range.startOffset;

    const newRange = document.createRange();
    newRange.setStart(range.startContainer, currentOffset);
    newRange.setEnd(range.startContainer, currentOffset);

    return newRange;
}































// // -----------------------------------------------------------------------------------
// // ------   Font-family Section -----------------------------------------------------
// // -----------------------------------------------------------------------------------
// const selectFont = document.getElementById('font-family');

// selectFont.addEventListener('change', function(event){
//     event.preventDefault();
//     changeFont(event);
// });

// function changeFont(event) {

//     let selectionInfo = checkSelectedText();

//     if(!selectionInfo) {
//         alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
//         return;
//     }
    
//     let { target } = event;
//     let { value } = target;
    
//     console.log(value);

//     const regexPatternFont = new RegExp(
//         `<span\\s+style\\s*=\\s*['"]([^'"]*\\bfont-family\\s*:\\s*[^'"]*\\b)['"][^>]*>${selectionInfo.selectedText}<\\/span>`,
//     "gi"
//     );
   
//     if(noteField.innerHTML.match(regexPatternFont)) {
//         noteField.innerHTML = noteField.innerHTML.replace(regexPatternFont, selectionInfo.selectedText);
//         });
//     } else {
//         noteField.innerHTML = noteField.innerHTML.replace(
//             selectionInfo.selectedText, 
//             `<span style="font-family:'${value}'">${selectionInfo.selectedText}</span>`);
//         console.log(noteField.innerHTML);
//     };
// }


