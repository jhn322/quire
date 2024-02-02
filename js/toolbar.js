//variable for all icons in toolbar
const toolIcons = document.querySelectorAll('.tool-icon');

//variable for note field
const noteField = document.getElementById('note-field');

toolIcons.forEach(function(toolIcon){
    toolIcon.addEventListener('click', (event)=> {
        const { target } = event;
        const toolIconId = target.id; 

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
            textAfterSelection: noteField.textContent.substring(endOffset),
            stringToSearch: noteField.innerHTML.slice(startOffset, endOffset)
        };
    }
}

// -----------------------------------------------------------------------------------
// ------  Bold section -----------------------------------------------------
// -----------------------------------------------------------------------------------
//function to switch between bold and normal text
function toggleBold(selectionInfo) {
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }
    
    const regexPatternBold = new RegExp(`<strong>(<u|i>)*${selectionInfo.selectedText}(</u|i>)*<\/strong>`, "gi");

    if(noteField.innerHTML.match(regexPatternBold)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternBold, (match) => {
            return match.replace(/<\/?strong>/g, '');
          }); 
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<strong>${selectionInfo.selectedText}</strong>`);
    }

    console.log(noteField.innerHTML);
    // selectionInfo = {};
}

// -----------------------------------------------------------------------------------
// ------  Italic section -----------------------------------------------------
// -----------------------------------------------------------------------------------
//function to switch between italic and normal text
function toggleItalic(selectionInfo) {
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    const regexPatternItalic = new RegExp(`<i>(<strong|u>)*${selectionInfo.selectedText}(</strong|u>)*<\/i>`, "gi");
    
    if(noteField.innerHTML.match(regexPatternItalic)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternItalic, (match) => {
            return match.replace(/<\/?i>/g, '');
          });
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<i>${selectionInfo.selectedText}</i>`);
    }

    console.log(noteField.innerHTML);
    // const matchSelectedTextWithTags = new RegExp(`^<i>(<strong>|<u>)*${selectionInfo.selectedText}(<\/strong>|<\/u>)*<\/i>|<i>${selectionInfo.selectedText}<\/i>`, "i");
    // //search for selectedText without tags
    // const matchSelectedText = new RegExp(`${selectionInfo.selectedText}`, "i");
    
    // //use substring to only search from selectionInfo.startOffset
    // const stringToSearch = noteField.innerHTML.slice(selectionInfo.startOffset, selectionInfo.endOffset);
    // console.log("string to search", stringToSearch);
    
    // const matchWithTags = matchSelectedTextWithTags.exec(stringToSearch);
    // const matchNoTags = matchSelectedText.exec(stringToSearch);
    // console.log("match with tags:", matchWithTags);
    // console.log("match without tags:", matchNoTags);

    // if(matchWithTags) {
    //     noteField.innerHTML = noteField.innerHTML.replace(matchSelectedTextWithTags, (match) => {
    //     return match.replace(/<\/?i>/g, '');
    //     });
    // } else if(matchNoTags) {
    //     noteField.innerHTML = selectionInfo.textBeforeSelection + stringToSearch.replace(matchSelectedText, `<i>${selectionInfo.selectedText}</i>`);
    // } else {
    //     console.log("no matching text");
    // }

    // selectionInfo = checkSelectedText();
}

// -----------------------------------------------------------------------------------
// ------  Underline section -----------------------------------------------------
// -----------------------------------------------------------------------------------
//function to switch between underlined and normal text
function toggleUnderline(selectionInfo) {
    
    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }

    const regexPatternUnderline = new RegExp(`<u>(<strong|i>)*${selectionInfo.selectedText}(</strong|i>)*<\/u>`, "gi");


    if(noteField.innerHTML.match(regexPatternUnderline)) {
        noteField.innerHTML = noteField.innerHTML.replace(regexPatternUnderline, (match) => {
            return match.replace(/<\/?u>/g, '');
          });
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(selectionInfo.selectedText, `<u>${selectionInfo.selectedText}</u>`);
    }
    
    console.log(noteField.innerHTML);

    // //search for selectedText within tags
    // const matchSelectedTextWithTags = new RegExp(`^<u>(<strong>|<i>)*${selectionInfo.selectedText}(<\/strong>|<\/i>)*<\/u>|<u>${selectionInfo.selectedText}<\/u>`, "i");
    // //search for selectedText without tags
    // const matchSelectedText = new RegExp(`${selectionInfo.selectedText}`, "i");
    
    // //use substring to only search from selectionInfo.startOffset
    // // let stringToSearch = noteField.innerHTML.slice(selectionInfo.startOffset, selectionInfo.endOffset);
    // console.log("startoffset:", selectionInfo.startOffset);
    // console.log("endoffset:", selectionInfo.endOffset);
    // console.log("string to search", selectionInfo.stringToSearch);
    
    // const matchWithTags = matchSelectedTextWithTags.exec(selectionInfo.stringToSearch);
    // const matchNoTags = matchSelectedText.exec(selectionInfo.stringToSearch);
    // console.log("match with tags:", matchWithTags);
    // console.log("match without tags:", matchNoTags);

    // if(matchWithTags) {
    //     noteField.innerHTML = noteField.innerHTML.replace(matchSelectedTextWithTags, (match) => {
    //     return match.replace(/<\/?u>/g, '');
    //     });
    // } else if(matchNoTags) {
    //     noteField.innerHTML = selectionInfo.textBeforeSelection + selectionInfo.stringToSearch.replace(matchSelectedText,`<u>${selectionInfo.selectedText}</u>`) + selectionInfo.textAfterSelection;
    // } else {
    //     console.log("no matching text");
    // }

    // selectionInfo = checkSelectedText();
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

    const regexPatternTextType = new RegExp(`<([hip]|h[1-6])>(<u>|<i>|<strong>)*${selectionInfo.selectedText}(<\/u>|<\/i>|<\/strong>)*<\/\\1>`, "gi");

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

    console.log(noteField.innerHTML);

    document.addEventListener('keyup', function(event){
        if(event.key === 'Enter') {
           //TODO - O.b.s! Koden nedan behövs när en ny anteckningen skapas!
           const defaultTextIndex = 6;
           selectTextType.selectedIndex = defaultTextIndex;
        }
    });
}

// -----------------------------------------------------------------------------------
// ------  List section -----------------------------------------------------
// -----------------------------------------------------------------------------------
// list buttons
const unorderedListButton = document.getElementById("ul-list");
const orderedListButton = document.getElementById("ol-list");
// toggle unordered list
function toggleUnorderedlist(selectionInfo) {
  const listStart = "<ul><li>";
  const listEnd = "</ul></li>";
  // determine the range to work with based on user selection or cursor position
  const range =
    selectionInfo && selectionInfo.range
      ? selectionInfo.range
      : createRangeAtCursor();
  // check if there is selected text, if yes, wrap in tags
  if (selectionInfo && selectionInfo.selectedText) {
    const newList = listStart + selectionInfo.selectedText + listEnd;
    insertTextAtCursor(newList, range);
  } else {
    // if not, start empty list and set focus
    insertTextAtCursor(listStart + "<br>" + listEnd, range);
    noteField.focus();
  }
}
// toggle ordered list
function toggleOrderedlist(selectionInfo) {
  const listStart = "<ol><li>";
  const listEnd = "</ol></li>";
  // determine the range to work with based on user selection or cursor position
  const range =
    selectionInfo && selectionInfo.range
      ? selectionInfo.range
      : createRangeAtCursor();
  // check if there is selected text, if yes, wrap in tags
  if (selectionInfo && selectionInfo.selectedText) {
    const newList = listStart + selectionInfo.selectedText + listEnd;
    insertTextAtCursor(newList, range);
    // if not, start empty list and set focus
  } else {
    insertTextAtCursor(listStart + "<br>" + listEnd, range);
    noteField.focus();
  }
}
// function to insert ext at the cursor position
function insertTextAtCursor(newText, range) {
  // get current selection and range
  const selection = window.getSelection();
  let currentRange = range || selection.getRangeAt(0);
  // if no range is available, create new one at cursor position
  if (!currentRange) {
    currentRange = createRangeAtCursor();
  }
  // delete the selected text, if any
  range.deleteContents();
  // insert the new text at the cursor position
  const fragment = range.createContextualFragment(newText);
  range.insertNode(fragment);
}
// function to create a range at cursor position
function createRangeAtCursor() {
  // get the current selection and range
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const currentOffset = range.startOffset;
  // create a new range at the cursor position
  const newRange = document.createRange();
  newRange.setStart(range.startContainer, currentOffset);
  newRange.setEnd(range.startContainer, currentOffset);
  return newRange;
}

// // -----------------------------------------------------------------------------------
// // ------   Font-family Section -----------------------------------------------------
// // -----------------------------------------------------------------------------------
const selectFont = document.getElementById('font-family');

selectFont.addEventListener('change', function(event){
    event.preventDefault();
    changeFont(event);
});

function changeFont(event) {

    let selectionInfo = checkSelectedText();

    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }
    
    let { target } = event;
    let { value } = target;
    
    console.log(value);

    let userFontStyles = {
        fontFamily: value,
        fontSize: selectFontSize.value
    }

    const regexSpan = new RegExp(`<span.*?>(${selectionInfo.selectedText})<\/span>`, "gi");

    const currentContent = noteField.innerHTML;
   
    if(currentContent.match(regexSpan)) {
        const updatedSpan = `<span style="font-family:${userFontStyles.fontFamily}; font-size:${userFontStyles.fontSize}">${selectionInfo.selectedText}</span>`;
        noteField.innerHTML = currentContent.replace(regexSpan, updatedSpan);
        console.log(noteField.innerHTML);
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(
            selectionInfo.selectedText, 
            `<span style="font-family:${userFontStyles.fontFamily}; font-size:${userFontStyles.fontSize}">${selectionInfo.selectedText}</span>`);
        console.log(noteField.innerHTML);
    };
}

// // -----------------------------------------------------------------------------------
// // ------   Font-size Section -----------------------------------------------------
// // -----------------------------------------------------------------------------------
const selectFontSize = document.getElementById('font-size');

selectFontSize.addEventListener('change', function(event){
    event.preventDefault();
    changeSize(event);
});

function changeSize(event) {

    let selectionInfo = checkSelectedText();

    if(!selectionInfo) {
        alert("Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen.");
        return;
    }
    
    let { target } = event;
    let { value } = target;
    console.log(value);

    let userFontStyles = {
        fontFamily: selectFont.value,
        fontSize: value
    }

    const regexSpan = new RegExp(`<span.*?>(${selectionInfo.selectedText})<\/span>`, "gi");

    const currentContent = noteField.innerHTML;
   
    if(currentContent.match(regexSpan)) {
        const updatedSpan = `<span style="font-family:${userFontStyles.fontFamily}; font-size:${userFontStyles.fontSize}">${selectionInfo.selectedText}</span>`;
        noteField.innerHTML = currentContent.replace(regexSpan, updatedSpan);
        console.log(noteField.innerHTML);
    } else {
        noteField.innerHTML = noteField.innerHTML.replace(
            selectionInfo.selectedText, 
            `<span style="font-family:${userFontStyles.fontFamily}; font-size:${userFontStyles.fontSize}">${selectionInfo.selectedText}</span>`);
        console.log(noteField.innerHTML);
    };
}