//variable for note field
const noteField = document.getElementById("note-field");

//variable for all toolbar buttons
const toolButtons = document.querySelectorAll(".tool-icon");

//varialbe for all select menus
const selectMenus = document.querySelectorAll("select");

//-------- EventListeners for all toolbar buttons -----------
toolButtons.forEach(function (toolButton) {
  toolButton.addEventListener("click", (event) => {
    const { target } = event;
    const toolId = target.id;

    //check if clicked button is not add image button
    if (!target.classList.contains("fa-image")) {
      //function to get user selected text
      const selectInfo = checkSelectedText();

      //if no selected text alert
      if (!selectInfo) {
        alert(
          "Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen."
        );
        return;
      }
      //toggles the class on the clicked button
      target.classList.toggle("tool-btn-highlight");
    }

    event.preventDefault();

    //function to get user selected text
    const selectionInfo = checkSelectedText();

    //switch statement to call function depending on user choice
    switch (toolId) {
      case "bold":
      case "italic":
      case "underline":
        toggleStyle(toolId, selectionInfo);
        break;
      case "ul-list":
        toggleUnorderedlist(selectionInfo);
        break;
      case "ol-list":
        toggleOrderedlist(selectionInfo);
        break;
      case "add-image":
        console.log("Nu ska vi lägga till en bild");
        break;
    }
  });
});

//-------- EventListeners for all select menus -----------
selectMenus.forEach(function (selectMenu) {
  selectMenu.addEventListener("change", (event) => {
    const { target } = event;
    const selectMenuId = target.id;

    event.preventDefault();

    //function to get user selected text
    const selectionInfo = checkSelectedText();

    handleSelect(event, selectMenuId, selectionInfo);
  });
});

//------------------------------------------------------------
// ----------- function to get selected text -----------------
//------------------------------------------------------------
function checkSelectedText() {
  const selection = window.getSelection();

  //if there is a selection return range and selected text
  if (selection && selection.toString().length > 0) {
    const range = selection.getRangeAt(0);

    return {
      selectedText: selection.toString(),
      range: range,
    };
  }
}

// ----------------------------------------------------------------
// ------  Toggle style section -----------------------------------
// ----------------------------------------------------------------
//function to switch between adding and removing styles
function toggleStyle(tool, selectionInfo) {
  //check if there is selected text
  if (!selectionInfo) {
    alert(
      "Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen."
    );
    return;
  }

  //variable to surround selected text
  let spanElement = null;
  //variable for common parent element for selected text
  let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

  //check if there is a common "span" parent that contains the selected text
  while (commonAncestorContainer) {
    if (
      commonAncestorContainer.nodeName === "SPAN" &&
      commonAncestorContainer.textContent.trim() === selectionInfo.selectedText
    ) {
      //if common parent is a span with selected text store in variable
      spanElement = commonAncestorContainer;
      break;
    }
    //if not, continue to search for common parent span tag higher up in DOM-tree
    commonAncestorContainer = commonAncestorContainer.parentNode;
  }

  //if there is no surrounding span element create one
  if (!spanElement) {
    spanElement = document.createElement("span");

    //add style attribute based on user choice
    switch (tool) {
      case "bold":
        spanElement.style.fontWeight = "bold";
        break;
      case "italic":
        spanElement.style.fontStyle = "italic";
        break;
      case "underline":
        spanElement.style.textDecoration = "underline";
        break;
    }
    //surround selected text with new span
    selectionInfo.range.surroundContents(spanElement);
  } else {
    //if there is a surrounding span change style based on user choice
    //get style attributes of span element
    const styleAttribute = window.getComputedStyle(spanElement);

    //call function based on user choice
    switch (tool) {
      case "bold":
        toggleBold(styleAttribute, spanElement);
        break;
      case "italic":
        toggleItalic(styleAttribute, spanElement);
        break;
      case "underline":
        toggleUnderline(styleAttribute, spanElement);
        break;
    }
  }
  // Deselect the text
  window.getSelection().removeAllRanges();

  console.log(noteField.innerHTML);
}

// ----------- toggle bold function ----------------------
function toggleBold(style, span) {
  //if text is already bold - make it normal. If not make it bold.
  if (style.fontWeight.includes("700")) {
    span.style.fontWeight = "400";
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight
    );
  } else if (style.fontWeight.includes("400")) {
    span.style.fontWeight = "700";
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight
    );
  }
}

// ----------- toggle italic function ----------------------
//if text is already italic - make it normal. If not make it italic.
function toggleItalic(style, span) {
  if (style.fontStyle.includes("italic")) {
    span.style.fontStyle = "normal";
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight
    );
  } else if (style.fontStyle.includes("normal")) {
    span.style.fontStyle = "italic";
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight
    );
  }
}

// ----------- toggle underline function ----------------------
//if text is already underlined - remove underline. If not add underline.
function toggleUnderline(style, span) {
  if (style.textDecoration.includes("underline")) {
    span.style.textDecoration = "none";
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight
    );
  } else if (style.textDecoration.includes("none")) {
    span.style.textDecoration = "underline";
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight
    );
  }
}

// --------------------------------------------------------------------------
// ------  List section -----------------------------------------------------
// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
// ------  Function to handle select menus ----------------------------------
// --------------------------------------------------------------------------
function handleSelect(event, menu, selectionInfo) {
  if (!selectionInfo) {
    alert(
      "Du har ingen text markerad.\nMarkera den text du vill ändra och prova igen."
    );
    return;
  }
  //variable to store the value of user's choice
  const { target } = event;
  const { value } = target;

  switch (menu) {
    case "text-type":
      changeTextType(selectionInfo, value);
      break;
    case "font-family":
    case "font-size":
      changeFontAttr(menu, selectionInfo, value);
      break;
  }
}
// -----------------------------------------------------------------------------
// ------ Change text type section ---------------------------------------------
// -----------------------------------------------------------------------------
function changeTextType(selectionInfo, value) {
  //variable to surround selected text
  let textTagElement = null;
  //variable for common parent element for selected text
  let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

  //list of text tags
  const textTags = ["H1", "H2", "H3", "H4", "H5", "H6", "P"];

  //check if common parent is a text tag that contains selected text
  while (commonAncestorContainer) {
    if (
      textTags.includes(commonAncestorContainer.nodeName) &&
      commonAncestorContainer.textContent.trim() === selectionInfo.selectedText
    ) {
      //if common parent is a text tag with selected text store in variable
      textTagElement = commonAncestorContainer;
      break;
    }
    //if not, continue to search for common parent text tag higher up in DOM-tree
    commonAncestorContainer = commonAncestorContainer.parentNode;
  }

  //if there was no texttag containing selected text then create one and surrond selected text
  if (!textTagElement) {
    textTagElement = document.createElement(`${value}`);
    selectionInfo.range.surroundContents(textTagElement);
  } else {
    //if a texttag was found replace it with new texttag of right kind
    const newTagElement = document.createElement(`${value}`);
    newTagElement.innerHTML = textTagElement.innerHTML;
    textTagElement.parentNode.replaceChild(newTagElement, textTagElement);
  }

  //function to change text type back to normal text after pressing enter
  document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      //TODO - O.b.s! Koden nedan behövs när en ny anteckningen skapas!
      const selectTextType = document.getElementById("text-type");
      const defaultTextIndex = 6;
      selectTextType.selectedIndex = defaultTextIndex;
    }
  });
  console.log(noteField.innerHTML);

  // Deselect the text
  window.getSelection().removeAllRanges();
}

// -----------------------------------------------------------------------------
// ------ Change font attribute section ----------------------------------------
// -----------------------------------------------------------------------------
function changeFontAttr(menu, selectionInfo, value) {
  //variable to surround selected text
  let spanElement = null;
  //variable for common parent element for selected text
  let commonAncestorContainer = selectionInfo.range.commonAncestorContainer;

  //check if there is a common "span" parent that contains the selected text
  while (commonAncestorContainer) {
    if (
      commonAncestorContainer.nodeName === "SPAN" &&
      commonAncestorContainer.textContent.trim() === selectionInfo.selectedText
    ) {
      //if common parent is a span with selected text store in variable
      spanElement = commonAncestorContainer;
      break;
    }
    //if not, continue to search for common parent span tag higher up in DOM-tree
    commonAncestorContainer = commonAncestorContainer.parentNode;
  }

  //variable to store the attribute that should be changed
  const attribute = menu === "font-family" ? "fontFamily" : "fontSize";

  //if there is no surrounding span element create one
  if (!spanElement) {
    spanElement = document.createElement("span");
    //use attribute variable and value to change style
    spanElement.style[attribute] = `${value}`;
    selectionInfo.range.surroundContents(spanElement);
  } else {
    //if there is a surrounding span change style based on user choice
    //get style attributes of span element
    const style = window.getComputedStyle(spanElement);
    spanElement.style[attribute] = `${value}`;
    console.log(
      "Efter: understruken:",
      style.textDecoration,
      "kursiv:",
      style.fontStyle,
      "fetstil:",
      style.fontWeight,
      "Font:",
      style.fontFamily
    );
  }
  console.log(noteField.innerHTML);

  // Deselect the text
  window.getSelection().removeAllRanges();
}
