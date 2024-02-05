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
            selection: selection,
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
    
    let spanElement = null;
    
    let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

    while (commonAncestorContainer) {
        if (commonAncestorContainer.nodeName === 'SPAN' && commonAncestorContainer.textContent.trim() === selectionInfo.selectedText) {
            spanElement = commonAncestorContainer;
            break;
        }
        commonAncestorContainer = commonAncestorContainer.parentNode;
    }
    console.log("gemensam container:", commonAncestorContainer);

    if (!spanElement) {
        spanElement = document.createElement('span');
        spanElement.style.fontWeight = 'bold';
        selectionInfo.range.surroundContents(spanElement);
    } else {
        const style = window.getComputedStyle(spanElement);
        console.log('Fetstil:', style.fontWeight);
        console.log('Kursiv stil:', style.fontStyle);
        console.log('Understruken stil:', style.textDecoration);
        
        if(style.fontWeight.includes('700')){
            spanElement.style.fontWeight = '400';
            console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight);
        } else if (style.fontWeight.includes('400')){
            spanElement.style.fontWeight = '700';
            console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight);
        }
    }
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

    let spanElement = null;
    
    let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

    while (commonAncestorContainer) {
        if (commonAncestorContainer.nodeName === 'SPAN' && commonAncestorContainer.textContent.trim() === selectionInfo.selectedText) {
            spanElement = commonAncestorContainer;
            break;
        }
        commonAncestorContainer = commonAncestorContainer.parentNode;
    }
    console.log("gemensam container:", commonAncestorContainer);

    if (!spanElement) {
        spanElement = document.createElement('span');
        spanElement.style.fontStyle = 'italic';
        selectionInfo.range.surroundContents(spanElement);
    } else {
        const style = window.getComputedStyle(spanElement);
        console.log('Fetstil:', style.fontWeight);
        console.log('Kursiv stil:', style.fontStyle);
        console.log('Understruken stil:', style.textDecoration);
        
        if(style.fontStyle.includes('italic')){
            spanElement.style.fontStyle = 'normal';
            console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight);
        } else if (style.fontStyle.includes('normal')){
            spanElement.style.fontStyle = 'italic';
            console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight);
        }
    }
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

    let spanElement = null;
    
    let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

    while (commonAncestorContainer) {
        if (commonAncestorContainer.nodeName === 'SPAN' && commonAncestorContainer.textContent.trim() === selectionInfo.selectedText) {
            spanElement = commonAncestorContainer;
            break;
        }
        commonAncestorContainer = commonAncestorContainer.parentNode;
    }
    console.log("gemensam container:", commonAncestorContainer);

    if (!spanElement) {
        spanElement = document.createElement('span');
        spanElement.style.textDecoration = 'underline';
        selectionInfo.range.surroundContents(spanElement);
    } else {
        const style = window.getComputedStyle(spanElement);
        console.log('Fetstil:', style.fontWeight);
        console.log('Kursiv stil:', style.fontStyle);
        console.log('Understruken stil:', style.textDecoration);
        
        if(style.textDecoration.includes('underline')){
            spanElement.style.textDecoration = 'none';
            console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight);
        } else if (style.textDecoration.includes('none')){
            spanElement.style.textDecoration = 'underline';
            console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight);
        }
    }
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

    let textTagElement = null;
    
    let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

    const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'];

    while (commonAncestorContainer) {
        if (textTags.includes(commonAncestorContainer.nodeName) && commonAncestorContainer.textContent.trim() === selectionInfo.selectedText){
            textTagElement = commonAncestorContainer;
            break;
        }
        commonAncestorContainer = commonAncestorContainer.parentNode;
    }
    console.log("gemensam container:", commonAncestorContainer);

    if (!textTagElement) {
        textTagElement = document.createElement(`${value}`);
        selectionInfo.range.surroundContents(textTagElement);
        console.log(textTagElement);
    } else {
        const newTagElement = document.createElement(`${value}`);
        newTagElement.innerHTML = textTagElement.innerHTML;
        textTagElement.parentNode.replaceChild(newTagElement, textTagElement);
    }

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

    let spanElement = null;
    
    let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

    while (commonAncestorContainer) {
        if (commonAncestorContainer.nodeName === 'SPAN' && commonAncestorContainer.textContent.trim() === selectionInfo.selectedText) {
            spanElement = commonAncestorContainer;
            break;
        }
        commonAncestorContainer = commonAncestorContainer.parentNode;
    }
    console.log("gemensam container:", commonAncestorContainer);

    if (!spanElement) {
        spanElement = document.createElement('span');
        spanElement.style.fontFamily = `${value}`;
        selectionInfo.range.surroundContents(spanElement);
    } else {
        const style = window.getComputedStyle(spanElement);
        console.log('Fetstil:', style.fontWeight);
        console.log('Kursiv stil:', style.fontStyle);
        console.log('Understruken stil:', style.textDecoration);
        console.log('Font:', style.fontFamily);
        
        spanElement.style.fontFamily = `${value}`;
        console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight, 'Font:', style.fontFamily);
    }
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

    let spanElement = null;
    
    let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

    while (commonAncestorContainer) {
        if (commonAncestorContainer.nodeName === 'SPAN' && commonAncestorContainer.textContent.trim() === selectionInfo.selectedText) {
            spanElement = commonAncestorContainer;
            break;
        }
        commonAncestorContainer = commonAncestorContainer.parentNode;
    }
    console.log("gemensam container:", commonAncestorContainer);

    if (!spanElement) {
        spanElement = document.createElement('span');
        spanElement.style.fontSize = `${value}`;
        selectionInfo.range.surroundContents(spanElement);
    } else {
        const style = window.getComputedStyle(spanElement);
        console.log('Fetstil:', style.fontWeight);
        console.log('Kursiv stil:', style.fontStyle);
        console.log('Understruken stil:', style.textDecoration);
        console.log('Font:', style.fontFamily);
        console.log('Fontsize:', style.fontSize);
        
        spanElement.style.fontSize = `${value}`;
        console.log('Efter: understruken:', style.textDecoration, 'kursiv:', style.fontStyle, 'fetstil:', style.fontWeight, 'Font:', style.fontFamily, 'Fontsize:', style.fontSize);
    }
}